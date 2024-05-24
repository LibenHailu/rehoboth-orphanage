"use client";
import { FC } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";

interface PaginationProps {
    pageCount: number;
}

interface PaginationArrowProps {
    direction: "left" | "right";
    href: string;
    isDisabled: boolean;
}

const PaginationArrow: FC<PaginationArrowProps> = ({
    direction,
    href,
    isDisabled,
}) => {
    const router = useRouter();
    const isLeft = direction === "left";

    return (
        <Button
            onClick={() => router.push(href)}
            aria-disabled={isDisabled}
            disabled={isDisabled}
            // size=""
            variant="ghost"
        >
            {isLeft ? "« Prev" : "Next »"}
        </Button>
    );
};

export function PaginationComponent({ pageCount }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationArrow
                        direction="left"
                        href={createPageURL(currentPage - 1)}
                        isDisabled={currentPage <= 1}
                    />
                </PaginationItem>
                <PaginationItem>
                    <span className="p-2 font-semibold text-sm">
                        Page {currentPage}/{pageCount}
                    </span>
                </PaginationItem>
                <PaginationItem>
                    <PaginationArrow
                        direction="right"
                        href={createPageURL(currentPage + 1)}
                        isDisabled={currentPage >= pageCount}
                />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}