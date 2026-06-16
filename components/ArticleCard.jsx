import Link from "next/link";
import Image from "next/image";

export default function ArticleCard({
    post,
    imageHeight = "h-56",
    showCategory = true,
    showExcerpt = true,
    showReadMore = false,
}) {
    return (
        <Link
            href={`${post.categoryHref}/${post.slug}`}
            className="group block overflow-hidden"
        >
            <div className={`relative w-full ${imageHeight}`}>
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="pt-4">
                {showCategory && (
                    <span className="text-xs font-medium uppercase tracking-wider text-blue-600">
                        {post.category}
                    </span>
                )}

                <h3 className="mt-2 text-lg font-bold leading-tight transition-colors group-hover:text-blue-600">
                    {post.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                    By {post.author} · {post.date}
                </p>

                {showExcerpt && (
                    <p className="mt-3 text-gray-600 line-clamp-3">
                        {post.excerpt}
                    </p>
                )}

                {showReadMore && (
                    <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                        Read More →
                    </span>
                )}
            </div>
        </Link>
    );
}