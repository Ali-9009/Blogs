"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Home,
    Search,
    X,
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

export default function HeaderClient({ navItems = [] }) {
    const router = useRouter();

    const [collapsed, setCollapsed] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const [currentDate, setCurrentDate] = useState({
        gregorian: "",
        islamic: "",
    });

    const navRef = useRef(null);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const today = new Date();

        const gregorian = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(today);

        let islamic = "";

        try {
            islamic = new Intl.DateTimeFormat(
                "en-US-u-ca-islamic-umalqura",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                }
            ).format(today);
        } catch {
            islamic = "";
        }

        setCurrentDate({
            gregorian,
            islamic,
        });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setCollapsed(currentScrollY > 55);
            lastScrollY.current = currentScrollY;
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const closeMegaMenu = (event) => {
            if (!event.target.closest("[data-header-category]")) {
                setActiveCategory(null);
            }
        };

        document.addEventListener("click", closeMegaMenu);

        return () => {
            document.removeEventListener("click", closeMegaMenu);
        };
    }, []);

    const getCategoryUrl = (category) => {
        const slug = category?.slug?.current;

        return slug ? `/${slug}` : "#";
    };

    const getBlogUrl = (blog) => {
        const categorySlug = blog?.categories?.[0]?.slug?.current;
        const postSlug = blog?.slug?.current;

        if (!categorySlug || !postSlug) {
            return "#";
        }

        return `/${categorySlug}/${postSlug}`;
    };

    const formatPostDate = (date) => {
        if (!date) return "";

        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(new Date(date));
    };

    const scrollCategories = (direction) => {
        if (!navRef.current) return;

        const scrollAmount =
            Math.min(navRef.current.clientWidth * 0.7, 500) * direction;

        navRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const handleCategoryClick = (event, category) => {
        if (window.innerWidth >= 1024) return;

        if (
            category.blogs?.length > 0 &&
            activeCategory?._id !== category._id
        ) {
            event.preventDefault();
            setActiveCategory(category);
        } else {
            setActiveCategory(null);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setSearchOpen(false);
                setActiveCategory(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        const query = searchValue.trim();

        if (!query) return;

        setSearchOpen(false);
        setActiveCategory(null);

        router.push(`/search?q=${encodeURIComponent(query)}`);
    };

    return (
        <header className="sticky top-0 z-50 w-full">
            <div className="w-full bg-[#181818] text-white shadow-lg">
                {/* Top logo and date section */}
                <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${collapsed
                            ? "max-h-0 -translate-y-6 border-b-0 opacity-0"
                            : "max-h-24 translate-y-0 border-b border-white/15 opacity-100"
                        }`}
                >
                    <div className="relative mx-auto flex h-16 max-w-375 items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
                        {/* Date */}
                        <div className="min-w-0 flex-1 pr-3 lg:block hidden">
                            <p className="truncate text-[10px] font-semibold sm:text-xs lg:text-sm">
                                {currentDate.islamic && (
                                    <>
                                        {currentDate.islamic}
                                        <span className="mx-2 text-white/50">
                                            |
                                        </span>
                                    </>
                                )}

                                {currentDate.gregorian}
                            </p>
                        </div>

                        {/* Center logo */}
                        <Link
                            href="/"
                            onClick={() => setActiveCategory(null)}
                            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                            aria-label="Go to homepage"
                        >
                            <Image
                                src="/assets/logo.png"
                                alt="Website logo"
                                width={210}
                                height={58}
                                priority
                                className="h-9 w-auto max-w-36 object-contain brightness-0 invert sm:h-11 sm:max-w-47"
                            />
                        </Link>

                        {/* Right actions */}
                        <div className="flex flex-1 items-center justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchOpen((previous) => !previous);
                                    setActiveCategory(null);
                                }}
                                aria-label={searchOpen ? "Close search" : "Open search"}
                                aria-expanded={searchOpen}
                                className="rounded-full p-2 transition-colors hover:bg-white/10"
                            >
                                {searchOpen ? <X size={20} /> : <Search size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sticky category bar */}
                <div className="relative border-b border-white/15 bg-[#181818]">
                    <div className="mx-auto flex max-w-[1600px] items-stretch">
                        {/* Left scroll button */}
                        <button
                            type="button"
                            onClick={() => scrollCategories(-1)}
                            className="hidden w-10 shrink-0 items-center justify-center border-r border-white/15 bg-[#181818] transition-colors hover:bg-white/10 md:flex"
                            aria-label="Scroll categories left"
                        >
                            <ChevronLeft size={19} />
                        </button>

                        <nav
                            ref={navRef}
                            className="category-scrollbar flex flex-1 snap-x snap-mandatory items-stretch overflow-x-auto overscroll-x-contain scroll-smooth"
                            aria-label="Main categories"
                        >
                            <Link
                                href="/"
                                onClick={() => {
                                    setActiveCategory(null);
                                    setSearchOpen(false);
                                }}
                                className="flex h-16 min-w-75 shrink-0 snap-start items-center justify-center gap-2 border-r border-white/15 px-4 text-xs font-semibold transition-colors hover:bg-white/10 sm:min-w-27 sm:text-sm"
                            >
                                <Home size={18} />
                                <span>Home</span>
                            </Link>
                            {navItems.map((category) => {
                                const isActive =
                                    activeCategory?._id === category._id;

                                return (
                                    <div
                                        key={category._id}
                                        data-header-category
                                        className="group relative shrink-0 snap-start"
                                        onMouseEnter={() => {
                                            if (
                                                window.innerWidth >= 1024 &&
                                                category.blogs?.length > 0
                                            ) {
                                                setActiveCategory(category);
                                            }
                                        }}
                                    >
                                        <Link
                                            href={getCategoryUrl(category)}
                                            onClick={(event) =>
                                                handleCategoryClick(
                                                    event,
                                                    category
                                                )
                                            }
                                            className={`flex h-16 min-w-26 items-center justify-center gap-1.5 border-r border-white/15 px-4 text-center text-xs font-semibold transition-colors sm:min-w-30 sm:px-5 sm:text-sm ${isActive
                                                    ? "bg-white/15"
                                                    : "hover:bg-white/10"
                                                }`}
                                        >
                                            <span className="whitespace-nowrap">
                                                {category.title}
                                            </span>

                                            {category.blogs?.length > 0 && (
                                                <ChevronDown
                                                    size={14}
                                                    className={`shrink-0 transition-transform duration-300 ${isActive
                                                            ? "rotate-180"
                                                            : ""
                                                        }`}
                                                />
                                            )}
                                        </Link>
                                    </div>
                                );
                            })}
                        </nav>

                        {/* Right scroll button */}
                        <button
                            type="button"
                            onClick={() => scrollCategories(1)}
                            className="hidden w-10 shrink-0 items-center justify-center border-l border-white/15 bg-[#181818] transition-colors hover:bg-white/10 md:flex"
                            aria-label="Scroll categories right"
                        >
                            <ChevronRight size={19} />
                        </button>
                    </div>
                </div>

                <div
                    className={`absolute left-0 top-full z-50 w-full overflow-hidden bg-white text-gray-900 shadow-2xl transition-all duration-300 ease-in-out ${searchOpen
                            ? "visible max-h-60 translate-y-0 border-b border-gray-200 opacity-100"
                            : "invisible max-h-0 -translate-y-3 border-b-0 opacity-0"
                        }`}
                >
                    <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6">
                        <form
                            onSubmit={handleSearchSubmit}
                            className="flex items-center overflow-hidden rounded-xl border border-gray-300 bg-gray-50 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100"
                        >
                            <Search
                                size={21}
                                className="ml-4 shrink-0 text-gray-400"
                            />

                            <input
                                type="search"
                                value={searchValue}
                                onChange={(event) =>
                                    setSearchValue(event.target.value)
                                }
                                placeholder="Search articles..."
                                autoFocus={searchOpen}
                                className="min-w-0 flex-1 bg-transparent px-4 py-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 sm:text-base"
                            />

                            {searchValue && (
                                <button
                                    type="button"
                                    onClick={() => setSearchValue("")}
                                    className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700"
                                    aria-label="Clear search"
                                >
                                    <X size={18} />
                                </button>
                            )}

                            <button
                                type="submit"
                                disabled={!searchValue.trim()}
                                className="m-1.5 shrink-0 rounded-lg bg-[#181818] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#193bb7] disabled:cursor-not-allowed disabled:opacity-50 sm:px-6"
                            >
                                Search
                            </button>
                        </form>

                        <p className="mt-2 text-xs text-gray-400">
                            Search by article title, category or keyword.
                        </p>
                    </div>
                </div>

                {/* Mega menu */}
                <div
                    className={`absolute left-0 top-full w-full overflow-hidden bg-white text-gray-900 shadow-2xl transition-all duration-300 ease-in-out ${activeCategory?.blogs?.length > 0 && !searchOpen
                            ? "visible max-h-[650px] translate-y-0 border-b border-gray-200 opacity-100"
                            : "invisible max-h-0 -translate-y-3 border-b-0 opacity-0"
                        }`}
                    onMouseLeave={() => {
                        if (window.innerWidth >= 1024) {
                            setActiveCategory(null);
                        }
                    }}
                >
                    {activeCategory && (
                        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                            <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
                                <h2 className="text-lg font-bold text-gray-900">
                                    {activeCategory.title}
                                </h2>

                                <Link
                                    href={getCategoryUrl(activeCategory)}
                                    onClick={() =>
                                        setActiveCategory(null)
                                    }
                                    className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                                >
                                    View all
                                </Link>
                            </div>

                            <div className="grid max-h-107 grid-cols-1 gap-4 overflow-y-auto sm:grid-cols-2 lg:grid-cols-5">
                                {activeCategory.blogs?.map((blog) => (
                                    <Link
                                        key={blog._id}
                                        href={getBlogUrl(blog)}
                                        onClick={() =>
                                            setActiveCategory(null)
                                        }
                                        className="group/card overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <div className="relative h-32 w-full overflow-hidden bg-gray-100">
                                            {blog.mainImage ? (
                                                <Image
                                                    src={urlFor(
                                                        blog.mainImage
                                                    )
                                                        .width(500)
                                                        .height(320)
                                                        .url()}
                                                    alt={
                                                        blog.title ||
                                                        "Post image"
                                                    }
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                                                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center bg-gray-100 text-xs text-gray-400">
                                                    No image
                                                </div>
                                            )}

                                            <span className="absolute left-2 top-2 bg-[#181818] px-2 py-1 text-[10px] font-bold text-white">
                                                {activeCategory.title}
                                            </span>
                                        </div>

                                        <div className="p-3">
                                            <h3 className="line-clamp-2 text-sm font-bold leading-5 text-gray-900 transition-colors group-hover/card:text-blue-600">
                                                {blog.title}
                                            </h3>

                                            {blog.publishedAt && (
                                                <p className="mt-2 text-xs text-gray-400">
                                                    {formatPostDate(
                                                        blog.publishedAt
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx global>{`
                .category-scrollbar {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }

                .category-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </header>
    );
}