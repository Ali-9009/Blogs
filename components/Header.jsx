"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { blogCategories } from "@/data/blogs";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [sticky, setSticky] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        const onScroll = () => setSticky(window.scrollY > 40);
        onScroll();

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navItems = [
        blogCategories.healthyLiving,
        blogCategories.culture,
        blogCategories.fashion,
        blogCategories.food,
        blogCategories.travel,
        blogCategories.tech,
    ];

    const leftItems = navItems.slice(0, 3);
    const rightItems = navItems.slice(3, 6);

    const closeAllMenus = () => {
        setOpen(false);
        setActiveDropdown(null);
    };

    const getBlogUrl = (category, blog) => {
        const categoryPath = category.href === "#" ? "" : category.href;
        return `${categoryPath}/${blog.slug}`;
    };

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });


    useEffect(() => {
        const handleClickOutside = () => {
            setActiveDropdown(null);
        };

        if (activeDropdown) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [activeDropdown]);

    const MegaMenu = ({ category }) => (
        <div className="absolute left-1/2 top-full z-50 mt-5 w-7xl -translate-x-1/2 border-y border-gray-200 bg-white shadow-xl">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 py-5 sm:grid-cols-2 lg:grid-cols-5">
                {category.blogs.map((blog) => (
                    <Link
                        key={blog.id}
                        href={getBlogUrl(category, blog)}
                        onClick={closeAllMenus}
                        className="group/card text-center"
                    >
                        <div className="relative mb-3 h-36 w-full overflow-hidden bg-gray-100">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                            />

                            <span className="absolute left-2 top-2 bg-blue-600 px-2 py-1 text-[10px] font-semibold text-white">
                                {category.title}
                            </span>
                        </div>

                        <h3 className="line-clamp-2 px-1 text-sm font-bold leading-snug text-gray-800 transition-colors group-hover/card:text-blue-600">
                            {blog.title}
                        </h3>

                        <p className="mt-2 text-xs text-gray-400">{formatDate(blog.date)}</p>
                    </Link>
                ))}
            </div>
        </div>
    );

    const DesktopNavItem = ({ category }) => (
        <div className="static">
            <button
                onClick={() =>
                    setActiveDropdown(
                        activeDropdown === category.title ? null : category.title
                    )
                }
                className="flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-gray-900 transition-colors hover:text-blue-600"
            >
                {category.title}

                <ChevronDown
                    size={15}
                    className={`transition-transform duration-300 ${activeDropdown === category.title ? "rotate-180" : ""
                        }`}
                />
            </button>

            {activeDropdown === category.title && category.blogs?.length > 0 && (
                <MegaMenu category={category} />
            )}
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
                            <DesktopNavItem key={category.title} category={category} />
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
                            <DesktopNavItem key={category.title} category={category} />
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
                        <details key={category.title} className="group border-b border-gray-200 py-2">
                            <summary className="flex cursor-pointer list-none items-center justify-between py-3">
                                <Link
                                    href={category.href}
                                    onClick={closeAllMenus}
                                    className="font-semibold text-gray-900"
                                >
                                    {category.title}
                                </Link>

                                <ChevronDown
                                    size={18}
                                    className="transition-transform group-open:rotate-180"
                                />
                            </summary>

                            <div className="space-y-4 pb-4">
                                {category.blogs.map((blog) => (
                                    <Link
                                        key={blog.id}
                                        href={getBlogUrl(category, blog)}
                                        onClick={closeAllMenus}
                                        className="flex gap-3"
                                    >
                                        <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-gray-100">
                                            <Image
                                                src={blog.image}
                                                alt={blog.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div>
                                            <h4 className="line-clamp-2 text-sm font-semibold text-gray-800">
                                                {blog.title}
                                            </h4>
                                            <p className="mt-1 text-xs text-gray-400">
                                                {formatDate(blog.date)}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </details>
                    ))}
                </nav>
            </aside>
        </header>
    );
}