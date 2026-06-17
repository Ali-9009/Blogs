import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
    FaFacebookF,
    FaInstagram,
    FaPinterestP,
    FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

const FOOTER_QUERY = `{
  "editorPosts": *[_type == "post"] | order(_createdAt desc)[0...3] {
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

export default async function Footer() {
    const { editorPosts, categories } = await client.fetch(
        FOOTER_QUERY,
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
        <footer className="bg-[#111] text-white">
            <div className="bg-[#181818]">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-3">
                    <div>
                        <FooterTitle title="About Us" />

                        <div className="relative mb-6 h-50 w-full overflow-hidden">
                            <Image
                                src="/assets/blog-1.webp"
                                alt="About us"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>

                        <p className="text-sm font-medium leading-7 text-white">
                            Soledad is one of the best WordPress themes for multipurpose,
                            include: news, magazine, blog, corporate, creative, eCommerce...etc
                            It helps you build any professional website in a very short time.
                        </p>
                    </div>

                    <div>
                        <FooterTitle title="Editor Picks" />

                        <div>
                            {editorPosts.map((post) => (
                                <div
                                    key={post._id}
                                    className="flex gap-5 border-b border-[#2a2a2a] py-5 first:pt-0"
                                >
                                    <Link
                                        href={getPostHref(post)}
                                        className="relative h-20 w-30 shrink-0 overflow-hidden"
                                    >
                                        {post.mainImage && (
                                            <Image
                                                src={urlFor(post.mainImage).width(180).height(120).url()}
                                                alt={post.title}
                                                fill
                                                className="object-cover"
                                                sizes="118px"
                                            />
                                        )}
                                    </Link>

                                    <div>
                                        <Link href={getPostHref(post)}>
                                            <h4 className="max-h-10 overflow-hidden text-sm font-bold leading-5 hover:text-blue-400">
                                                {post.title}
                                            </h4>
                                        </Link>

                                        <p className="mt-2 text-xs text-gray-400">
                                            {post.publishedAt
                                                ? new Date(post.publishedAt).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        month: "long",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    }
                                                )
                                                : ""}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <FooterTitle title="Categories" />

                        <ul>
                            {categories.map((category) => (
                                <li
                                    key={category._id}
                                    className="flex items-center justify-between border-b border-[#2a2a2a] py-3 text-sm"
                                >
                                    <Link
                                        href={`/${category.slug.current}`}
                                        className="flex items-center gap-2 font-medium hover:text-blue-400"
                                    >
                                        <IoIosArrowForward className="text-xs" />
                                        {category.title}
                                    </Link>

                                    <span className="text-gray-400">({category.count})</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-[#111]">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 border-b border-[#262626] py-8 text-sm font-bold uppercase text-gray-400">
                        <SocialLink icon={<FaFacebookF />} label="Facebook" bg="bg-blue-700" />
                        <SocialLink icon={<FaXTwitter />} label="Twitter" bg="bg-sky-500" />
                        <SocialLink icon={<FaInstagram />} label="Instagram" bg="bg-pink-600" />
                        <SocialLink icon={<FaPinterestP />} label="Pinterest" bg="bg-red-700" />
                        <SocialLink icon={<FaYoutube />} label="Youtube" bg="bg-red-600" />
                        <SocialLink icon={<MdEmail />} label="Email" bg="bg-blue-500" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterTitle({ title }) {
    return (
        <div className="mb-8">
            <h3 className="mb-3 text-base font-bold uppercase">{title}</h3>
            <div className="h-px w-full bg-[#3a3a3a]" />
        </div>
    );
}

function SocialLink({ icon, label, bg }) {
    return (
        <Link href="#" className="flex items-center gap-3 hover:text-white">
            <span
                className={`${bg} flex h-9 w-9 items-center justify-center text-base text-white`}
            >
                {icon}
            </span>
            {label}
        </Link>
    );
}