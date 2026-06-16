import Image from "next/image";
import { blogCategories } from "@/data/blogs";
import Link from "next/link";

export default function Banner() {
    const blogs = Object.entries(blogCategories).flatMap(
        ([key, category]) =>
            category.blogs.map((blog) => ({
                ...blog,
                category: category.title,
                categoryHref: category.href,
            }))
    );

    const sortedBlogs = [...blogs].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const [mainBlog, ...sideBlogs] = sortedBlogs.slice(0, 5);

    return (
        <section className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid gap-1 lg:grid-cols-2">
                {/* Main Blog */}
                <Link
                    href={`${mainBlog.categoryHref}/${mainBlog.slug}`}
                    className="relative block h-125 overflow-hidden group"
                >

                    <Image
                        src={mainBlog.image}
                        alt={mainBlog.title}
                        fill
                        priority
                        className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-x-6 bottom-6">
                        <div>
                            <span className="mb-2 inline-block bg-blue-600 px-2 py-1 text-xs text-white">
                                {mainBlog.category}
                            </span>
                        </div>


                        <h2 className="inline bg-white px-1 text-4xl font-bold leading-tight">
                            {mainBlog.title}
                        </h2>

                        <div className="mt-4">
                            <span className="bg-white px-2 py-1 text-sm">
                                by {mainBlog.author} • {mainBlog.date}
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Side Blogs */}
                <div className="grid grid-cols-2 gap-1">
                    {sideBlogs.map((blog) => (
                        <Link
                            key={blog.id}
                            href={`${blog.categoryHref}/${blog.slug}`}
                            className="group relative block h-62 overflow-hidden"
                        >
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover transition duration-500 group-hover:scale-105"
                            />

                            <div className="absolute inset-x-4 bottom-4">
                                <div>
                                    <span className="mb-2 inline-block bg-blue-600 px-2 py-1 text-xs text-white">
                                        {blog.category}
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