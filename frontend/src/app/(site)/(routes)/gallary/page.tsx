import { getGallaryPageData } from "@/data/loaders"

export default async function GallaryPage() {
    const data = await getGallaryPageData()
    return <div className="container mb-4">
        {JSON.stringify(data)}
    </div>
}