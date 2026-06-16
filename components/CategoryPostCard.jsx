import Image from "next/image";
import Link from "next/link";

export default function CategoryPostCard({ blog, category }) {
    const categorySlug = category.toLowerCase().replaceAll(" ", "-");

    return (
        <article className="text-center">
            <Link href={`/blog/${blog.slug}`}>
                <Image
                    src={blog.image}
                    alt={blog.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                />
            </Link>

            <Link
                href={`/category/${categorySlug}`}
                className="inline-block bg-white px-6 -mt-4 relative z-10 text-xs text-blue-600"
            >
                {category}
            </Link>

            <Link href={`/blog/${blog.slug}`}>
                <h2 className="mt-3 text-base font-bold uppercase leading-tight hover:text-blue-600">
                    {blog.title}
                </h2>
            </Link>

            <p className="text-xs text-gray-500 mt-3">
                by <span className="text-black">{blog.author}</span> · {blog.date}
            </p>

            <p className="text-sm text-gray-600 mt-4 leading-relaxed text-left">
                {blog.excerpt}
            </p>

            <Link
                href={`/blog/${blog.slug}`}
                className="inline-block mt-5 bg-blue-600 text-white text-xs font-bold px-5 py-2 uppercase"
            >
                Read the Article ›
            </Link>
        </article>
    );
}