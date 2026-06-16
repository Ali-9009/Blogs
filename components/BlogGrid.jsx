"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import ArticleCard from "@/components/ArticleCard";
import { blogCategories } from "@/data/blogs";
import { MoreVertical } from "lucide-react";

export default function BlogGrid() {
    const latestLifeStyle = [
        blogCategories.food,
        blogCategories.travel,
        blogCategories.healthyLiving,
        blogCategories.style,
    ];


    const latestFashion = [
        blogCategories.fashion,
        blogCategories.culture,
        blogCategories.tech,
        blogCategories.travel,
    ];

    return (
        <div className="space-y-10">
            <BlogSection
                title="Latest in Life Style"
                categories={latestLifeStyle}
                layout="large"
            />

            <BlogSection
                title="Latest in Fashion"
                categories={latestFashion}
                layout="grid"
            />
        </div>
    );

}

function BlogSection({ title, categories, layout }) {
    const [activeTab, setActiveTab] = useState("All");
    const [menuOpen, setMenuOpen] = useState(false);


    // Generate tabs dynamically
    const tabs = ["All", ...categories.map((category) => category.title)];

    // Flatten all posts
    const allPosts = categories.flatMap((category) =>
        category.blogs.map((blog) => ({
            ...blog,
            category: category.title,
            categoryHref: category.href,
        }))
    );

    // Filter posts
    const posts =
        activeTab === "All"
            ? allPosts
            : allPosts.filter(
                (post) => post.category === activeTab
            );

    return (
        <section>
            <div className="mb-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="w-fit bg-blue-600 px-3 py-2 text-xs font-bold uppercase text-white">
                        {title}
                    </h2>

                    {/* Desktop Tabs */}
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

                    {/* Mobile Dropdown */}
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

            {posts.length === 0 ? (
                <p className="text-sm text-gray-500">
                    No posts found.
                </p>
            ) : layout === "large" ? (
                <>
                    <div className="grid gap-6 md:grid-cols-2">
                        {posts.slice(0, 2).map((post) => (
                            <ArticleCard
                                key={post.slug}
                                post={post}
                                imageHeight="h-72"
                            />
                        ))}
                    </div>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        {posts.slice(2, 6).map((post) => (
                            <SmallPost
                                key={post.slug}
                                post={post}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="grid gap-6 md:grid-cols-3">
                    {posts.slice(0, 6).map((post) => (
                        <ArticleCard
                            key={post.slug}
                            post={post}
                            imageHeight="h-56"
                            showExcerpt={false}
                        />
                    ))}
                </div>
            )}
        </section>
    );


}

function SmallPost({ post }) {
    return (
        <Link
            href={`${post.categoryHref}/${post.slug}`}
            className="group flex gap-3"
        > <div className="w-28 shrink-0 overflow-hidden rounded-md"> <Image
            src={post.image}
            alt={post.title}
            width={600}
            height={400}
            className="h-24 w-full object-cover transition duration-300 group-hover:scale-105"
        /> </div>

            <div>
                <span className="text-xs font-medium uppercase text-blue-600">
                    {post.category}
                </span>

                <h4 className="mt-1 text-sm font-semibold leading-tight transition-colors group-hover:text-blue-600">
                    {post.title}
                </h4>

                <p className="mt-1 text-xs text-gray-400">
                    {post.date}
                </p>
            </div>
        </Link>
    );


}
