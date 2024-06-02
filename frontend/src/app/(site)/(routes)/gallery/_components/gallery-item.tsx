
import { GalleryItemType } from "../_types"

import Image from "next/image"


export const GalleryItem: React.FC<GalleryItemType> = (galleryItem) => {
    return <>
        <Image
            alt={galleryItem?.image?.alternativeText || ""}
            className="w-full object-cover transition-all duration-300 group-hover:scale-105 aspect-square"
            height="500"
            src={galleryItem?.image?.url}
            // style={{
            //     aspectRatio: "500/500",
            //     objectFit: "cover",
            // }}
            width="500"
        />
        <div className="w-fit absolute inset-0 bg-gray-900/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white text-center space-y-2">
                <h3 className="text-lg font-semibold">{galleryItem?.title}</h3>
                <p className="text-sm">{galleryItem?.caption}</p>
            </div>
        </div>
    </>;
}
