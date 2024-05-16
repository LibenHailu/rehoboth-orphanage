import { getHomePageData } from "@/data/loaders";

import { HeroSection } from "./_components/hero-section";
import { Blocks } from "lucide-react";
import { notFound } from "next/navigation";
// import { FeatureSection } from "@/components/custom/FeaturesSection";

function blockRenderer(block: any) {
    switch (block.__component) {
        case "layout.hero-section":
            return <HeroSection key={block.id} data={block} />;
        // case "layout.features-section":
        //     return <FeatureSection key={block.id} data={block} />;
        default:
            return null;
    }
}


export default async function Home() {
    const strapiData = await getHomePageData();

    const { blocks } = strapiData;
    if (!blocks) {
        notFound()
    }

    return (
        <div>
            {blocks.map((block: any) => blockRenderer(block))}
        </div>
    );
}
