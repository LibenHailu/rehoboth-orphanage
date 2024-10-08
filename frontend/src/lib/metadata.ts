import { UserType, SiteMetaData } from "@/types";

import { socialProfiles } from "./social-data";


export const defaultUser: UserType = {
    name: "Rehoboth Orphange",
    socialProfiles,
    address: "Bole Sub-City, Addis Ababa, Ethiopia",
    phone: "+2519090909",
    email: "contact@rehobothorphanage.com",

};

const defaultTitle = `${defaultUser.name}`;
const defaultDescription = `${defaultUser.name} description.`;

const siteMetadata: SiteMetaData = {
    title: {
        template: `%s | ${defaultTitle}`,
        default: defaultTitle,
    },
    description: defaultDescription,
    newsletterProvider: "mailerlite",
    defaultTheme: "system",
    postsPerPage: 10,
};

export default siteMetadata;
