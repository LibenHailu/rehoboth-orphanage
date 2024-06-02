import qs from "qs";

import { flattenAttributes, getStrapiURL } from "@/lib/utils";
import siteMetadata from "@/lib/metadata";

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


export async function getBlogsPageData(queryString: string, currentPage: number) {
    const url = new URL("/api/blogs", baseUrl);
    url.search = qs.stringify({
        sort: ["createdAt:desc"],
        populate: {
            coverImage: {
                fields: ["url", "alternativeText"],
            },
            tags: {
                fields: ["name"],
            }
        },
        filters: {
            $or: [
                { title: { $containsi: queryString } },
                { description: { $containsi: queryString } },
            ],
        },
        pagination: {
            pageSize: siteMetadata.postsPerPage,
            page: currentPage,
        },
    });

    return await fetchData(url.href);
}

export async function getBlogPageData(slug: string) {
    const url = new URL("/api/blogs", baseUrl);
    const query = qs.stringify({
        populate: {
            coverImage: {
                fields: ["url", "alternativeText"],
            },
            tags: {
                fields: ["name"],
            },
        },
        filters:
            { slug: { $eq: slug } },
    });

    url.search = query;

    return fetchData(url.href);
}

export async function getBlogsDataByTag(tag: string, queryString: string, currentPage: number) {
    const url = new URL("/api/blogs", baseUrl);
    const query = qs.stringify({
        sort: ["createdAt:desc"],
        filters:
        {
            $or: [
                { title: { $containsi: queryString }, tags: { name: { $eq: tag } }, },
                { description: { $containsi: queryString }, tags: { name: { $eq: tag } }, },
            ],
            // tags: { name: { $eq: tag } },
        },
        populate: {
            tags: {
                fields: ["name"],
            },
        },
        pagination: {
            pageSize: siteMetadata.postsPerPage,
            page: currentPage,
        },

    });

    url.search = query;
    return fetchData(url.href);
}

export async function getAboutPageData() {

    const url = new URL("/api/about-page", baseUrl);

    return await fetchData(url.href);
}

export async function getGallaryPageData() {

    const url = new URL("/api/gallary-page", baseUrl);

    url.search = qs.stringify({
        sort: ["createdAt:desc"],
        populate: {
            gallaryItem: {
                populate: {
                    image: {
                        fields: ["url", "alternativeText", "width", "height"],
                    }
                },
            }
        },
    });

    return await fetchData(url.href);
}


export async function getFeaturedBlogData() {

    const url = new URL("/api/blogs", baseUrl);

    const query = qs.stringify({
        populate: {
            coverImage: {
                fields: ["url", "alternativeText"],
            },
            limit: 1,
        },
        filters:
            { isFeatured: { $eq: true } },

    });

    url.search = query;
    return fetchData(url.href);
}

export async function getLatestBlogData() {

    const url = new URL("/api/blogs", baseUrl);

    const query = qs.stringify({
        sort: ['publishedAt:desc'],
        populate: {
            coverImage: {
                fields: ["url", "alternativeText"],
            },
            limit: 1,
        },
        filters:
            { isFeatured: { $eq: false } },

    });

    url.search = query;
    return fetchData(url.href);
}

