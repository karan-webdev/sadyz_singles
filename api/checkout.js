const stripe = require("stripe")(process.env.STRIPE_SK_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405 };
  }

  const { productId } = JSON.parse(event.body);

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
    return { statusCode: 400, body: "Invalid product" };
  }

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
    success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:5173/",
    metadata: {
      product: product.name,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ url: session.url }),
  };
};