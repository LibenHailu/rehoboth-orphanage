import { AboutNavItem, NavItem } from "@/types";

const about: AboutNavItem[] = [
    {
        title: "About",
        href: "/about-us",
        description: "Description about the page.",
    },
    {
        title: "Gallery",
        href: "/gallary",
        description: "Description about the page.",
    },
];

export const navigationLinks: NavItem[] = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "Blogs",
        href: "/blogs",
    },
    {
        title: "Events",
        href: "/events",
    },
    {
        title: "About Us",
        about,
    },
];
