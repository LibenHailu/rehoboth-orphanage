export type Image = {
    id: number;
    url: string;
    alternativeText: string | null;
}

export type Gallery = {
    id: number;
    caption: string;
    title: string | null;
    image: Image;
}