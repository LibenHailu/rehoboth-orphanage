import { SocialShare } from '@/components/social-share';
import { getBlogPageData } from '@/data/loaders';
import { getStrapiURL } from '@/lib/utils';
import { BlogApiResponse } from '@/types';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import { format, parseISO } from 'date-fns';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from "next/image"

interface PageProps {
    params: {
        slug: string;
    };
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const post = await getBlogPageData(params.slug)
    if (!post) {
        return {};
    }

    return {
        title: post.title,
        description: post.description,
        keywords: post.tags,
    };
}

// TODO: generate pages statically using generateStaticParams()
export default async function BlogPage({
    params,
}: Readonly<PageProps>) {

    const BASE_URL = getStrapiURL();

    const res: BlogApiResponse = await getBlogPageData(params.slug)
    const post = res?.data[0]

    if (!post) {
        notFound()
    }

    return <div className="container max-w-6xl pb-10">
        <article className="prose max-w-7xl dark:prose-invert hover:prose-a:text-accent-foreground prose-a:prose-headings:mb-3 prose-a:prose-headings:mt-8 prose-a:prose-headings:font-heading prose-a:prose-headings:font-bold prose-a:prose-headings:leading-tight prose-a:prose-headings:no-underline lg:mr-auto">
            <h1 className="mb-2 font-heading">{post.title}</h1>
            <div className="mb-4 mt-1 text-sm leading-snug text-muted-foreground">
                {post.updatedAt && (
                    <time dateTime={post?.updatedAt}> Last updated: {format(parseISO(post?.updatedAt), "LLLL d, yyyy")}</time>
                )}
            </div>
            {post.description && (
                <p className="mb-2 mt-0 text-xl text-muted-foreground">{post.description}</p>
            )}
            <hr className="my-4" />
            <Image src={post.coverImage?.url} alt={post.coverImage?.alternativeText || `${post.title} cover image.`} width="1200" height="800" />
            <BlocksRenderer content={post.content} />
            <hr className="my-4" />
            <div className="flex flex-row items-center justify-between">
                {post.tags?.data && (
                    <ul className="m-0 list-none space-x-2 p-0 text-sm text-muted-foreground">
                        {post.tags.data.map(({ name }) => (
                            <li className="inline-block p-0" key={name}>
                                <Link href={`/tags/${name}`} className="inline-block transition hover:text-muted-foreground/70">
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
                <SocialShare
                    text={`${post.title}`}
                    url={`${BASE_URL}/${post.slug}`}
                />
            </div>
        </article>
    </div>
};