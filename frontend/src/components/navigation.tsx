"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { MobileNav } from "@/components/mobile-nav";
import { Navbar } from "@/components/navbar";
import { defaultUser } from "@/lib/metadata";
import { cn, debounce } from "@/lib/utils";
import { Button } from "./ui/button";

const SCROLL_OFFSET = 200;

export function Navigation() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = useCallback(
        () =>
            debounce(() => {
                const currentScrollPos = window.scrollY;

                if ((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }

                setPrevScrollPos(currentScrollPos);
            }, 100),
        [prevScrollPos, setPrevScrollPos, setVisible]
    );

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos, visible, handleScroll]);

    return (
        <>
            <header
                className={cn(
                    "fixed inset-x-0 -bottom-32 z-20 mx-auto mb-4 transition-all duration-1000 animate-out sm:top-0 sm:h-16 sm:px-0 sm:transition-none",
                    visible && "top-0 animate-in",
                )}
            >
                <div className="flex items-center gap-2 border-b border-foreground/25 bg-background/95 px-3 py-2 shadow-md supports-[backdrop-filter]:bg-background/60 supports-[backdrop-filter]:bg-clip-padding supports-[backdrop-filter]:backdrop-blur sm:justify-between sm:rounded-none sm:px-3">
                    <div className="container mx-auto flex max-w-6xl">
                        <div className="flex items-center justify-start">
                            <div className="group aspect-square h-auto w-10 overflow-hidden rounded-full">
                                <Link href="/" aria-label="Go to Home">
                                    <Image
                                        width={40}
                                        height={40}
                                        src="/logo/logo.png"
                                        alt={defaultUser.name}
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="order-3 sm:order-2 sm:ml-auto">
                            <nav className="ml-auto hidden space-x-6 text-sm font-medium sm:block sm:w-full">
                                <Navbar />
                            </nav>
                            <nav className="sm:hidden">
                                <MobileNav />
                            </nav>
                        </div>
                        <div className="order-2 flex w-full items-center gap-2 sm:ml-10 sm:order-3 sm:w-fit">
                            <Button>Donate</Button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
