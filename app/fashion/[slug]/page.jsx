import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  body,
  author->{name},
  categories[]->{
    title
  }
}`;

export default async function BlogDetailPage({ params }) {
    const { slug } = await params;

    const blog = await client.fetch(POST_QUERY, { slug });

    if (!blog) notFound();

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            {blog.mainImage && (
                <Image
                    src={urlFor(blog.mainImage).width(1000).height(500).url()}
                    alt={blog.title}
                    width={1000}
                    height={500}
                    className="w-full h-auto rounded-lg"
                />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 md:mt-10 mt-6">
                <article>
                    <span className="text-sm text-blue-600 uppercase">
                        {blog.categories?.[0]?.title || "Fashion"}
                    </span>

                    <h1 className="text-3xl font-bold mt-3">
                        {blog.title}
                    </h1>

                    <p className="text-gray-500 mt-3">
                        By {blog.author?.name || "Admin"}
                    </p>

                    <div className="prose max-w-none mt-8">
                        <p>{blog.excerpt}</p>
                    </div>

                    <div className="prose max-w-none mt-4">
                        {blog.body?.map((block) => (
                            <p key={block._key}>
                                {block.children?.map((child) => child.text).join("")}
                            </p>
                        ))}
                    </div>
                </article>

                <Sidebar />
            </div>
        </main>
    );
}