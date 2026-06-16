export const blogCategories = {
    culture: {
        title: "Culture",
        image: "/assets/Culture.png",
        href: "/culture",
        blogs: [
            {
                id: 1,
                title: "The Evolution of Modern Art and Culture",
                slug: "evolution-of-modern-art-and-culture",
                image: "/assets/blog-1.webp",
                author: "Admin",
                date: "2026-06-15",
                excerpt: "Exploring how modern art has influenced global culture.",
                content: `

            Modern art emerged as a revolutionary movement that challenged traditional artistic
            conventions and encouraged new forms of creative expression. Artists began exploring
            innovative techniques, abstract concepts, and unique perspectives that reshaped the
            art world and influenced generations of creators.

            Throughout the twentieth century, movements such as Impressionism, Cubism,
            Surrealism, and Abstract Expressionism introduced fresh ideas about how art could
            communicate emotions, stories, and social commentary. These movements expanded the
            boundaries of creativity and inspired artists to experiment with color, form, and
            symbolism.

            Beyond galleries and museums, modern art has had a profound impact on global culture.
            Its influence can be seen in architecture, fashion, advertising, photography, and
            digital media. Many contemporary design trends draw inspiration from artistic
            principles developed during the modern art era.

            Technology has further transformed the relationship between art and culture. Digital
            platforms allow artists to share their work with worldwide audiences, while new tools
            such as virtual reality and artificial intelligence continue to redefine creative
            possibilities.

            As society evolves, modern art remains an important force for innovation and cultural
            dialogue. Its legacy demonstrates how creativity can challenge perspectives, inspire
            change, and connect people across different backgrounds and experiences. `
            },
            {
                id: 2,
                title: "Cultural Traditions That Still Shape Society",
                slug: "cultural-traditions-shaping-society",
                image: "/assets/blog-1.webp",
                author: "Admin",
                date: "2026-06-14",
                excerpt: "A look at traditions that continue to impact daily life.",
            },
        ],
    },

    fashion: {
        title: "Fashion",
        image: "/assets/Fashion.webp",
        href: "/fashion",
        blogs: [
            {
                id: 3,
                title: "Top Fashion Trends for 2026",
                slug: "top-fashion-trends-2026",
                image: "/assets/blog-1.webp",
                author: "Admin",
                date: "2026-06-13",
                excerpt: "The biggest fashion trends dominating this year.",
            },
            {
                id: 4,
                title: "Sustainable Fashion: The Future of Style",
                slug: "sustainable-fashion-future",
                image: "/assets/blog-1.webp",
                author: "Admin",
                date: "2026-06-12",
                excerpt: "Why sustainability is changing the fashion industry.",
            },
        ],
    },

    featured: {
        title: "Featured",
        image: "/assets/Featured.webp",
        href: "#",
        blogs: [
            {
                id: 5,
                title: "Featured Story: Innovation in Everyday Life",
                slug: "innovation-in-everyday",
                image: "/assets/blog-1.webp",
                author: "Admin",
                date: "2026-06-11",
                excerpt: "How innovation is improving daily experiences.",
            },
        ],
    },

    food: {
        title: "Food",
        image: "/assets/Food.webp",
        href: "/food",
        blogs: [
            {
                id: 6,
                title: "Featured Story: Innovation in Everyday Life",
                slug: "innovation-everyday-life",
                image: "/assets/blog-1.webp",
                author: "Admin",
                date: "2026-06-11",
                excerpt: "How innovation is improving daily experiences.",
            },
        ],
    },

    healthyLiving: {
        title: "Healthy Living",
        image: "/assets/Living.webp",
        href: "/living",
        blogs: [
            {
                id: 7,
                title: "Featured Story: Innovation in Everyday Life",
                slug: "innovation-in-everyday-life",
                image: "/assets/blog-1.webp",
                author: "Admin",
                date: "2026-06-11",
                excerpt: "How innovation is improving daily experiences.",
            },
            {
                id: 8,
                title: "Featured Story: Innovation in Everyday Life",
                slug: "innovation-in-life",
                image: "/assets/blog-1.webp",
                author: "Admin",
                date: "2026-06-11",
                excerpt: "How innovation is improving daily experiences.",
            },
            {
                id: 12,
                title: "Featured Story: Innovation in Everyday Life",
                slug: "innovation",
                image: "/assets/blog-1.webp",
                author: "Admin",
                date: "2026-06-11",
                excerpt: "How innovation is improving daily experiences.",
            },
        ],
    },

    style: {
        title: "Style",
        image: "/assets/blog-1.webp",
        href: "/#",
        blogs: [
            {
                id: 9,
                title: "Featured Story: Innovation in Everyday Life",
                slug: "n-in-everyday-life",
                image: "/assets/blog-1.webp",
                author: "Admin",
                date: "2026-06-11",
                excerpt: "How innovation is improving daily experiences.",
            },
        ],
    },

    tech: {
        title: "Tech",
        image: "/assets/blog-1.webp",
        href: "/tech",
        blogs: [
            {
                id: 10,
                title: "Featured Story: Innovation in Everyday Life",
                slug: "innovation-in-fe",
                image: "/assets/blog-1.webp",
                author: "Admin",
                date: "2026-06-11",
                excerpt: "How innovation is improving daily experiences.",
            },
        ],
    },

    travel: {
        title: "Travel",
        image: "/assets/blog-1.webp",
        href: "/travel",
        blogs: [
            {
                id: 11,
                title: "Featured Story: Innovation in Everyday Life",
                slug: "in-everyday-life",
                image: "/assets/blog-1.webp",
                author: "Admin",
                date: "2026-06-11",
                excerpt: "How innovation is improving daily experiences.",
            },
        ],
    },
};



export const blogs = Object.entries(blogCategories).flatMap(
    ([key, category]) =>
        category.blogs.map(blog => ({
            ...blog,
            category: category.title,
        }))
);