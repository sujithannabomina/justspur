# JustSpur — Marketing Website

**Intentional Dating, Real Meetings**

## Folder Structure
```
justspur/
├── index.html        ← Main website (all pages)
├── css/
│   └── style.css     ← All styles
├── js/
│   └── main.js       ← All JavaScript + integrations
├── vercel.json       ← Vercel deployment config
└── README.md         ← This file
```

## Pages Included
- **Home** — Hero, Stats, How It Works, Categories, Testimonials, Waitlist CTA
- **Features** — Full feature bento + comparison table
- **Pricing** — Free vs Premium + Razorpay + FAQ
- **About** — Story, Values, Founder
- **Blog** — 6 articles
- **Contact** — Form (Formspree) + contact links

---

## Setup Checklist (Do These Before Going Live)

### 1. Formspree (Contact Form + Waitlist) — FREE
1. Go to https://formspree.io → Sign up
2. Create Form 1: "JustSpur Waitlist" → Copy Form ID
3. Create Form 2: "JustSpur Contact" → Copy Form ID
4. In `js/main.js` replace:
   - `YOUR_FORMSPREE_ID` (appears 2 times) → your waitlist form ID
   - `YOUR_CONTACT_FORMSPREE_ID` → your contact form ID

### 2. Razorpay (Payments) — Setup Required
1. Go to https://razorpay.com → Sign up
2. Complete KYC (PAN card + bank account)
3. Dashboard → Settings → API Keys → Generate Test Key
4. In `js/main.js` replace `YOUR_RAZORPAY_KEY_ID` with your key
5. Test with Razorpay test cards first
6. When ready: generate Live Key and replace the test key

### 3. Play Store Link — When App is Live
In `index.html` find:
```html
<a class="playstore-btn" href="#" onclick="showComingSoon(event)">
```
Replace `href="#"` with your actual Play Store URL and remove `onclick="showComingSoon(event)"`

---

## Deploy to Vercel

### Step 1 — Push to GitHub
```bash
# In your terminal / Git Bash:
cd justspur
git init
git add .
git commit -m "Initial JustSpur website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/justspur.git
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to https://vercel.com → Log in
2. Click "Add New Project"
3. Import your `justspur` GitHub repo
4. Click "Deploy" — done!

### Step 3 — Connect Your Domain (justspur.com)
1. In Vercel → Project → Settings → Domains
2. Add `justspur.com`
3. Vercel shows you DNS records to add
4. Go to Namecheap → Domain → Advanced DNS
5. Add the records Vercel shows you
6. Wait 10–30 minutes → Your site is live at justspur.com ✅

---

## Future Updates
- When app launches: update Play Store button
- When users grow: replace testimonials with real ones
- Blog: add real articles when ready
- Analytics: add Google Analytics tag in `<head>` of index.html
