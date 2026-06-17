import Banner from "@/components/Banner";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
// import { blogCategories } from "@/data/blogs";
import BlogGrid from "@/components/BlogGrid";
import Sidebar from "@/components/Sidebar";


const CATEGORIES_QUERY = `*[_type == "category"]{
  _id,
  title,
  slug,
  description,
  "image": *[
    _type == "post" &&
    references(^._id) &&
    defined(mainImage)
  ] | order(_createdAt desc)[0].mainImage
}[0...6]`;

export default async function Home() {
  const categories = await client.fetch(
    CATEGORIES_QUERY,
    {},
    { cache: "no-store" }
  );

  return (
    <>
      <Banner />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category) => (
            <article
              key={category._id}
              className="group relative h-40 overflow-hidden rounded-lg bg-gray-200"
            >
              <Link className="relative block h-40" href={`/${category.slug.current}`}>
                {category.image && (
                  <Image
                    src={urlFor(category.image).width(400).height(400).url()}
                    alt={category.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 16vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                )}

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