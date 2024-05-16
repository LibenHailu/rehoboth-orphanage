import { getAboutPageData } from "@/data/loaders";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { format, parseISO } from "date-fns";
import { notFound } from "next/navigation";

export default async function AboutPage() {
    const data = await getAboutPageData();

    if (!data) {
        notFound()
    }

    return <div className="container max-w-6xl pb-10">
        <div className="flex flex-col lg:flex-row">
            <article className="prose max-w-7xl dark:prose-invert hover:prose-a:text-accent-foreground prose-a:prose-headings:mb-3 prose-a:prose-headings:mt-8 prose-a:prose-headings:font-heading prose-a:prose-headings:font-bold prose-a:prose-headings:leading-tight prose-a:prose-headings:no-underline lg:mr-auto lg:max-w-2xl">
                <h1 className="mb-2 font-heading">{data.title}</h1>
                <div className="mb-4 mt-1 text-sm leading-snug text-muted-foreground">
                    {data.updatedAt && (
                        <time dateTime={data?.updatedAt}> Last updated: {format(parseISO(data?.updatedAt), "LLLL d, yyyy")}</time>
                    )}
                </div>
                <hr className="my-4" />
                <BlocksRenderer content={data.content} />
            </article>
        </div>
    </div>
}
