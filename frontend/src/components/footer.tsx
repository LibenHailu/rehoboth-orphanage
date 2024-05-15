import React from "react";
import { Mail } from "lucide-react";

import siteMetadata, { defaultUser } from "@/lib/metadata";
import { SocialButton } from "@/components/social-button";

const Footer = () => {
    return (
        <footer className="mx-auto flex max-w-6xl flex-col items-center gap-6 border-t py-6 pb-28 sm:pb-6">
            <div className="container flex flex-col items-center justify-between space-y-5 text-center lg:flex-row lg:space-y-0 lg:text-left">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0 lg:order-2">
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
                <div className="flex flex-col gap-4 px-8 md:gap-2 md:px-0 lg:order-1">
                    <p className="text-sm text-muted-foreground md:text-left">
                        &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
