import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const POSTS_QUERY = `*[_type == "post" && references(*[_type == "category" && title == "Culture"]._id)] | order(_createdAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  author->{name},
  publishedAt
}`;

export default async function CategoryPage() {
    const posts = await client.fetch(POSTS_QUERY);

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
                <section>
                    <h1 className="text-center text-xl font-bold uppercase mb-8">
                        Category:
                        <span className="text-blue-700"> Culture</span>
                    </h1>

                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                        {posts.map((blog) => (
                            <article key={blog._id}>
                                <Link href={`/culture/${blog.slug.current}`}>
                                    {blog.mainImage && (
                                        <Image
                                            src={urlFor(blog.mainImage).width(400).height(400).url()}
                                            alt={blog.title}
                                            width={400}
                                            height={400}
                                            className="object-cover"
                                        />
                                    )}
                                </Link>

                                <Link
                                    href={`/culture/${blog.slug.current}`}
                                    className="inline-block bg-white px-6 -mt-4 relative z-10 text-xs text-blue-600"
                                >
                                    Culture
                                </Link>

                                <Link href={`/culture/${blog.slug.current}`}>
                                    <h2 className="mt-3 text-base font-bold uppercase leading-tight hover:text-blue-600">
                                        {blog.title}
                                    </h2>
                                </Link>

                                <p className="text-xs text-gray-500 mt-3">
                                    by <span className="text-black">{blog.author?.name || "Admin"}</span>
                                </p>

                                <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                                    {blog.excerpt}
                                </p>

                                <Link
                                    href={`/culture/${blog.slug.current}`}
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