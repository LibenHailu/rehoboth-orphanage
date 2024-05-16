import { Metadata } from "next";
import PostPreview from "../../blogs/_components/post-preview";
import { getBlogsDataByTag } from "@/data/loaders";
import { notFound } from "next/navigation";
import { BlogsApiResponse } from "@/types";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    return {
        title: `All posts in ${params.slug}`,
        description: `All posts in ${params.slug}`,
    };
}

export default async function TagPage({ params }: { params: { slug: string } }) {
    const tag = params.slug;

    const res: BlogsApiResponse = await getBlogsDataByTag(tag)
    const posts = res?.data

    if (!posts) {
        notFound();
    }

    return (
        <div className="container mb-4">
            <div className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
                <h1 className="mt-0">All posts in {tag}</h1>
                <hr className="my-4" />
                <div className="grid grid-flow-row gap-2">
                    {posts.map((post) => (
                        <PostPreview post={post} key={post.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}