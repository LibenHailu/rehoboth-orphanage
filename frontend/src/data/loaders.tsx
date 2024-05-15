import qs from "qs";

import { flattenAttributes, getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

async function fetchData(url: string) {

    try {
        const response = await fetch(url);
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
                    link: {
                        populate: true,
                    },
                    feature: {
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
    });

    url.search = query;

    return fetchData(url.href);
}
