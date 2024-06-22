'use server';

import Stripe from 'stripe';
import { stripe } from './config';
import {
    getURL,
    getErrorRedirect,
} from '@/utils/helpers';

type CheckoutResponse = {
    errorRedirect?: string;
    sessionId?: string;
};

export async function checkoutWithStripe(
    price,
    redirectPath = '/'
): Promise<CheckoutResponse> {
    try {

        // Retrieve or create the customer in Stripe
        // let customer: string;
        // try {
        //   customer = await createOrRetrieveCustomer({
        //     uuid: user?.id || '',
        //     email: user?.email || ''
        //   });
        // } catch (err) {
        //   console.error(err);
        //   throw new Error('Unable to access customer record.');
        // }

        const line_items = price.id ? [
            {
                price: price.id,
                quantity: 1
            }
        ] : [
            {
                quantity: 1,
                price_data: {
                    currency: price.currency,
                    product_data: {
                        name: "Custom amount donation",
                    },
                    unit_amount: price.unit_amount
                },
            },
        ]
        let params: Stripe.Checkout.SessionCreateParams = {
            allow_promotion_codes: true,
            billing_address_collection: 'required',
            // customer,
            // customer_update: {
            //   address: 'auto'
            // },
            line_items,
            cancel_url: getURL(),
            success_url: getURL(redirectPath)
        };

        if (price.type === 'recurring') {
            params = {
                ...params,
                mode: 'subscription',
            };
        } else if (price.type === 'one_time') {
            params = {
                ...params,
                mode: 'payment',
                submit_type: "donate",

            };
        }

        // Create a checkout session in Stripe
        let session;
        try {
            session = await stripe.checkout.sessions.create(params);
        } catch (err) {
            console.error(err);
            throw new Error('Unable to create checkout session.');
        }

        // Instead of returning a Response, just return the data or error.
        if (session) {
            return { sessionId: session.id };
        } else {
            throw new Error('Unable to create checkout session.');
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                errorRedirect: getErrorRedirect(
                    redirectPath,
                    error.message,
                    'Please try again later or contact a system administrator.'
                )
            };
        } else {
            return {
                errorRedirect: getErrorRedirect(
                    redirectPath,
                    'An unknown error occurred.',
                    'Please try again later or contact a system administrator.'
                )
            };
        }
    }
}
