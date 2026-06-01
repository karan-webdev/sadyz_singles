# Pre-Deployment Checklist

## Code Conversion ✅ Complete

- [x] `/api/checkout.js` - Converted to Vercel Function format
  - Uses `handler(req, res)` format
  - Auto-detects app URL from `VERCEL_URL` env variable
  - Handles both test and production URLs

- [x] `/api/webhook.js` - Created with proper webhook handling
  - Disables automatic body parsing
  - Reads raw buffer for signature verification
  - Sends emails via Resend on success
  - Graceful error handling

- [x] `/api/health.js` - Health check endpoint created

- [x] `/package.json` - Dependencies updated
  - Removed: express, cors, dotenv
  - Kept: stripe, resend, react, etc.

- [x] `/vite.config.js` - Proxy configuration removed

- [x] `server.js` - Deleted (no longer needed)

- [x] `vercel.json` - Deployment config created

- [x] `.vercelignore` - Vercel ignore rules created

- [x] Frontend components - No changes needed (already use `/api` routes)

---

## Documentation ✅ Complete

- [x] `CONVERSION_SUMMARY.md` - Overview of all changes
- [x] `VERCEL_DEPLOYMENT.md` - Complete deployment guide
- [x] `SERVERLESS_ARCHITECTURE.md` - Architecture overview
- [x] Repo memory updated with new architecture

---

## Before Deployment

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Set Up Stripe Keys
**Get from Stripe Dashboard:**
- [ ] Secret Key (sk_test_... for testing or sk_live_... for production)
- [ ] Webhook Signing Secret (whsec_...)

**Products:**
- [ ] Season Pass ID: prod_Ub9fS7NN7Z2Bs4 ($150 AUD)
- [ ] Weekly Pass ID: prod_Ub9euVvknchab3 ($12.50 AUD)

### 3. Set Up Resend API Key
**Get from Resend Dashboard:**
- [ ] API Key (re_...)
- [ ] Note: Update sender email in `/api/webhook.js` after domain verification

### 4. Link Project
```bash
cd c:\Users\karan\Downloads\sadys\react
vercel login
vercel link
```

### 5. Configure Environment Variables in Vercel Dashboard
1. Go to Project Settings → Environment Variables
2. Add each variable:
   - [ ] `STRIPE_SK_KEY` = sk_test_... (or sk_live_...)
   - [ ] `STRIPE_WEBHOOK_SECRET` = whsec_...
   - [ ] `RESEND_API_KEY` = re_...
   - [ ] `VITE_SEASON_PRODUCT_ID` = prod_Ub9fS7NN7Z2Bs4
   - [ ] `VITE_MULTI_PRODUCT_ID` = prod_Ub9euVvknchab3

### 6. Local Testing with Vercel CLI
```bash
npm install
vercel dev
```

**Test:**
- [ ] Frontend loads at http://localhost:3000
- [ ] Checkout button works
- [ ] API calls succeed (check browser console)
- [ ] Stripe test card works: 4242 4242 4242 4242

### 7. Configure Stripe Webhook
1. Stripe Dashboard → Developers → Webhooks
2. Click "Add Endpoint"
3. **Endpoint URL:** `https://your-vercel-deployment.vercel.app/api/webhook`
4. **Events to listen for:**
   - [ ] checkout.session.completed
5. **Copy signing secret** and set as `STRIPE_WEBHOOK_SECRET` in Vercel

### 8. Deploy to Production
```bash
vercel deploy --prod
```

### 9. Post-Deployment Testing
1. Visit your Vercel deployment URL
2. [ ] Test checkout with Stripe test card: 4242 4242 4242 4242
3. [ ] Verify success page shows
4. [ ] Check email was received (Resend)
5. [ ] Verify webhook was processed (Stripe Dashboard → Webhooks → Your endpoint)

### 10. Monitor Deployment
```bash
vercel logs --follow
```
- [ ] No errors in logs
- [ ] All environment variables loaded correctly
- [ ] API functions executing successfully

---

## Before Going Live

- [ ] Switch to live Stripe keys (sk_live_...)
- [ ] Update Stripe webhook to production mode if not already
- [ ] Update sender email in `/api/webhook.js` (if using custom Resend domain)
- [ ] Test with real payment method
- [ ] Enable production mode in Stripe Dashboard
- [ ] Set up monitoring/alerts for failed webhooks

---

## File Structure Verification

Ensure your project has these files:
```
✓ api/checkout.js
✓ api/health.js
✓ api/webhook.js
✓ src/ (all components unchanged)
✓ package.json (no express, cors, dotenv)
✓ vite.config.js (no proxy)
✓ vercel.json
✓ CONVERSION_SUMMARY.md
✓ VERCEL_DEPLOYMENT.md
✓ SERVERLESS_ARCHITECTURE.md
✓ .vercelignore
✗ server.js (should be deleted)
```

---

## Troubleshooting

### Environment Variables Not Loading
- Redeploy after setting variables: `vercel deploy --prod`
- Check Vercel Dashboard → Project Settings → Environment Variables
- Verify spelling matches exactly (case-sensitive)

### API Functions Returning 500
```bash
# Check logs
vercel logs

# Common causes:
# - Missing environment variable
# - Wrong Stripe key format
# - Wrong Stripe product IDs
```

### Webhook Not Receiving Events
1. Check webhook endpoint URL matches deployment
2. Verify webhook signing secret in Vercel matches Stripe
3. Check Stripe Dashboard → Webhooks → Your endpoint → Logs

### Emails Not Sending
1. Verify `RESEND_API_KEY` is correct
2. Check Resend Dashboard for email delivery logs
3. Verify sender email is from approved Resend domain
4. Update sender email in `/api/webhook.js` after domain verification

---

## Success Indicators

✅ All three API endpoints return correct responses:
- `GET /api/health` → `{ "status": "ok" }`
- `POST /api/checkout` → `{ "url": "https://checkout.stripe.com/..." }`
- `POST /api/webhook` → Processes Stripe events correctly

✅ Frontend loads and renders correctly

✅ Stripe checkout flow completes successfully

✅ Confirmation emails are received

✅ Stripe webhooks are logged successfully

---

## Deployment Complete! 🚀

Your Vite + React + Stripe application is now running on Vercel serverless functions with:
- ✅ Zero-configuration hosting
- ✅ Auto-scaling backend functions
- ✅ Global edge distribution
- ✅ Secure environment variable management
- ✅ Built-in HTTPS
- ✅ Webhook processing for Stripe events
- ✅ Email delivery via Resend

**Next: Follow the steps in this checklist to deploy!**
