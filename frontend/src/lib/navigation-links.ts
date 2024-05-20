import { AboutNavItem, NavItem } from "@/types";

const about: AboutNavItem[] = [
    {
        title: "About",
        href: "/about",
        description: "Explore our mission, values, and impact on orphaned children's lives.",
    },
    {
        title: "Gallery",
        href: "/gallary",
        description: "See photos of our activities, events, and joyful supported children.",
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
        title: "Adopt Child",
        href: "/adopt",
    },
    {
        title: "About Us",
        about,
    },
];
