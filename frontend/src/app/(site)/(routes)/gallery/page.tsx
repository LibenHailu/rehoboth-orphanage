import { getGallaryPageData } from "@/data/loaders";
import { GalleryItem } from "./_components/gallery-item";
import { Gallery } from "./_types";
export default async function GalleryPage() {
    const data = await getGallaryPageData()
    return (
        <div className="container max-w-5xl mx-auto mb-4">
            <h1 className="mb-2 text-4xl font-bold">{data?.title}</h1>
            <div className="mb-4 mt-1 text-sm leading-snug text-muted-foreground">
                {data?.description}
            </div>
            <hr className="my-4 border-muted-foreground/20" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                {data.gallaryItem?.map((gallery: Gallery) => {
                    return <div key={gallery?.id} className="group relative overflow-hidden rounded-lg">
                        <GalleryItem  {...gallery} />
                    </div>

                })}
            </div>
        </div>
    )
}