"use client"
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GalleryItemType, GalleryType } from "../_types";
import { GalleryItem } from "./gallery-item";

type GalleryListProps = {
    data: GalleryType
}
export function GalleryList(x: GalleryListProps) {
    const [data, setData] = useState(x.data)
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const [activeImage, setActiveImage] = useState<GalleryItemType>();

    useEffect(() => {
        if (!activeImage) return;
        dialogRef.current?.showModal();
        document.body.style.overflow = 'hidden';
        dialogRef.current?.addEventListener('close', closeDialog);
        document.body.addEventListener('keydown', handleOnKeyDown);
        return () => {
            dialogRef.current?.removeEventListener('close', closeDialog)
            document.body.removeEventListener('keydown', handleOnKeyDown);
        }
    }, [activeImage]);

    function closeDialog() {
        dialogRef.current?.close();
        setActiveImage(undefined);
        document.body.style.overflow = '';
    }

    function handleOnKeyDown(event: KeyboardEvent) {
        if (!data?.gallaryItem) return;
        const currentIndex = data?.gallaryItem ? data?.gallaryItem.findIndex((gallery) => gallery?.image?.url == activeImage?.image?.url) : -1;
        if (typeof currentIndex === 'undefined') return;

        if (event.code === 'ArrowRight') {
            if (currentIndex + 1 < data?.gallaryItem.length) {
                const nextImage = data?.gallaryItem[currentIndex + 1];
                setActiveImage(nextImage);
            } else {
                const nextImage = data?.gallaryItem[0];
                setActiveImage(nextImage);
            }
        } else if (event.code === 'ArrowLeft') {
            if (currentIndex !== 0) {
                const nextImage = data?.gallaryItem[currentIndex - 1];
                setActiveImage(nextImage);
            } else {
                const nextImage = data?.gallaryItem[data?.gallaryItem.length - 1];
                setActiveImage(nextImage);
            }
        }
    }
    return <>
        <h1 className="mb-2 text-4xl font-bold">{data?.title}</h1>
        <div className="mb-4 mt-1 text-sm leading-snug text-muted-foreground">
            {data?.description}
        </div>
        <hr className="my-4 border-muted-foreground/20" />
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"> */}
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.gallaryItem?.map((gallery: GalleryItemType) => {
                return <li key={gallery?.id} className="group relative overflow-hidden rounded-lg inline">
                    <button onClick={() => setActiveImage(gallery)} className="block">
                        <GalleryItem  {...gallery} />
                    </button>
                </li>

            })}
        </ul>
        {/* </div> */}
        <dialog ref={dialogRef} className="relative max-w-[90vw] flex flex-col items-center overflow-visible backdrop:bg-black/85 bg-transparent">
            <div
                className="max-h-[90vh] max-w-[90vw] rounded-sm overflow-hidden bg-black"
                style={{
                    aspectRatio: activeImage && `${activeImage?.image.width} / ${activeImage?.image.height}`
                }}
            >
                {activeImage && (
                    <Image
                        width={activeImage?.image?.width}
                        height={activeImage?.image?.height}
                        src={activeImage?.image?.url}
                        alt={activeImage?.image?.alternativeText || ""}
                        unoptimized
                    />
                )}
                <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white text-center space-y-2">
                        <h3 className="text-lg font-semibold">{activeImage?.title}</h3>
                        <p className="text-sm">{activeImage?.caption}</p>
                    </div>
                </div>
            </div>
            {activeImage &&
                <button
                    className="absolute -top-2 -right-2 z-1 flex items-center justify-center w-5 h-5 bg-zinc-200 rounded-full shadow"
                    onClick={() => closeDialog()}
                >
                    <X className="w-4 h-4 text-zinc-900" />
                    <span className="sr-only">Close</span>
                </button>
            }
            <div className="absolute w-full bottom-0 bg-gray-900/70 flex items-center justify-center">
                <div className="text-white text-center space-y-2">
                    <h3 className="text-lg font-semibold overflow-clip">{activeImage?.title}</h3>
                    <p className="text-sm overflow-clip">{activeImage?.caption}</p>
                </div>
            </div>
        </dialog>
    </>
}