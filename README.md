# Sadzys React - Vercel Serverless Deployment

A modern **Vite + React** frontend with **Vercel Serverless Functions** backend for processing Stripe payments and sending confirmation emails.

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Install Vercel CLI
npm install -g vercel

# Start development server (with API functions)
vercel dev
```

Open [http://localhost:3000](http://localhost:3000)

### Deployment
```bash
# Set environment variables in Vercel Dashboard first
# Then deploy to production
vercel deploy --prod
```

## 📁 Project Structure

```
api/                    # Vercel Serverless Functions
├── checkout.js         # Create Stripe checkout sessions
├── health.js           # Health check endpoint
└── webhook.js          # Handle Stripe webhook events

src/                    # React Frontend (Vite)
├── components/         # React components
├── utils/
│   └── stripe.js       # Stripe integration
└── main.jsx

vercel.json            # Vercel configuration
package.json           # Dependencies (express removed)
```

## 🔧 API Endpoints

All endpoints are serverless functions deployed to Vercel:

- **POST** `/api/checkout` - Create Stripe checkout session
- **POST** `/api/webhook` - Handle Stripe webhooks
- **GET** `/api/health` - Health check

## 📦 Key Dependencies

- **Frontend**: React 18, Vite, TailwindCSS
- **Backend**: Stripe, Resend (email)
- **Deployment**: Vercel (serverless)

## 🔐 Environment Variables

Set in **Vercel Dashboard** (Project Settings → Environment Variables):

```
STRIPE_SK_KEY              # Stripe Secret Key
STRIPE_WEBHOOK_SECRET      # Stripe Webhook Signing Secret
RESEND_API_KEY             # Resend API Key
VITE_SEASON_PRODUCT_ID     # Season Pass Product ID
VITE_MULTI_PRODUCT_ID      # Weekly Pass Product ID
```

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Developer guide and common tasks
- **[VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)** - Complete deployment guide
- **[SERVERLESS_ARCHITECTURE.md](SERVERLESS_ARCHITECTURE.md)** - Architecture overview
- **[PRE_DEPLOYMENT_CHECKLIST.md](PRE_DEPLOYMENT_CHECKLIST.md)** - Pre-deployment verification
- **[CONVERSION_SUMMARY.md](CONVERSION_SUMMARY.md)** - Migration details
- **[MIGRATION_MANIFEST.md](MIGRATION_MANIFEST.md)** - Complete manifest of all changes

## 🧪 Testing

### Local Testing
```bash
vercel dev
```
- Frontend: http://localhost:3000
- API functions: http://localhost:3000/api/*

### Test Stripe Card
```
Card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
```

## 🌐 Production Deployment

1. Install Vercel CLI: `npm install -g vercel`
2. Link project: `vercel link`
3. Set environment variables in Vercel Dashboard
4. Configure Stripe webhook: `https://your-deployment.vercel.app/api/webhook`
5. Deploy: `vercel deploy --prod`

## 📊 Features

✅ **Vite + React** - Fast, modern frontend  
✅ **Vercel Serverless** - Auto-scaling backend functions  
✅ **Stripe Payments** - Secure payment processing  
✅ **Email Notifications** - Transactional emails via Resend  
✅ **Webhook Handling** - Real-time payment confirmations  
✅ **Zero Configuration** - Deploy instantly to Vercel  
✅ **Global CDN** - Content distributed worldwide  
✅ **Auto-scaling** - Handle any traffic spike  

## 🔗 Important Links

- [Vercel Documentation](https://vercel.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Resend Documentation](https://resend.com/docs)
- [Vite Documentation](https://vitejs.dev)

## 📝 Notes

- **No Express server** - Uses Vercel serverless functions
- **No persistent state** - All functions are stateless
- **Auto-scaling** - Pay only for what you use
- **Live keys** - Switch to live Stripe keys before production

## 🆘 Support

For deployment issues, check:
1. Environment variables are set in Vercel Dashboard
2. Stripe webhook endpoint is configured correctly
3. Logs via: `vercel logs --follow`
4. See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) troubleshooting section

---

**Ready to deploy!** Follow the [PRE_DEPLOYMENT_CHECKLIST.md](PRE_DEPLOYMENT_CHECKLIST.md) to get started.
