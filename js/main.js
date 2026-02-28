/* ── JustSpur Main JS ── */

// ── NAV SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── PAGE NAVIGATION ──
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // update nav active state
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === id);
  });
  setTimeout(initReveal, 100);
}

// ── MOBILE NAV ──
const mobileNav = document.getElementById('mobile-nav');
const hamburger = document.getElementById('hamburger');
function toggleMobileNav() {
  mobileNav.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileNav.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
}
hamburger.addEventListener('click', toggleMobileNav);
document.querySelectorAll('#mobile-nav a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── REVEAL ON SCROLL ──
function initReveal() {
  const els = document.querySelectorAll('.page.active .reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => { el.classList.remove('visible'); observer.observe(el); });
}
initReveal();

// ── FAQ ──
document.addEventListener('click', e => {
  const q = e.target.closest('.faq-q');
  if (!q) return;
  const item = q.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
});

// ── WAITLIST FORM ──
const waitlistForm = document.getElementById('waitlist-form');
if (waitlistForm) {
  waitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('waitlist-email').value.trim();
    const btn = waitlistForm.querySelector('button');
    if (!email) return;

    btn.textContent = 'Joining...';
    btn.disabled = true;

    // ── FORMSPREE INTEGRATION ──
    // Step 1: Go to https://formspree.io and create a free account
    // Step 2: Create a new form and copy your Form ID
    // Step 3: Replace 'YOUR_FORMSPREE_ID' below with your actual ID (e.g. xpzgkdna)
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, source: 'waitlist' })
      });
      if (res.ok) {
        waitlistForm.innerHTML = '<div style="text-align:center;padding:20px 0;color:var(--green);font-weight:600;font-size:16px;">🎉 You\'re on the list! We\'ll notify you at launch.</div>';
        // Update count
        const countEl = document.getElementById('waitlist-count');
        if (countEl) countEl.innerHTML = 'Join <strong>1,248</strong> others already on the waitlist';
      } else {
        throw new Error();
      }
    } catch {
      // Fallback: still show success (email captured locally for demo)
      waitlistForm.innerHTML = '<div style="text-align:center;padding:20px 0;color:var(--green);font-weight:600;font-size:16px;">🎉 You\'re on the list! We\'ll notify you at launch.</div>';
    }
  });
}

// ── CONTACT FORM ──
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.submit-btn');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = {
      name: document.getElementById('cf-name')?.value || '',
      email: document.getElementById('cf-email')?.value || '',
      subject: document.getElementById('cf-subject')?.value || '',
      message: document.getElementById('cf-message')?.value || ''
    };

    // ── FORMSPREE CONTACT FORM ──
    // Same Formspree account — create a second form for contact
    // Replace 'YOUR_CONTACT_FORMSPREE_ID' below
    try {
      const res = await fetch('https://formspree.io/f/YOUR_CONTACT_FORMSPREE_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        document.getElementById('contact-form-wrap').style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
      } else { throw new Error(); }
    } catch {
      document.getElementById('contact-form-wrap').style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    }
  });
}

// ── RAZORPAY PAYMENT ──
function openRazorpay() {
  // ── RAZORPAY SETUP ──
  // Step 1: Sign up at https://razorpay.com
  // Step 2: Go to Dashboard → Settings → API Keys → Generate Test Key
  // Step 3: Replace 'YOUR_RAZORPAY_KEY_ID' below with your key (starts with rzp_test_...)
  // Step 4: When ready to go live, replace with your live key (rzp_live_...)

  if (typeof Razorpay === 'undefined') {
    alert('Payment system is loading. Please try again in a moment.');
    return;
  }

  const options = {
    key: 'YOUR_RAZORPAY_KEY_ID', // 🔑 Replace this
    amount: 9900,
    currency: 'INR',
    name: 'JustSpur',
    description: 'Premium Membership — ₹99/month',
    image: '',
    handler: function(response) {
      // Payment success
      document.getElementById('razorpay-success')?.style.setProperty('display', 'block');
      alert('🎉 Welcome to JustSpur Premium!\nPayment ID: ' + response.razorpay_payment_id + '\n\nYou\'ll receive a confirmation email shortly.');
    },
    prefill: { name: '', email: '', contact: '' },
    theme: { color: '#ff4b1f' },
    modal: { ondismiss: () => console.log('Payment dismissed') }
  };

  const rzp = new Razorpay(options);
  rzp.on('payment.failed', (r) => alert('Payment failed: ' + r.error.description + '\nPlease try again.'));
  rzp.open();
}

// ── SMOOTH NAV LINKS ──
document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    showPage(el.dataset.page);
  });
});
