import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SK_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);
const resendFromEmail = "Sadzys Singles <onboarding@resend.dev>";
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to read raw body from request
async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      resolve(data);
    });
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const signature = req.headers["stripe-signature"];

  if (!stripeWebhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return res
      .status(500)
      .json({ error: "Webhook secret is not configured." });
  }

  if (!signature) {
    return res
      .status(400)
      .json({ error: "Missing Stripe signature header." });
  }

  try {
    // Get raw body for signature verification
    const rawBody = await getRawBody(req);

    // Verify the signature and construct the event
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        stripeWebhookSecret
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res
        .status(400)
        .json({ error: "Webhook signature verification failed." });
    }

    // Handle checkout.session.completed event
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
          console.log(`Email sent to ${customerEmail}`);
        } catch (emailError) {
          console.error("Error sending email:", emailError);
          // Don't fail the webhook if email fails - just log it
        }
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({ error: "Webhook processing failed" });
  }
}
