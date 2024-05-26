import { getBlogsPageData } from "@/data/loaders"
import { BlogsApiResponse } from "@/types"
import PostPreview from "./_components/post-preview"
import { PaginationComponent } from "@/components/pagination";
import { Search } from "../(root)/_components/search";
import Empty from "@/components/empty";

interface SearchParamsProps {
    searchParams?: {
        query?: string;
        page?: string;
    };
}

export default async function BlogsPage({
    searchParams
}: SearchParamsProps) {

    const query = searchParams?.query ?? "";
    const currentPage = Number(searchParams?.page) || 1;

    const { data, meta }: BlogsApiResponse = await getBlogsPageData(query, currentPage);
    const pageCount = meta.pagination.pageCount;

    return <div className="container mb-4">
        <div className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
            <h1 className="mb-2 font-heading">Latest Posts</h1>
            <hr className="my-4" />
            <Search />
            <div className="grid grid-flow-row gap-2">
                {data.length ? data.map((post) => (
                    <PostPreview post={post} key={post.id} />
                )) : <Empty />}
            </div>
            <PaginationComponent pageCount={pageCount} />
        </div>
    </div>
}