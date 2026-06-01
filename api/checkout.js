import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK_KEY);

// Get the app URL from environment or use default for local development
const getAppUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return process.env.APP_URL || "http://localhost:5173";
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { productId } = req.body;

    const products = {
      season: {
        stripeProductId: process.env.VITE_SEASON_PRODUCT_ID,
        name: "Season Pass",
        amount: 15000,
      },
      weekly: {
        stripeProductId: process.env.VITE_MULTI_PRODUCT_ID,
        name: "Weekly Pass",
        amount: 1250,
      },
    };

    const product = products[productId];

    if (!product || !product.stripeProductId) {
      return res.status(400).json({ error: "Invalid product" });
    }

    const appUrl = getAppUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "aud",
            product: product.stripeProductId,
            unit_amount: product.amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/`,
      metadata: {
        product: product.name,
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
}