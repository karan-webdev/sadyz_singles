import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import { Resend } from "resend";

dotenv.config({ path: ".env.local" });

const app = express();
const PORT = process.env.PORT || 5000;

const stripe = new Stripe(process.env.STRIPE_SK_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);
const resendFromEmail = "Sadzys Singles <onboarding@resend.dev>";
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// IMPORTANT: CORS for React
app.use(cors({ origin: "http://localhost:5173" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const signature = req.headers["stripe-signature"];

    if (!stripeWebhookSecret) {
      console.error("Missing STRIPE_WEBHOOK_SECRET");
      return res.status(500).json({ error: "Webhook secret is not configured." });
    }

    if (!signature) {
      return res.status(400).json({ error: "Missing Stripe signature header." });
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, signature, stripeWebhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).json({ error: "Webhook signature verification failed." });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const customerEmail = session.customer_details?.email;
      const productName = session.metadata?.product || "your purchase";

      if (customerEmail) {
        try {
          await resend.emails.send({
            from: resendFromEmail,
            to: customerEmail,
            subject: "Your Telegram invite link is ready",
           html: `
<div style="
  background:#0a0a0a;
  padding:40px 16px;
  font-family:Arial, Helvetica, sans-serif;
  color:#ffffff;
">

  <div style="
    max-width:600px;
    margin:0 auto;
    background:#1a1a1a;
    border:1px solid rgba(255,255,255,0.08);
    border-radius:14px;
    padding:28px;
  ">

    <!-- Title -->
    <h2 style="
      margin:0 0 18px;
      font-size:22px;
      font-weight:700;
      color:#ffffff;
    ">
      Your access is ready!
    </h2>

    <!-- Body 1 -->
    <p style="
      margin:0 0 14px;
      font-size:14px;
      line-height:1.5;
      color:rgba(255,255,255,0.7);
    ">
      Thanks for purchasing <strong style="color:#ffffff;">${productName}</strong>.
    </p>

    <!-- Body 2 -->
    <p style="
      margin:0 0 22px;
      font-size:14px;
      line-height:1.5;
      color:rgba(255,255,255,0.7);
    ">
      Join AFL MULTIS 2026 using the button below.
    </p>

    <!-- CTA Button -->
    <a href="https://t.me/+YJZ2ta47kkwxMmY1"
      style="
        display:inline-block;
        background:#3b82f6;
        color:#0a0a0a;
        padding:12px 18px;
        border-radius:10px;
        font-weight:600;
        text-decoration:none;
      ">
      Join Telegram
    </a>

    <!-- Fallback -->
    <p style="
      margin:16px 0 0;
      font-size:12px;
      line-height:1.5;
      color:rgba(255,255,255,0.5);
    ">
      If the button doesn’t work, copy and paste this link into your browser:<br />
      <span style="color:#3b82f6;">
        https://t.me/+YJZ2ta47kkwxMmY1
      </span>
    </p>

    <!-- Footer -->
    <div style="
      margin-top:26px;
      padding-top:16px;
      border-top:1px solid rgba(255,255,255,0.08);
    ">
      <p style="
        margin:0;
        font-size:12px;
        color:rgba(255,255,255,0.4);
      ">
        If you didn’t expect this email, you can safely ignore it.
      </p>
    </div>

  </div>
</div>
`,
          });
          console.log(`Sent Telegram invite email to ${customerEmail}`);
        } catch (emailError) {
          console.error("Failed to send Resend email:", emailError);
          return res.status(500).json({ error: "Failed to send confirmation email." });
        }
      } else {
        console.warn("checkout.session.completed received without customer email.");
      }
    }

    return res.json({ received: true });
  }
);

app.use(express.json());

// Checkout
app.post("/api/checkout", async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "Missing productId" });
    }

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

    const origin = req.headers.origin || "http://localhost:5173";
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
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}`,
      metadata: {
        product: product.name,
      },
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return res.status(500).json({ error: err.message });
  }
});

app.get("/api/session", async (req, res) => {
  try {
    const sessionId = req.query.session_id;

    if (!sessionId) {
      return res.status(400).json({ error: "Missing session_id" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return res.json({
      email: session.customer_details?.email || "",
      product: session.metadata?.product || "",
    });
  } catch (err) {
    console.error("Session lookup error:", err);
    return res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});