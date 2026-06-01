# Vercel Serverless Architecture - Quick Reference

## What Changed

The project has been converted from a traditional Node.js/Express server to a Vercel serverless architecture.

### Before (Express Server)
```
npm run dev          # Vite frontend on :5173
node server.js       # Express backend on :5000
                     # Proxy routes /api to :5000
```

### After (Vercel Serverless)
```
vercel dev           # Vite frontend + API functions
                     # Frontend calls /api routes
                     # Functions deployed serverless
```

## Project Structure

```
api/                 # Vercel Serverless Functions
├── checkout.js     # POST /api/checkout - Create Stripe session
├── health.js       # GET /api/health - Health check
└── webhook.js      # POST /api/webhook - Stripe webhook handler

src/                # React Vite frontend (unchanged)
├── components/
├── utils/
└── main.jsx
```

## Key Files Removed
- `server.js` - No longer needed (Express server)

## Key Files Added/Updated
- `vercel.json` - Vercel deployment configuration
- `api/checkout.js` - Converted to Vercel Function format
- `api/webhook.js` - New Stripe webhook handler
- `api/health.js` - New health check endpoint
- `VERCEL_DEPLOYMENT.md` - Comprehensive deployment guide
- `package.json` - Removed express, cors, dotenv

## API Endpoint Format

All functions use Vercel's standard handler format:

```javascript
export default async function handler(req, res) {
  // req - HTTP request
  // res - HTTP response
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  
  // Process request
  return res.status(200).json({ result: "success" });
}
```

## Environment Variables

Set in Vercel Dashboard (not .env files):
- `STRIPE_SK_KEY` - Stripe Secret Key
- `STRIPE_WEBHOOK_SECRET` - Webhook Signing Secret
- `RESEND_API_KEY` - Email API Key
- `VITE_SEASON_PRODUCT_ID` - Product ID
- `VITE_MULTI_PRODUCT_ID` - Product ID

## Frontend Changes

✓ No changes needed! Frontend already uses relative `/api` routes
- `src/utils/stripe.js` calls `fetch('/api/checkout', ...)`
- All components work without modification

## Local Development

### Using Vercel CLI (Recommended)
```bash
npm install
vercel dev
```

### Frontend Only
```bash
npm install
npm run dev
```
(Note: API calls won't work without Vercel CLI)

## Deployment

```bash
# Set environment variables in Vercel Dashboard first

# Deploy to production
vercel deploy --prod
```

## Important Notes

✓ **Frontend**: Served as static build output from `dist/`
✓ **Backend**: Deployed as serverless functions in `/api/`
✓ **No persistent server**: All backend is stateless
✓ **Auto-scaling**: Each function scales independently
✓ **No dependencies**: Express, cors, dotenv not needed

## Webhook Configuration

After deployment, configure Stripe webhook:
1. Stripe Dashboard → Developers → Webhooks
2. Endpoint URL: `https://your-deployment.vercel.app/api/webhook`
3. Set `STRIPE_WEBHOOK_SECRET` in Vercel Dashboard

## Testing

1. Stripe test card: `4242 4242 4242 4242`
2. Use `vercel dev` for local testing with real API functions
3. Logs available via `vercel logs --follow`

## Advantages of Serverless

- No server to manage
- Auto-scaling based on demand
- Pay only for execution time
- Global edge network
- Built-in HTTPS
- Environment variables managed securely
