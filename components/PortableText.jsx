import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const components = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-7 mb-4">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mt-6 mb-2">
        {children}
      </h3>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-4 italic my-4">
        {children}
      </blockquote>
    ),

    normal: ({ children }) => (
      <p className="mb-4 leading-8">
        {children}
      </p>
    ),
  },

  types: {
    image: ({ value }) => (
      <div className="my-8">
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt || ""}
          width={1200}
          height={700}
          className="w-full rounded-lg"
        />
      </div>
    ),
  },
};

export default function PortableTextComponent({ value }) {
  return (
    <PortableText
      value={value}
      components={components}
    />
  );
}