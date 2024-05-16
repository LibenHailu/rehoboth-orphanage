import { AboutNavItem, NavItem } from "@/types";

const about: AboutNavItem[] = [
    {
        title: "About",
        href: "/about",
        description: "Learn about our mission, values, and the impact we’re making in the lives of orphaned children.",
    },
    {
        title: "Gallery",
        href: "/gallary",
        description: "Explore photos of our activities, events, and the happy faces of the children we support.",
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
