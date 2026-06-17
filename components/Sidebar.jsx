import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const SIDEBAR_QUERY = `{
  "popularPosts": *[_type == "post"] | order(_createdAt desc)[0...5] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    categories[]->{
      title,
      slug
    }
  },
  "categories": *[_type == "category"]{
    _id,
    title,
    slug,
    "count": count(*[_type == "post" && references(^._id)])
  }[count > 0]
}`;

export default async function Sidebar() {
    const { popularPosts, categories } = await client.fetch(
        SIDEBAR_QUERY,
        {},
        { cache: "no-store" }
    );

    const getPostHref = (post) => {
        const categorySlug = post.categories?.[0]?.slug?.current;
        const postSlug = post.slug?.current;

        if (!categorySlug || !postSlug) return "#";

        return `/${categorySlug}/${postSlug}`;
    };

    return (
        <aside className="space-y-7">
            <div className="border border-gray-200 p-4">
                <SidebarTitle title="Keep In Touch" />

                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-white">
                    <SocialItem label="Facebook" className="bg-blue-700" />
                    <SocialItem label="Twitter" className="bg-sky-500" />
                    <SocialItem label="Instagram" className="bg-pink-600" />
                    <SocialItem label="Pinterest" className="bg-red-600" />
                    <SocialItem label="Youtube" className="bg-red-700" />
                    <SocialItem label="Email" className="bg-blue-500" />
                </div>
            </div>

            <div className="relative h-72 overflow-hidden bg-black">
                <Image
                    src="/assets/blog-1.webp"
                    alt="Advertisement"
                    fill
                    className="object-cover opacity-80"
                    sizes="300px"
                />

                <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
                    <h3 className="text-lg font-bold uppercase">
                        Top Selling Multipurpose Wordpress Theme
                    </h3>

                    <button className="w-fit bg-blue-600 px-4 py-2 text-xs font-bold uppercase text-white">
                        Get It Now
                    </button>
                </div>
            </div>

            <div className="border border-gray-200 p-4">
                <SidebarTitle title="Popular Posts" />

                <div className="space-y-4">
                    {popularPosts.map((post, index) => (
                        <div key={post._id} className="relative flex gap-3">
                            <span className="absolute -left-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                                {index + 1}
                            </span>

                            <Link href={getPostHref(post)}>
                                {post.mainImage && (
                                    <Image
                                        src={urlFor(post.mainImage).width(80).height(64).url()}
                                        alt={post.title}
                                        width={80}
                                        height={64}
                                        className="object-cover"
                                    />
                                )}
                            </Link>

                            <div>
                                <Link href={getPostHref(post)}>
                                    <h4 className="text-sm font-semibold leading-tight hover:text-blue-600">
                                        {post.title}
                                    </h4>
                                </Link>

                                <p className="mt-1 text-xs text-gray-400">
                                    {post.categories?.[0]?.title || "Blog"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border border-gray-200 p-4">
                <SidebarTitle title="Categories" />

                <ul className="divide-y divide-gray-200 text-sm">
                    {categories.map((category) => (
                        <li key={category._id} className="flex justify-between py-3">
                            <Link
                                href={`/${category.slug.current}`}
                                className="hover:text-blue-600"
                            >
                                {category.title}
                            </Link>

                            <span className="text-gray-400">({category.count})</span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

function SidebarTitle({ title }) {
    return (
        <div className="mb-4 bg-zinc-900 px-3 py-2 text-xs font-bold uppercase text-white">
            <span>{title}</span>
        </div>
    );
}

function SocialItem({ label, className }) {
    return <div className={`${className} px-3 py-2 uppercase`}>{label}</div>;
}