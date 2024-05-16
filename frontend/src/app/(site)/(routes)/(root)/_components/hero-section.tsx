// import { StrapiImage } from "./strapi-image";


// interface ImageProps {
//     id: number;
//     url: string;
//     alternativeText: string;
// }


// interface HeroSectionProps {
//     data: {
//         id: number;
//         __component: string;
//         heading: string;
//         subHeading: string;
//         image: ImageProps;
//     }
// }

// export function HeroSection({ data }: Readonly<HeroSectionProps>) {
//     const { heading, subHeading, image } = data;
//     return (
//         <header className="relative h-[600px] overflow-hidden">
//             <StrapiImage
//                 alt="Background"
//                 className="absolute inset-0 object-cover w-full h-full"
//                 height={1080}
//                 src={image.url}
//                 width={1920}
//             />
//             <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-20">
//                 <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
//                     {heading}
//                 </h1>
//                 <p className="mt-4 text-lg md:text-xl lg:text-2xl">
//                     {subHeading}
//                 </p>
//             </div>
//         </header>
//     );
// }
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
