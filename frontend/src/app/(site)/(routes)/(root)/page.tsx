import { getFeaturedBlogData, getHomePageData, getLatestBlogData } from "@/data/loaders";

import { HeroSection } from "./_components/hero-section";
import { BenefitSection } from "./_components/benefit-secrion";
import { Blocks } from "lucide-react";
import { notFound } from "next/navigation";
import BlogItem from "./_components/blog-item";

function blockRenderer(block: any) {
    switch (block.__component) {
        case "layout.hero-section":
            return <HeroSection key={block.id} data={block} />;
        case "layout.benefits-section":
            return <BenefitSection key={block.id} data={block} />;
        default:
            return null;
    }
}


export default async function Home() {
    // TODO: make the requests concurrent, concurrent rendering
    const strapiData = await getHomePageData();
    const featuredBlog = await getFeaturedBlogData()
    const latestBlog = await getLatestBlogData()

    const { blocks } = strapiData;

    if (!blocks) {
        notFound()
    }

    return (
        <div className="container space-y-10">
            {blocks.map((block: any) => blockRenderer(block))}
            {
                featuredBlog.data[0] &&
                <div className="my-4 max-w-5xl mx-auto space-y-6">
                    <h2 className="m-4 text-4xl font-bold flex justify-center tracking-tight">Featured Blog</h2>
                    <BlogItem {...featuredBlog.data[0]} imgRight={false} imgPath={featuredBlog.data[0]?.coverImage?.url} />
                </div>

            }

            {
                latestBlog.data[0] &&
                <div className="my-4 max-w-5xl mx-auto space-y-6">
                    <h2 className="m-4 text-4xl font-bold flex justify-center tracking-tight">Latest  Blog</h2>
                    <BlogItem {...latestBlog.data[0]} imgPath={latestBlog.data[0]?.coverImage?.url} />
                </div>

            }
        </div>
    );
}
