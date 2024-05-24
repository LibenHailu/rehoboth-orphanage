"use client";

import * as React from "react";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { defaultUser } from "@/lib/metadata";

interface ImageProps {
    id: number;
    url: string;
    alternativeText: string;
}


interface HeroSectionProps {
    data: {
        id: number;
        __component: string;
        heading: string;
        subHeading: string;
        image: ImageProps;
    }
}

export function HeroSection({ data }: HeroSectionProps) {
    const { heading, subHeading, image } = data;
    return (
        <div className="container flex max-w-6xl flex-col items-center md:flex-row">

            <div className="flex max-w-xl flex-col lg:mr-auto">
                <h1 className="font-heading text-5xl font-bold tracking-tight sm:text-6xl">{heading}</h1>
                <h2 className="mt-6 font-heading text-lg text-muted-foreground">{subHeading}</h2>
            </div>
            <div className="hidden w-4/12 lg:block">
                <AspectRatio ratio={9 / 14}>
                    <Image
                        src={image?.url}
                        alt={image?.alternativeText || `${defaultUser?.name} logo.`}
                        width={400}
                        height={580}
                        className="rounded-lg bg-black object-cover shadow-lg"
                    />
                </AspectRatio>
            </div>
        </div>
    );
}
