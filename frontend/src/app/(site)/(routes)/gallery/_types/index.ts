// export type Image = {
//     id: number;
//     url: string;
//     alternativeText: string | null;
// }

// export type Gallery = {
//     id: number;
//     caption: string;
//     title: string | null;
//     image: Image;
// }
export type ImageType = {
    id: number;
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
};

export type GalleryItemType = {
    id: number;
    caption: string;
    title: string | null;
    image: ImageType;
};

export type GalleryType = {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    gallaryItem: GalleryItemType[];
    meta: object;
};
