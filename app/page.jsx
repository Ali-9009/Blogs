import Banner from "@/components/Banner";
import Image from "next/image";
import { blogCategories } from "@/data/blogs";
import BlogGrid from "@/components/BlogGrid";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function Home() {

  return (
    <>
      <Banner />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
          {Object.entries(blogCategories).slice(0, 6).map(([key, category]) => (
            <article
              key={key}
              className="relative overflow-hidden rounded-lg"
            >
              <Link href={category.href}>
                <Image
                  src={category.image}
                  alt={category.title}
                  width={400}
                  height={400}
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

                <div className="absolute inset-x-0 bottom-5 text-center">
                  <h3 className="text-xl font-semibold text-white">
                    {category.title}
                  </h3>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          <BlogGrid />
          <Sidebar />
        </div>
      </div>
    </>
  );
}