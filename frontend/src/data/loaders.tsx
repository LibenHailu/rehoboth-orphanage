import qs from "qs";

import { flattenAttributes, getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

async function fetchData(url: string) {

    try {
        // TODO: remove no-store cache for better performance
        const response = await fetch(url, { cache: "no-store" });
        const data = await response.json();
        return flattenAttributes(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // or return null;
    }
}

export async function getHomePageData() {

    const url = new URL("/api/home-page", baseUrl);

    url.search = qs.stringify({
        populate: {
            blocks: {
                populate: {
                    image: {
                        fields: ["url", "alternativeText"],
                    },
                    benefit: {
                        populate: true,
                    },
                },
            },
        },
    });

    return await fetchData(url.href);
}


export async function getBlogsPageData() {

    const url = new URL("/api/blogs", baseUrl);

    url.search = qs.stringify({
        populate: {
            coverImage: {
                fields: ["url", "alternativeText"],
            },
            tags: {
                fields: ["name"],
            }
        },
    });

    return await fetchData(url.href);
}

export async function getBlogPageData(slug: string) {
    const url = new URL("/api/blogs", baseUrl);
    const query = qs.stringify({
        filters:
            { slug: { $eq: slug } },
        populate: {
            tags: {
                fields: ["name"],
            },
        },
    });

    url.search = query;

    return fetchData(url.href);
}

export async function getBlogsDataByTag(tag: string) {
    const url = new URL("/api/blogs", baseUrl);
    const query = qs.stringify({
        filters:
            { tags: { name: { $eq: tag } } },

    });

    url.search = query;
    return fetchData(url.href);
}

export async function getAboutPageData() {

    const url = new URL("/api/about-page", baseUrl);

    return await fetchData(url.href);
}