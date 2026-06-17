import { client } from "@/sanity/lib/client";
import HeaderClient from "./HeaderClient";

const HEADER_QUERY = `*[_type == "category"] | order(title asc)[0...6] {
  _id,
  title,
  slug,
  "blogs": *[
    _type == "post" &&
    references(^._id)
  ] | order(_createdAt desc)[0...5] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    categories[]->{
      title,
      slug
    }
  }
}`;

export default async function Header() {
    const navItems = await client.fetch(
        HEADER_QUERY,
        {},
        { cache: "no-store" }
    );

    return <HeaderClient navItems={navItems} />;
}