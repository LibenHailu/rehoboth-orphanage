import { getGallaryPageData } from "@/data/loaders";
import { GalleryItem } from "./_components/gallery-item";
import { Gallery } from "./_types";
import { GalleryList } from "./_components/gallery-list";
import { PaginationComponent } from "@/components/pagination";

interface SearchParamsProps {
    searchParams?: {
        page?: string;
    };
}


export default async function GalleryPage() {
    // const currentPage = Number(searchParams?.page) || 1;

    // const { data, meta } = await getGallaryPageData(currentPage);
    // const pageCount = meta.pagination.pageCount;
    const data = await getGallaryPageData()

    return (
        <div className="container max-w-5xl mx-auto mb-4">

            <GalleryList data={data} />
            {/* <PaginationComponent pageCount={pageCount} /> */}
        </div>
        // <div className="container max-w-5xl mx-auto mb-4">

        //     {JSON.stringify(data)}
        //     <h1 className="mb-2 text-4xl font-bold">{data?.title}</h1>
        //     <div className="mb-4 mt-1 text-sm leading-snug text-muted-foreground">
        //         {data?.description}
        //     </div>
        //     <hr className="my-4 border-muted-foreground/20" />
        //     <ul>
        //         <li className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        //             {data.gallaryItem?.map((gallery: Gallery) => {
        //                 return <div key={gallery?.id} className="group relative overflow-hidden rounded-lg">
        //                     <GalleryItem  {...gallery} />
        //                 </div>

        //             })}
        //         </li>
        //     </ul>
        // </div>
    )
}