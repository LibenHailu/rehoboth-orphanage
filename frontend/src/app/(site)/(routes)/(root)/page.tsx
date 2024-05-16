import { getHomePageData } from "@/data/loaders";

import { HeroSection } from "./_components/hero-section";
import { BenefitSection } from "./_components/benefit-secrion";
import { Blocks } from "lucide-react";
import { notFound } from "next/navigation";

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
