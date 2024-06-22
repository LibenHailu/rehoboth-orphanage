import Stripe from 'stripe';

export const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? '',
    {
        // @ts-ignore
        apiVersion: null,
        appInfo: {
            name: 'Rehoboth Donation',
            version: '0.0.0',
        }
    }
);
