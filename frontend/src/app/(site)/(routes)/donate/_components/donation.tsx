"use client"

import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { getStripe } from "@/lib/stripe/client";
import { checkoutWithStripe } from "@/lib/stripe/server";
import { cn } from "@/lib/utils";
import { Price, ProductWithPrice } from "@/types";
import { getErrorRedirect } from "@/utils/helpers";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Donation({ data }: { data: ProductWithPrice[] }) {
    const intervals = Array.from(
        new Set(
            data?.flatMap((product) =>
                product?.price?.interval)
        )
    );

    const router = useRouter();
    const [billingInterval, setBillingInterval] =
        useState('month');
    const [priceIdLoading, setPriceIdLoading] = useState<string>();
    const currentPath = usePathname();

    const products = data?.filter(product =>
        product?.price.interval === billingInterval
    )

    const handleStripeCheckout = async (price: Price) => {

        if (price.price_id) {
            setPriceIdLoading(price.price_id);
        }


        const { errorRedirect, sessionId } = await checkoutWithStripe(
            { ...price, id: price.price_id },
            currentPath
        );

        if (errorRedirect) {
            setPriceIdLoading(undefined);
            return router.push(errorRedirect);
        }

        if (!sessionId) {
            setPriceIdLoading(undefined);
            return router.push(
                getErrorRedirect(
                    currentPath,
                    'An unknown error occurred.',
                    'Please try again later or contact a system administrator.'
                )
            );
        }

        const stripe = await getStripe();
        stripe?.redirectToCheckout({ sessionId });

        setPriceIdLoading(undefined);
    };
    //  <Button onClick={() => handleStripeCheckout({ active: true, currency: "usd", type: "one_time", unit_amount: 10000 })}>Pay 100 USD</Button>
    return <>
        <div className="mt-6 sm:mt-8">
            <Tabs defaultValue="month">
                <TabsList className="grid w-full grid-cols-2">
                    {intervals.includes('month') && (<TabsTrigger value="month"
                        onClick={() => setBillingInterval('month')}
                    >Monthly</TabsTrigger>)}


                    {intervals.includes('year') && (<TabsTrigger
                        onClick={() => setBillingInterval('year')}
                        value="year"
                    >Annually</TabsTrigger>)}

                    {/* <TabsTrigger
                        value="one"
                    >One Time</TabsTrigger> */}
                </TabsList>
            </Tabs>

        </div>
        <div className="mt-12 space-y-0 sm:mt-16 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
            {products.map((product) => {
                const priceString = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: product.price.currency!,
                    minimumFractionDigits: 0
                }).format(Number(product.price?.amount) || 0 / 100);
                return (
                    <div
                        key={product.product.id}
                        className={cn(
                            'flex flex-col rounded-lg shadow-sm divide-y border',
                            'flex-1', // This makes the flex item grow to fill the space
                            'basis-1/3', // Assuming you want each card to take up roughly a third of the container's width
                            'max-w-xs' // Sets a maximum width to the cards to prevent them from getting too large
                        )}
                    >
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold leading-6">
                                {product.product.name}
                            </h2>
                            <p className="mt-4">{product.product.description}</p>
                            <p className="mt-8">
                                <span className="text-5xl font-extrabold white">
                                    {priceString}
                                </span>
                                <span className="text-base font-medium">
                                    /{billingInterval}
                                </span>
                            </p>
                            <Button
                                type="button"
                                disabled={priceIdLoading === product.price.price_id}
                                onClick={() => handleStripeCheckout(product.price)}
                                className="block w-full py-2 mt-8 text-sm font-semibold text-center rounded-md"
                            >
                                Subscribe
                                {priceIdLoading === product.price.price_id && (
                                    <span>
                                        ...
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>

    </>

}