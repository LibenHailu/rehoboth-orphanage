import { getBlogsPageData, getGallaryPageData } from "@/data/loaders"
import { BlogsApiResponse } from "@/types"
import PostPreview from "./_components/post-preview"

export default async function GallaryPage() {
    const data = await getGallaryPageData()
    return <div className="container mb-4">
        {JSON.stringify(data)}
        {/* <div className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
            <h1 className="mt-0">Latest Posts</h1>
            <hr className="my-4" />
            <div className="grid grid-flow-row gap-2">
                {data?.data && data?.data.map((post) => (
                    <PostPreview post={post} key={post.id} />
                ))}
            </div>
        </div> */}
    </div>
}