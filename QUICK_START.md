# Quick Start Guide - Vercel Serverless

## For Developers

### First Time Setup

1. **Install dependencies:**
   ```bash
   cd c:\Users\karan\Downloads\sadys\react
   npm install
   ```

2. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

3. **Link to Vercel project:**
   ```bash
   vercel link
   ```

### Local Development

**Option 1: Full Stack (Recommended)**
```bash
vercel dev
```
- Starts both frontend and API functions locally
- Frontend: http://localhost:3000
- API: http://localhost:3000/api/*
- Simulates production environment exactly

**Option 2: Frontend Only**
```bash
npm run dev
```
- Frontend only on http://localhost:5173
- API calls will fail (use Option 1 instead)

### Common Tasks

**Build for production:**
```bash
npm run build
```
Output goes to `dist/` directory.

**Deploy to production:**
```bash
vercel deploy --prod
```

**View logs:**
```bash
vercel logs --follow
```

**Check environment variables:**
```bash
# In Vercel Dashboard: Project Settings → Environment Variables
# Or via CLI: vercel env ls
```

---

## Project Structure

```
api/
├── checkout.js       # Create Stripe checkout session
├── health.js         # Health check endpoint
└── webhook.js        # Stripe webhook handler

src/
├── components/       # React components (unchanged)
├── utils/
│   └── stripe.js     # Stripe integration (unchanged)
└── main.jsx

vite.config.js        # Vite configuration (proxy removed)
vercel.json          # Vercel deployment config
package.json         # Dependencies (express removed)
```

---

## API Endpoints

### POST /api/checkout
Create a checkout session
```javascript
// Request
{
  "productId": "season" | "weekly"
}

// Response
{
  "url": "https://checkout.stripe.com/..."
}
```

### POST /api/webhook
Stripe webhook handler (called automatically by Stripe)
```javascript
// Headers: stripe-signature
// Body: Raw JSON from Stripe
// Processes: checkout.session.completed events
// Sends: Confirmation emails via Resend
```

### GET /api/health
Health check
```javascript
// Response
{
  "status": "ok"
}
```

---

## Making Changes

### Add a new API endpoint
1. Create `api/your-endpoint.js`:
   ```javascript
   export default async function handler(req, res) {
     if (req.method !== "GET") {
       return res.status(405).json({ error: "Method not allowed" });
     }
     
     // Your logic here
     
     return res.status(200).json({ data: "result" });
   }
   ```

2. Test locally with `vercel dev`

3. Deploy with `vercel deploy --prod`

### Modify existing endpoint
- Edit the function file in `/api/`
- Test locally with `vercel dev`
- Deploy with `vercel deploy --prod`

### Update React components
- Edit files in `/src/`
- Components already use `/api` routes (no changes needed)
- Test locally with `vercel dev`
- Deploy with `vercel deploy --prod`

---

## Environment Variables

Set in Vercel Dashboard (Project Settings → Environment Variables):

```
STRIPE_SK_KEY                    # Stripe Secret Key
STRIPE_WEBHOOK_SECRET            # Stripe Webhook Secret
RESEND_API_KEY                   # Resend API Key
VITE_SEASON_PRODUCT_ID           # Season Pass Product ID
VITE_MULTI_PRODUCT_ID            # Weekly Pass Product ID
```

### Access in code:
```javascript
const stripeKey = process.env.STRIPE_SK_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
```

### Local testing:
- Create `.env.local` file (git ignored)
- Add environment variables there
- `vercel dev` loads them automatically

---

## Testing Locally

1. Start development server:
   ```bash
   vercel dev
   ```

2. Open http://localhost:3000

3. Test checkout flow:
   - Click "Buy Now" button
   - Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any CVC

4. Check logs:
   ```bash
   vercel logs --follow
   ```

---

## Debugging

### API function not working?
1. Check logs: `vercel logs --follow`
2. Verify environment variables are set
3. Check function has correct format: `export default async function handler(req, res)`

### Environment variables not loading?
1. Confirm set in Vercel Dashboard
2. Restart dev server: `Ctrl+C` then `vercel dev`
3. Check with: `process.env.VARIABLE_NAME` in function

### Frontend can't reach API?
1. Ensure using `vercel dev` (not `npm run dev`)
2. Check API URL in fetch: should be `/api/...` (relative)
3. Check console for CORS errors

### Webhook not triggering?
1. Verify webhook URL in Stripe Dashboard
2. Check webhook signing secret matches
3. Test webhook from Stripe Dashboard → Webhooks → endpoint → Send test event

---

## Deployment Workflow

1. **Development:**
   ```bash
   vercel dev
   ```

2. **Testing:**
   - Test locally
   - Check logs for errors

3. **Commit:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```

4. **Deploy:**
   ```bash
   vercel deploy --prod
   ```

5. **Verify:**
   - Check deployment logs
   - Test on live URL
   - Verify webhook in Stripe Dashboard

---

## Useful Commands

```bash
# Start local dev server
vercel dev

# Deploy to production
vercel deploy --prod

# View logs
vercel logs --follow

# List environment variables
vercel env ls

# Set environment variable
vercel env add VARIABLE_NAME

# Remove environment variable
vercel env rm VARIABLE_NAME

# Build frontend
npm run build

# Preview build locally
npm run preview
```

---

## Important Notes

⚠️ **For Production:**
- Use live Stripe keys (sk_live_...)
- Test with real payment methods
- Monitor webhook logs
- Set up error alerting

✅ **This Project:**
- Zero configuration needed beyond env vars
- Automatic deployment on git push (if configured)
- Global CDN distribution
- Auto-scaling API functions
- Built-in HTTPS

---

## Support

**Documentation:**
- [CONVERSION_SUMMARY.md](CONVERSION_SUMMARY.md) - Overview
- [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) - Detailed guide
- [SERVERLESS_ARCHITECTURE.md](SERVERLESS_ARCHITECTURE.md) - Architecture
- [PRE_DEPLOYMENT_CHECKLIST.md](PRE_DEPLOYMENT_CHECKLIST.md) - Before deploying

**External Resources:**
- [Vercel Documentation](https://vercel.com/docs)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [Resend Documentation](https://resend.com/docs)
- [Vite Documentation](https://vitejs.dev)

---

**Happy coding!** 🚀
