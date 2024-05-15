import { StrapiImage } from "./strapi-image";


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

export function HeroSection({ data }: Readonly<HeroSectionProps>) {
    const { heading, subHeading, image } = data;
    return (
        <header className="relative h-[600px] overflow-hidden">
            <StrapiImage
                alt="Background"
                className="absolute inset-0 object-cover w-full h-full"
                height={1080}
                src={image.url}
                width={1920}
            />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-20">
                <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
                    {heading}
                </h1>
                <p className="mt-4 text-lg md:text-xl lg:text-2xl">
                    {subHeading}
                </p>
            </div>
        </header>
    );
}