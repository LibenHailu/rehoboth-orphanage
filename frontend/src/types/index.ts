import { LinkProps } from "next/link";
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

export interface MobileLinkProps extends LinkProps {
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    className?: string;
}

export interface NavItem {
    title: string;
    href?: string;
    description?: string;
    about?: AboutNavItem[];
}

export interface AboutNavItem extends NavItem {
    href: string;
}

export type SocialProfile = {
    name: string;
    link: string;
};

export type UserType = {
    name: string;
    socialProfiles: SocialProfile[];
    email?: string;
    phone?: string;
    address?: string;
    location?: {
        city?: string;
    };
};

export type NewsletterProvider = "convertkit" | "substack" | "mailerlite";

export type SiteMetaData = {
    title: {
        template: string;
        default: string;
    };
    description: string;
    newsletterProvider?: NewsletterProvider;
    defaultTheme: "light" | "dark" | "system";
    postsPerPage: number;
};

export type Post = {
    id: number;
    slug: string;
    title: string;
    description: string;
    content: BlocksContent;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    coverImage: {
        id: number;
        url: string;
        alternativeText: string | null;
    };
    tags: {
        data: {
            id: number;
            name: string;
        }[];
    };
};

export type Meta = {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
};

export type BlogsApiResponse = {
    data: Post[];
    meta: Meta;
};

export type BlogApiResponse = {
    data: Post[];
    meta: Meta;
};


export interface Product {
    id: number;
    name: string;
    description: string;
    image: string | null;
    product_id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface Price {
    id: number;
    amount: string;
    currency: string;
    interval: string;
    interval_count: number;
    price_id: string;
    product_id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface ProductWithPrice {
    product: Product;
    price: Price;
}