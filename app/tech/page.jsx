import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import { blogCategories } from "@/data/blogs";

export default function CategoryPage() {
    const category = blogCategories.tech;

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
                <section>
                    <h1 className="text-center text-xl font-bold uppercase mb-8">
                       Category:
                        <span className="text-blue-700"> {category.title}</span>
                    </h1>

                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                        {category.blogs.map((blog) => (
                            <article key={blog.id}>
                                <Link href={`/tech/${blog.slug}`}>
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        width={600}
                                        height={400}
                                        className="w-full h-64 object-cover"
                                    />
                                </Link>

                                <Link
                                    href="#"
                                    className="inline-block bg-white px-6 -mt-4 relative z-10 text-xs text-blue-600"
                                >
                                    {category.title}
                                </Link>

                                <Link href={`/tech/${blog.slug}`}>
                                    <h2 className="mt-3 text-base font-bold uppercase leading-tight hover:text-blue-600">
                                        {blog.title}
                                    </h2>
                                </Link>

                                <p className="text-xs text-gray-500 mt-3">
                                    by{" "}
                                    <span className="text-black">
                                        {blog.author}
                                    </span>{" "}
                                    · {blog.date}
                                </p>

                                <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                                    {blog.excerpt}
                                </p>

                                <Link
                                    href={`/tech/${blog.slug}`}
                                    className="inline-block mt-5 bg-blue-600 text-white text-xs font-bold px-5 py-2 uppercase"
                                >
                                    Read the Article ›
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>

                <Sidebar />
            </div>
        </main>
    );
}