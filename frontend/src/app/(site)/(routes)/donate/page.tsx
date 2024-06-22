import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { getProductWithPriceData } from "@/data/loaders";
import Donation from "./_components/donation";

export const metadata: Metadata = {
    title: "Donate with hosted Checkout | Next.js + TypeScript Example",
};

export default async function DonatePage() {
    const data = await getProductWithPriceData()

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
                {/* <div className="mt-12 space-y-0 sm:mt-16 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
                    {products.map((product) => {
                        const price = product?.prices?.find(
                            (price) => price.interval === billingInterval
                        );
                        if (!price) return null;
                        const priceString = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: price.currency!,
                            minimumFractionDigits: 0
                        }).format((price?.unit_amount || 0) / 100);
                        return (
                            <div
                                key={product.id}
                                className={cn(
                                    'flex flex-col rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900',
                                    {
                                        'border border-pink-500': subscription
                                            ? product.name === subscription?.prices?.products?.name
                                            : product.name === 'Freelancer'
                                    },
                                    'flex-1', // This makes the flex item grow to fill the space
                                    'basis-1/3', // Assuming you want each card to take up roughly a third of the container's width
                                    'max-w-xs' // Sets a maximum width to the cards to prevent them from getting too large
                                )}
                            >
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold leading-6 text-white">
                                        {product.name}
                                    </h2>
                                    <p className="mt-4 text-zinc-300">{product.description}</p>
                                    <p className="mt-8">
                                        <span className="text-5xl font-extrabold white">
                                            {priceString}
                                        </span>
                                        <span className="text-base font-medium text-zinc-100">
                                            /{billingInterval}
                                        </span>
                                    </p>
                                    <Button
                                        variant="slim"
                                        type="button"
                                        loading={priceIdLoading === price.id}
                                        onClick={() => handleStripeCheckout(price)}
                                        className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                                    >
                                        {subscription ? 'Manage' : 'Subscribe'}
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div> */}
                {/* <LogoCloud /> */}
            </div>
        </div>
    );
}
