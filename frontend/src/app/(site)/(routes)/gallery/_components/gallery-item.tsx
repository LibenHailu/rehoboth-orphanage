
import { Gallery } from "../_types"

import Image from "next/image"


export const GalleryItem: React.FC<Gallery> = (galleryItem) => {
    return <>
        <Image
            alt={galleryItem?.image?.alternativeText || ""}
            className="w-full h-60 object-cover transition-all duration-300 group-hover:scale-105"
            height="400"
            src={galleryItem?.image?.url}

            style={{
                aspectRatio: "400/400",
                objectFit: "cover",
            }}
            width="400"
        />
        <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white text-center space-y-2">
                <h3 className="text-lg font-semibold">{galleryItem?.title}</h3>
                <p className="text-sm">{galleryItem?.caption}</p>
            </div>
        </div>
    </>;
}
