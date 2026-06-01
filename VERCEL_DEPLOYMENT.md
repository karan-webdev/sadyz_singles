# Vercel Deployment Guide

## Environment Variables

The following environment variables must be configured in Vercel Dashboard:

### Required Variables

**STRIPE_SK_KEY**
- Stripe Secret Key for payment processing
- Get from: Stripe Dashboard → API keys → Secret key
- Format: `sk_live_...` (production) or `sk_test_...` (testing)

**STRIPE_WEBHOOK_SECRET**
- Webhook signing secret for authenticating Stripe events
- Get from: Stripe Dashboard → Webhooks → Signing secret
- Format: `whsec_...`
- Used by: `/api/webhook.js` for signature verification

**RESEND_API_KEY**
- API key for sending transactional emails
- Get from: Resend Dashboard → API keys
- Format: `re_...`
- Used by: `/api/webhook.js` for sending confirmation emails

**VITE_SEASON_PRODUCT_ID**
- Stripe Product ID for Season Pass
- Current value: `prod_Ub9fS7NN7Z2Bs4`
- Get from: Stripe Dashboard → Products → Season Pass

**VITE_MULTI_PRODUCT_ID**
- Stripe Product ID for Weekly Pass
- Current value: `prod_Ub9euVvknchab3`
- Get from: Stripe Dashboard → Products → Weekly Pass

### Optional Variables

**APP_URL**
- Base URL for the application
- Default: Auto-detected from `VERCEL_URL` environment variable
- Only set if you need custom redirect URLs (e.g., for a custom domain)
- Format: `https://yourdomain.com`

## Deployment Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Link Project (First Time)
```bash
cd c:\Users\karan\Downloads\sadys\react
vercel link
```

### 4. Set Environment Variables
```bash
# Set all required environment variables
vercel env add STRIPE_SK_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add RESEND_API_KEY
vercel env add VITE_SEASON_PRODUCT_ID
vercel env add VITE_MULTI_PRODUCT_ID
```

Alternatively, set them in Vercel Dashboard:
1. Go to project settings
2. Navigate to "Environment Variables"
3. Add each variable with appropriate values

### 5. Configure Stripe Webhook

In Stripe Dashboard:
1. Go to Developers → Webhooks
2. Click "Add Endpoint"
3. Endpoint URL: `https://your-vercel-deployment.vercel.app/api/webhook`
4. Events to listen for:
   - `checkout.session.completed`
5. Copy the Signing Secret and set as `STRIPE_WEBHOOK_SECRET` in Vercel

### 6. Deploy
```bash
vercel deploy --prod
```

## Project Structure for Vercel

```
.
├── api/                    # Serverless Functions
│   ├── checkout.js        # Create Stripe checkout session
│   ├── health.js          # Health check endpoint
│   └── webhook.js         # Handle Stripe webhooks
├── src/                   # React frontend (Vite)
│   ├── components/
│   ├── utils/
│   └── main.jsx
├── public/                # Static assets
├── dist/                  # Build output (generated)
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── vercel.json            # Vercel configuration
└── index.html             # Entry point
```

## API Endpoints

All endpoints are relative routes and accessible at `/api/*`:

### POST /api/checkout
Create a Stripe checkout session
- **Request body:**
  ```json
  {
    "productId": "season" | "weekly"
  }
  ```
- **Response:**
  ```json
  {
    "url": "https://checkout.stripe.com/..."
  }
  ```

### POST /api/webhook
Stripe webhook receiver (called automatically by Stripe)
- Verifies Stripe signature
- Processes `checkout.session.completed` events
- Sends confirmation emails via Resend

### GET /api/health
Health check endpoint
- **Response:**
  ```json
  {
    "status": "ok"
  }
  ```

## Local Development

### Option 1: Using Vercel CLI (Recommended)
```bash
# Install dependencies
npm install

# Run local development server with API functions
vercel dev
```
This starts both the Vite frontend and simulates Vercel Functions locally.

### Option 2: Frontend Only
```bash
# Install dependencies
npm install

# Run Vite dev server (frontend only)
npm run dev
```
API calls will fail locally without `/api` endpoint. Use Vercel CLI for full local testing.

## Building for Production

```bash
# Build the Vite frontend
npm run build
```

This generates optimized production build in `dist/` directory, which Vercel automatically deploys.

## Troubleshooting

### Environment Variables Not Working
1. Verify all variables are set in Vercel Dashboard
2. Redeploy after adding/changing variables: `vercel deploy --prod`
3. Check logs: `vercel logs` or Vercel Dashboard → Deployments → Logs

### Stripe Webhook Failing
1. Verify `STRIPE_WEBHOOK_SECRET` matches webhook signing secret in Stripe Dashboard
2. Confirm webhook endpoint URL is correct: `https://your-vercel-deployment.vercel.app/api/webhook`
3. Check webhook logs in Stripe Dashboard → Developers → Webhooks
4. Verify `STRIPE_SK_KEY` is correct (test or live)

### Emails Not Sending
1. Verify `RESEND_API_KEY` is valid in Vercel Dashboard
2. Confirm email is from "Sadzys Singles <onboarding@resend.dev>"
3. Update sender email in `/api/webhook.js` after Resend domain verification
4. Check Resend dashboard for email delivery status

### API Functions Returning 500
1. Check Vercel deployment logs for errors
2. Verify all required environment variables are set
3. Confirm Stripe SDK and Resend library are working correctly

## Monitoring & Logs

View deployment logs:
```bash
vercel logs --follow
```

Monitor in Vercel Dashboard:
1. Project → Deployments → Select latest
2. Functions tab for serverless function logs
3. View stdout/stderr output

## Next Steps

1. Test checkout locally with `vercel dev`
2. Deploy to production: `vercel deploy --prod`
3. Test with Stripe test card: `4242 4242 4242 4242`
4. Configure custom domain in Vercel Dashboard if needed
5. Switch to live Stripe keys when ready for production
