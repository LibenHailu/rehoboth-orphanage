import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import siteMetadata, { defaultUser } from "@/lib/metadata";
import { SocialButton } from "@/components/social-button";
import { navigationLinks } from "@/lib/navigation-links";
import Link from "next/link";
import Image from "next/image"
import { Button } from "./ui/button";

const Footer = () => {
    // Flatten the array
    const flattenedLinks = navigationLinks.reduce((acc: { title: string, href: string }[], item) => {
        if (item.about) {
            acc.push(...item.about.map(subItem => ({ title: subItem.title || "", href: subItem.href || "" })));
        } else {
            acc.push({ title: item.title || "", href: item.href || "" });
        }
        return acc;
    }, []);

    return (
        <footer className="mx-auto w-full flex items-center gap-6 border-t py-6 pb-28 sm:pb-6 border-foreground/25 bg-background/95 px-3 shadow-md supports-[backdrop-filter]:bg-background/60 shadow-md supports-[backdrop-filter]:bg-background/60 supports-[backdrop-filter]:bg-clip-padding supports-[backdrop-filter]:backdrop-blur sm:justify-between sm:rounded-none sm:px-3">
            {/* <div className="container flex flex-col items-center justify-between space-y-4 text-center lg:flex-row lg:space-y-0 lg:text-left"> */}
            <div className="container grid grid-cols-5 gap-x-6 mx-auto max-w-6xl gap-y-4">
                <div className="space-y-2 hidden lg:block lg:col-span-1">
                    <Image
                        priority={false}
                        className="hidden sm:block"
                        src="/logo/logo.png"
                        alt="Rehoboth orphanage logo"
                        width="150"
                        height="150"
                    />
                </div>
                <div className="space-y-2 col-span-5 sm:col-span-2 lg:col-span-1 text-center sm:text-start">
                    <h5 className="text-xl font-bold">Get Involved</h5>
                    <p className="text-sm">
                        Get involved in transforming the lives of orphans through care and education!
                    </p>
                    <Button
                    >
                        Support Us
                    </Button>
                </div>
                <div className="space-y-2 col-span-5 sm:col-span-1 text-center sm:text-start">
                    <h5 className="text-xl font-bold">Pages</h5>
                    <ul className="space-y-2">
                        {
                            flattenedLinks.map(link => <li key={link.href}><Link href={link.href} className="text-sm">{link.title}</Link></li>)
                        }
                    </ul>
                </div>
                <div className="space-y-2 col-span-5 sm:col-span-2 text-center sm:text-start">
                    <h5 className="text-xl font-bold">Contact Us</h5>
                    <ul className="space-y-2">
                        <li className="flex flex-wrap text-balance items-center text-sm gap-x-2 justify-center sm:justify-start">
                            <MapPin className="w-6 h-6 text-muted-foreground pt-2 " />
                            {defaultUser?.address}
                        </li>
                        <li className="flex flex-wrap text-balance items-center text-sm gap-x-2 justify-center sm:justify-start">
                            <Phone className="w-6 h-6 text-muted-foreground pt-2 " />
                            {defaultUser?.phone}
                        </li>
                        <li className="flex flex-wrap text-balance items-center text-sm gap-x-2 justify-center sm:justify-start">
                            <Mail className="w-6 h-6 text-muted-foreground pt-2 " />
                            {defaultUser?.email}
                        </li>
                    </ul>
                    <div className="flex flex-col items-center space-y-4 px-8 md:flex-row md:gap-2 md:px-0 lg:order-2">
                        <div className="flex flex-row flex-wrap justify-center space-x-2 text-sm text-muted-foreground">
                            {defaultUser.socialProfiles.map((platform) => (
                                <SocialButton
                                    key={platform.name}
                                    variant="ghost"
                                    size="icon"
                                    className="hover:text-foreground"
                                    platform={platform}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
