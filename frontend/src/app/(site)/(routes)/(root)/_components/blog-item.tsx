"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BlogItemProps extends React.ComponentProps<"div"> {
    imgPath?: string;
    alt?: string;
    imgRight?: boolean;
    className?: string;
    // width?: number;
    title: string;
    description: string;
    slug: string;
}

const BlogItem: React.FC<BlogItemProps> = ({
    imgPath,
    imgRight = true,
    alt,
    title,
    description,
    slug,
    className,
}) => {
    return (
        <article className={cn(
            "w-full select-rounded-md block",
            "rounded-md leading-none no-underline",
            "outline-none transition-colors hover:bg-foreground/10",
            "hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            "flex flex-col gap-4",
            imgRight ? "md:flex-row-reverse" : "md:flex-row",
            "w-full justify-around items-center",
        )}>
            <Image
                quality={90}
                src={imgPath || ""}
                height={800}
                width={400}
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={alt || `${title} blog cover image`}
                object-fit="cover"
                className="rounded-md shrink-0"
            />
            <div className="p-4">
                <h3 className="my-2 text-2xl font-bold text-foreground">{title}</h3>

                {description && (
                    <p className="line-clamp-6 text-sm leading-snug text-muted-foreground">{description}</p>
                )}
                <div className="flex justify-end">

                    <Button
                        variant="link"
                    >
                        <Link
                            href={`/blogs/${slug}`}
                        >
                            Read More
                        </Link>
                    </Button>
                </div>
            </div>
        </article>

    );
};

export default BlogItem;
