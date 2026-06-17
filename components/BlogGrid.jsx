// BlogGrid.jsx
import { client } from "@/sanity/lib/client";
import BlogGridClient from "./BlogGridClient";

const POSTS_QUERY = `*[_type == "post"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  author->{name},
  categories[]->{
    title,
    slug
  }
}`;

export default async function BlogGrid() {
    const posts = await client.fetch(POSTS_QUERY, {}, { cache: "no-store" });

    return <BlogGridClient posts={posts} />;
}