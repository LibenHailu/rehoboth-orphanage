import { Metadata } from "next";
import PostPreview from "../../blogs/_components/post-preview";
import { getBlogsDataByTag } from "@/data/loaders";
import { notFound } from "next/navigation";
import { BlogsApiResponse } from "@/types";
import { PaginationComponent } from "@/components/pagination";
import { Search } from "../../(root)/_components/search";
import Empty from "@/components/empty";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    return {
        title: `All posts with tag ${params.slug}`,
        description: `All posts with tag ${params.slug}`,
    };
}

interface SearchParamsProps {
    searchParams?: {
        query?: string;
        page?: string;
    };
}
export default async function TagPage({ params, searchParams }: {
    params: {
        slug: string;
    },
    searchParams: {
        query?: string;
        page?: string;
    }
}) {
    const tag = params.slug;


    const query = searchParams?.query ?? "";
    const currentPage = Number(searchParams?.page) || 1;

    const { data, meta }: BlogsApiResponse = await getBlogsDataByTag(tag, query, currentPage)
    const pageCount = meta.pagination.pageCount;

    if (!data) {
        notFound();
    }

    return (
        <div className="container mb-4">
            <div className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
                <h1 className="mb-2 font-heading">All posts with tag {tag}</h1>
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
    );
}