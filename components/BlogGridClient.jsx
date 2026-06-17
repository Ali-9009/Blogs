"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MoreVertical } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

export default function BlogGridClient({ posts }) {
    const [activeTab, setActiveTab] = useState("All");
    const [menuOpen, setMenuOpen] = useState(false);

    const tabs = [
        "All",
        ...new Set(
            posts
                .map((post) => post.categories?.[0]?.title)
                .filter(Boolean)
        ),
    ];

    const filteredPosts =
        activeTab === "All"
            ? posts
            : posts.filter((post) => post.categories?.[0]?.title === activeTab);

    const getHref = (post) => {
        const categorySlug = post.categories?.[0]?.slug?.current;
        const postSlug = post.slug?.current;

        if (!categorySlug || !postSlug) return "#";

        return `/${categorySlug}/${postSlug}`;
    };

    return (
        <section>
            <div className="mb-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="w-fit bg-blue-600 px-3 py-2 text-xs font-bold uppercase text-white">
                        Latest Blogs
                    </h2>

                    <div className="hidden items-center gap-4 md:flex">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-xs transition ${activeTab === tab
                                        ? "font-semibold text-blue-600"
                                        : "text-gray-500 hover:text-blue-600"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="relative md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-gray-600"
                        >
                            <span>{activeTab}</span>
                            <MoreVertical size={16} />
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 top-full z-20 mt-2 w-44 rounded-md border border-gray-200 bg-white shadow-lg">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => {
                                            setActiveTab(tab);
                                            setMenuOpen(false);
                                        }}
                                        className={`block w-full px-4 py-2 text-left text-sm ${activeTab === tab
                                                ? "bg-blue-50 text-blue-600"
                                                : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {filteredPosts.length === 0 ? (
                <p className="text-sm text-gray-500">No posts found.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-3">
                    {filteredPosts.slice(0, 6).map((post) => (
                        <article key={post._id}>
                            <Link href={getHref(post)}>
                                {post.mainImage && (
                                    <Image
                                        src={urlFor(post.mainImage).width(600).height(400).url()}
                                        alt={post.title}
                                        width={600}
                                        height={400}
                                        className="h-56 w-full object-cover"
                                    />
                                )}
                            </Link>

                            <p className="mt-3 text-xs uppercase text-blue-600">
                                {post.categories?.[0]?.title || "Blog"}
                            </p>

                            <Link href={getHref(post)}>
                                <h3 className="mt-2 text-base font-bold uppercase hover:text-blue-600">
                                    {post.title}
                                </h3>
                            </Link>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}