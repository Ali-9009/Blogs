import { client } from "@/sanity/lib/client";
import HeaderClient from "./HeaderClient";

const HEADER_QUERY = `
    *[
        _type == "category" &&
        defined(slug.current)
    ] | order(title asc) {
        _id,
        title,
        slug,

        "blogs": *[
            _type == "post" &&
            defined(slug.current) &&
            references(^._id)
        ] | order(coalesce(publishedAt, _createdAt) desc)[0...5] {
            _id,
            title,
            slug,
            mainImage,
            publishedAt,

            categories[]->{
                _id,
                title,
                slug
            }
        }
    }
`;

export default async function Header() {
  const navItems = await client.fetch(
    HEADER_QUERY,
    {},
    {
      cache: "no-store",
    }
  );

  return <HeaderClient navItems={navItems || []} />;
}