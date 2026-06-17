import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";

const POSTS_QUERY = `*[
  _type == "post" &&
  references(*[_type == "category" && slug.current == $category]._id)
] | order(_createdAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  author->{name},
  categories[]->{
    title,
    slug
  }
}`;

const CATEGORY_QUERY = `*[_type == "category" && slug.current == $category][0]{
  title,
  slug
}`;

export default async function CategoryPage({ params }) {
    const { category } = await params;

    const categoryData = await client.fetch(
        CATEGORY_QUERY,
        { category },
        { cache: "no-store" }
    );

    if (!categoryData) notFound();

    const posts = await client.fetch(
        POSTS_QUERY,
        { category },
        { cache: "no-store" }
    );

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
                <section>
                    <h1 className="text-center text-xl font-bold uppercase mb-8">
                        Category:
                        <span className="text-blue-700"> {categoryData.title}</span>
                    </h1>

                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                        {posts.map((blog) => (
                            <article key={blog._id}>
                                <Link href={`/${category}/${blog.slug.current}`}>
                                    {blog.mainImage && (
                                        <Image
                                            src={urlFor(blog.mainImage).width(600).height(400).url()}
                                            alt={blog.title}
                                            width={600}
                                            height={400}
                                            className="w-full h-64 object-cover"
                                        />
                                    )}
                                </Link>

                                <Link href={`/${category}/${blog.slug.current}`} className="inline-block bg-blue-700 relative z-10 text-sm font-medium text-white p-1 mt-2">
                                    {categoryData.title}
                                </Link>

                                <Link href={`/${category}/${blog.slug.current}`}>
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
                            </article>
                        ))}
                    </div>
                </section>

                <Sidebar />
            </div>
        </main>
    );
}