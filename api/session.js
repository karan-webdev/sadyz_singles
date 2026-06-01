import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK_KEY);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: "Session ID is required" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    return res.status(200).json({
      email: session.customer_details?.email || "",
      status: session.payment_status,
    });
  } catch (error) {
    console.error("Session retrieval error:", error);
    return res.status(500).json({ error: "Failed to retrieve session" });
  }
}
