import Sidebar from "@/components/Sidebar";
import { blogs } from "@/data/blogs";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function BlogDetailPage({ params }) {
    const { slug } = await params;

    const blog = blogs.find((item) => item.slug === slug);

    if (!blog) notFound();

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <Image
                src={blog.image}
                alt={blog.title}
                width={1000}
                height={500}
                className="w-full h-auto rounded-lg"
            />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 md:mt-10 mt-6">
                <article>
                    
                    <span className="text-sm text-blue-600 uppercase">
                        {blog.category}
                    </span>

                    <h1 className="text-3xl font-bold mt-3">
                        {blog.title}
                    </h1>

                    <p className="text-gray-500 mt-3">
                        By {blog.author} · {blog.date}
                    </p>

                    <div className="prose max-w-none mt-8">
                        <p>{blog.excerpt}</p>
                    </div>
                    <div className="prose max-w-none mt-4">
                        <p>{blog.content}</p>
                    </div>
                </article>

                <Sidebar />
            </div>
        </main>
    );
}