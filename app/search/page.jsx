import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const SEARCH_QUERY = `
    *[
        _type == "post" &&
        defined(slug.current) &&
        (
            title match $searchTerm ||
            pt::text(body) match $searchTerm ||
            metaTitle match $searchTerm ||
            metaDescription match $searchTerm ||
            count(
                categories[]->[
                    title match $searchTerm
                ]
            ) > 0
        )
    ] | order(coalesce(publishedAt, _createdAt) desc) {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        metaDescription,

        "category": categories[0]->{
            title,
            slug
        }
    }
`;

function formatDate(date) {
    if (!date) return "";

    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));
}

export async function generateMetadata({ searchParams }) {
    const params = await searchParams;
    const query = params?.q?.trim() || "";

    return {
        title: query
            ? `Search results for "${query}"`
            : "Search",
        description: query
            ? `Articles matching ${query}`
            : "Search articles",
    };
}

export default async function SearchPage({ searchParams }) {
    const params = await searchParams;
    const query = params?.q?.trim() || "";

    let posts = [];

    if (query) {
        posts = await client.fetch(
            SEARCH_QUERY,
            {
                searchTerm: `*${query}*`,
            },
            {
                cache: "no-store",
            }
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <section className="bg-[#2048d6] px-4 py-12 text-white sm:py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center gap-3">
                        <Search size={30} />

                        <h1 className="text-2xl font-bold sm:text-4xl">
                            Search
                        </h1>
                    </div>

                    {query && (
                        <p className="mt-3 text-sm text-white/80 sm:text-base">
                            Results for:{" "}
                            <span className="font-semibold text-white">
                                “{query}”
                            </span>
                        </p>
                    )}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                {!query ? (
                    <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
                        <Search
                            size={42}
                            className="mx-auto text-gray-300"
                        />

                        <h2 className="mt-4 text-xl font-bold text-gray-900">
                            Enter a search keyword
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Use the search button in the header to find
                            articles.
                        </p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
                        <Search
                            size={42}
                            className="mx-auto text-gray-300"
                        />

                        <h2 className="mt-4 text-xl font-bold text-gray-900">
                            No articles found
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            No results matched “{query}”. Try another
                            keyword.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">
                                Search results
                            </h2>

                            <span className="text-sm text-gray-500">
                                {posts.length}{" "}
                                {posts.length === 1
                                    ? "article"
                                    : "articles"}
                            </span>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => {
                                const categorySlug =
                                    post.category?.slug?.current;

                                const postUrl = categorySlug
                                    ? `/${categorySlug}/${post.slug.current}`
                                    : `/post/${post.slug.current}`;

                                return (
                                    <Link
                                        key={post._id}
                                        href={postUrl}
                                        className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        <div className="relative h-52 overflow-hidden bg-gray-100">
                                            {post.mainImage ? (
                                                <Image
                                                    src={urlFor(
                                                        post.mainImage
                                                    )
                                                        .width(700)
                                                        .height(450)
                                                        .url()}
                                                    alt={
                                                        post.title ||
                                                        "Article image"
                                                    }
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                                    No image
                                                </div>
                                            )}

                                            {post.category?.title && (
                                                <span className="absolute left-3 top-3 rounded-md bg-[#2048d6] px-3 py-1 text-xs font-semibold text-white">
                                                    {
                                                        post.category
                                                            .title
                                                    }
                                                </span>
                                            )}
                                        </div>

                                        <div className="p-5">
                                            <h3 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-blue-600">
                                                {post.title}
                                            </h3>

                                            {post.metaDescription && (
                                                <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
                                                    {
                                                        post.metaDescription
                                                    }
                                                </p>
                                            )}

                                            {post.publishedAt && (
                                                <p className="mt-4 text-xs text-gray-400">
                                                    {formatDate(
                                                        post.publishedAt
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}