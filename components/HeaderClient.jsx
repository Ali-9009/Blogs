"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

export default function HeaderClient({ navItems }) {
    const [open, setOpen] = useState(false);
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        const onScroll = () => setSticky(window.scrollY > 40);
        onScroll();

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const leftItems = navItems.slice(0, 3);
    const rightItems = navItems.slice(3, 6);

    const closeAllMenus = () => {
        setOpen(false);
    };

    const getCategoryUrl = (category) => {
        return `/${category.slug.current}`;
    };

    const getBlogUrl = (blog) => {
        const categorySlug = blog.categories?.[0]?.slug?.current;
        const postSlug = blog.slug?.current;

        if (!categorySlug || !postSlug) return "#";

        return `/${categorySlug}/${postSlug}`;
    };

    const formatDate = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    const MegaMenu = ({ category }) => (
        <div className="pointer-events-none absolute left-1/2 top-full z-50 w-7xl mx-auto -translate-x-1/2 border-y border-gray-200 bg-white opacity-0 shadow-xl transition-all duration-300 ease-in-out group-hover:pointer-events-auto group-hover:opacity-100">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 py-5 sm:grid-cols-2 lg:grid-cols-5">
                {category.blogs?.map((blog) => (
                    <Link
                        key={blog._id}
                        href={getBlogUrl(blog)}
                        onClick={closeAllMenus}
                        className="group/card text-center"
                    >
                        <div className="relative mb-3 h-36 w-full overflow-hidden bg-gray-100">
                            {blog.mainImage && (
                                <Image
                                    src={urlFor(blog.mainImage).width(400).height(260).url()}
                                    alt={blog.title}
                                    fill
                                    sizes="20vw"
                                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                                />
                            )}

                            <span className="absolute left-2 top-2 bg-blue-600 px-2 py-1 text-[10px] font-semibold text-white">
                                {category.title}
                            </span>
                        </div>

                        <h3 className="line-clamp-2 px-1 text-sm font-bold leading-snug text-gray-800 transition-colors group-hover/card:text-blue-600">
                            {blog.title}
                        </h3>

                        <p className="mt-2 text-xs text-gray-400">
                            {formatDate(blog.publishedAt)}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );

    const DesktopNavItem = ({ category }) => (
        <div className="group static py-4">
            <div className="absolute left-0 top-full h-6 w-full" />

            <Link
                href={getCategoryUrl(category)}
                className="flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-gray-900 transition-colors hover:text-blue-600"
            >
                {category.title}
                <ChevronDown
                    size={15}
                    className="transition-transform duration-300 group-hover:rotate-180"
                />
            </Link>

            {category.blogs?.length > 0 && <MegaMenu category={category} />}
        </div>
    );

    return (
        <header className="w-full">
            <div
                className={`fixed left-0 top-0 z-50 w-full border-b transition-all duration-500 ease-in-out ${sticky
                        ? "border-white/30 bg-white/70 shadow-md backdrop-blur-xl"
                        : "border-gray-200 bg-white"
                    }`}
            >
                <div
                    className={`relative mx-auto flex items-center justify-between px-4 transition-all duration-500 ease-in-out sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:px-8 ${sticky ? "py-2" : "py-4 lg:py-4"
                        }`}
                >
                    <nav className="hidden items-center justify-start gap-8 lg:flex">
                        {leftItems.map((category) => (
                            <DesktopNavItem key={category._id} category={category} />
                        ))}
                    </nav>

                    <div className="flex items-center lg:justify-center">
                        <Link href="/" onClick={closeAllMenus} className="inline-flex">
                            <Image
                                src="/assets/logo.png"
                                alt="Logo"
                                width={200}
                                height={50}
                                priority
                                className={`w-auto object-contain transition-all duration-500 ease-in-out ${sticky ? "h-8 sm:h-9 lg:h-10" : "h-9 sm:h-10 lg:h-12"
                                    }`}
                            />
                        </Link>
                    </div>

                    <nav className="hidden items-center justify-end gap-8 lg:flex">
                        {rightItems.map((category) => (
                            <DesktopNavItem key={category._id} category={category} />
                        ))}
                    </nav>

                    <button
                        onClick={() => setOpen(true)}
                        className="justify-self-end rounded-md p-2 text-gray-900 hover:bg-gray-100 lg:hidden"
                        aria-label="Open menu"
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </div>

            <div className="h-18 sm:h-20 lg:h-26" />

            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/45 lg:hidden"
                    onClick={closeAllMenus}
                />
            )}

            <aside
                className={`fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <Link href="/" onClick={closeAllMenus}>
                        <Image
                            src="/assets/logo.png"
                            alt="Logo"
                            width={180}
                            height={60}
                            className="h-9 w-auto object-contain"
                        />
                    </Link>

                    <button
                        onClick={closeAllMenus}
                        className="rounded-md p-2 hover:bg-gray-100"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="h-[calc(100%-69px)] overflow-y-auto px-5 py-4">
                    {navItems.map((category) => (
                        <Link
                            key={category._id}
                            href={getCategoryUrl(category)}
                            onClick={closeAllMenus}
                            className="block border-b border-gray-200 py-4 text-base font-semibold text-gray-900 transition-colors hover:text-blue-600"
                        >
                            {category.title}
                        </Link>
                    ))}
                </nav>

            </aside>
        </header>
    );
}