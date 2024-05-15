import { getBlogPageData } from '@/data/loaders';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

interface ParamsProps {
    params: {
        slug: string;
    };
}

export default async function BlogPage({
    params,
}: Readonly<ParamsProps>) {

    const blogData = await getBlogPageData(params.slug)
    return <>{JSON.stringify(blogData)}</>
    // return <BlocksRenderer content={blogData} />;
};