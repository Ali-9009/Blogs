import Link from "next/link";
import { blogs, blogCategories } from "@/data/blogs";
import Image from "next/image";

export default function Sidebar() {
    const popularPosts = blogs.slice(0, 5);

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

            <div className="relative h-72 bg-black overflow-hidden">
                <Image
                    src="/assets/blog-1.webp"
                    alt="Advertisement"
                    fill
                    className="object-cover opacity-80"
                    sizes="300px"
                />

                <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                    <h3 className="font-bold text-lg uppercase">
                        Top Selling Multipurpose Wordpress Theme
                    </h3>

                    <button className="bg-blue-600 text-white text-xs font-bold px-4 py-2 w-fit uppercase">
                        Get It Now
                    </button>
                </div>
            </div>

            <div className="border border-gray-200 p-4">
                <SidebarTitle title="Popular Posts" />

                <div className="space-y-4">
                    {popularPosts.map((post, index) => (
                        <div key={post.id} className="flex gap-3 relative">
                            <span className="absolute -left-2 -top-1 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                {index + 1}
                            </span>

                            <Link href={`/blog/${post.slug}`}>
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={80}
                                    height={64}
                                    className="w-20 h-16 object-cover"
                                />
                            </Link>

                            <div>
                                <Link href={`/blog/${post.slug}`}>
                                    <h4 className="font-semibold text-sm leading-tight hover:text-blue-600">
                                        {post.title}
                                    </h4>
                                </Link>

                                <p className="text-xs text-gray-400 mt-1">{post.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border border-gray-200 p-4">
                <SidebarTitle title="Categories" />

                <ul className="divide-y divide-gray-200 text-sm">
                    {Object.entries(blogCategories).map(([key, category]) => (
                        <li key={key} className="flex justify-between py-3">
                            <Link
                                href={category.href}
                                className="hover:text-blue-600"
                            >
                                {category.title}
                            </Link>

                            <span className="text-gray-400">
                                ({category.blogs.length})
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

function SidebarTitle({ title }) {
    return (
        <div className="bg-zinc-900 text-white text-xs font-bold uppercase px-3 py-2 mb-4">
            <span>{title}</span>
        </div>
    );
}

function SocialItem({ label, className }) {
    return (
        <div className={`${className} px-3 py-2 uppercase`}>
            {label}
        </div>
    );
}