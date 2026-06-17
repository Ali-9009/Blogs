import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const BANNER_QUERY = `*[_type == "post"] | order(_createdAt desc)[0...5] {
  _id,
  title,
  slug,
  mainImage,
  author->{name},
  publishedAt,
  categories[]->{
    title,
    slug
  }
}`;

export default async function Banner() {
    const blogs = await client.fetch(BANNER_QUERY, {}, { cache: "no-store" });

    if (!blogs?.length) return null;

    const [mainBlog, ...sideBlogs] = blogs;

    const getHref = (blog) => {
        const categorySlug = blog.categories?.[0]?.slug?.current;
        const postSlug = blog.slug?.current;

        if (!categorySlug || !postSlug) return "#";

        if (categorySlug === "healthy-living") {
            return `/living/${postSlug}`;
        }

        return `/${categorySlug}/${postSlug}`;
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid gap-1 lg:grid-cols-2">
                <Link
                    href={getHref(mainBlog)}
                    className="relative block h-125 overflow-hidden group"
                >
                    {mainBlog.mainImage && (
                        <Image
                            src={urlFor(mainBlog.mainImage).width(900).height(700).url()}
                            alt={mainBlog.title}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                        />
                    )}

                    <div className="absolute inset-x-6 bottom-6">
                        <div>
                            <span className="mb-2 inline-block bg-blue-600 px-2 py-1 text-xs text-white">
                                {mainBlog.categories?.[0]?.title || "Blog"}
                            </span>
                        </div>
                       

                        <h2 className="inline bg-white px-1 text-4xl font-bold leading-tight">
                            {mainBlog.title}
                        </h2>

                        <div className="mt-4">
                            <span className="bg-white px-2 py-1 text-sm">
                                by {mainBlog.author?.name || "Admin"}
                            </span>
                        </div>
                    </div>
                </Link>

                <div className="grid grid-cols-2 gap-1">
                    {sideBlogs.map((blog) => (
                        <Link
                            key={blog._id}
                            href={getHref(blog)}
                            className="group relative block h-62 overflow-hidden"
                        >
                            {blog.mainImage && (
                                <Image
                                    src={urlFor(blog.mainImage).width(500).height(400).url()}
                                    alt={blog.title}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                />
                            )}

                            <div className="absolute inset-x-4 bottom-4">
                                <div>
                                    <span className="mb-2 inline-block bg-blue-600 px-2 py-1 text-xs text-white">
                                        {blog.categories?.[0]?.title || "Blog"}
                                    </span>
                                </div>
                               

                                <h3 className="inline bg-white px-1 text-xl font-bold leading-snug">
                                    {blog.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}