import { LinkProps } from "next/link";

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
    content: {
        type: string;
        children: {
            text: string;
            type: string;
        }[];
    }[];
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
