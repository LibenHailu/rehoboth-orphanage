import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { getProductWithPriceData } from "@/data/loaders";
import Donation from "./_components/donation";
import { ProductWithPrice } from "@/types";

export const metadata: Metadata = {
    title: "Donate with hosted Checkout | Next.js + TypeScript Example",
};

export default async function DonatePage() {
    const data: ProductWithPrice[] = await getProductWithPriceData()

    return (
        <div className="container max-w-5xl mx-auto mb-4">
            <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
                <div className="sm:flex sm:flex-col sm:align-center">
                    <h1 className="text-4xl font-extrabold sm:text-center sm:text-6xl">
                        Donation Plans
                    </h1>
                    <p className="max-w-2xl m-auto mt-5 text-lg text-muted-foreground sm:text-center sm:text-2xl">
                        Contribute to the fundamental needs of our orphans. Your donation provides essential items such as nutritious meals, clothing, and basic healthcare.
                    </p>

                </div>
                <Donation data={data} />
            </div>
        </div>
    );
}
