/* ============================================================
   PORTFOLIO — script.js
   ✏️ EDIT GUIDE: Search for "✏️ EDIT" to find customizable values
   ============================================================ */

/* ---- TYPED TEXT ANIMATION ---- */
// ✏️ EDIT: Change these roles to match your profile
const roles = [
  'Web Developer',
  'C Programmer',
  'Frontend Developer',
  'Problem Solver',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeEffect() {
  if (!typedEl) return;
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => { isDeleting = true; }, 1800);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeEffect, isDeleting ? 60 : 110);
}
typeEffect();

/* ---- NAVBAR SCROLL SHRINK ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
});

/* ---- ACTIVE NAV LINK ON SCROLL ---- */
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const links = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

/* ---- MOBILE HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---- THEME TOGGLE (Dark / Light) ---- */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
let isLight = false;
themeToggle?.addEventListener('click', () => {
  isLight = !isLight;
  document.body.classList.toggle('light', isLight);
  themeIcon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});
// Restore saved theme
if (localStorage.getItem('theme') === 'light') {
  isLight = true;
  document.body.classList.add('light');
  if (themeIcon) themeIcon.className = 'fas fa-moon';
}

/* ---- SCROLL REVEAL (fade-up) ---- */
const fadeObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
// Add fade-up class to major elements
document.querySelectorAll(
  '.strip-card, .project-card, .cert-card, .timeline-item, .skill-tag, .contact-item, .about-text, .about-image-wrap'
).forEach((el, i) => {
  el.classList.add('fade-up');
  fadeObserver.observe(el);
});

/* ---- SKILL BAR ANIMATION ---- */
const skillObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          fill.style.width = fill.dataset.width + '%';
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
document.querySelectorAll('.skills-preview-card, .skills-full-grid').forEach(el => {
  skillObserver.observe(el);
});

/* ---- COUNTER ANIMATION ---- */
const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(el => {
          const target = parseInt(el.dataset.target);
          let count = 0;
          const step = Math.max(1, Math.floor(target / 50));
          const interval = setInterval(() => {
            count = Math.min(count + step, target);
            el.textContent = count;
            if (count >= target) clearInterval(interval);
          }, 30);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll('.stats-card').forEach(el => counterObserver.observe(el));

/* ---- CONTACT FORM ---- */
/*
  ✏️ EDIT: To make the form actually send emails, use one of:
  Option A — EmailJS (free, no backend needed):
    1. Sign up at https://emailjs.com
    2. Get your Service ID, Template ID, and Public Key
    3. Uncomment the EmailJS code below and fill in your IDs

  Option B — Formspree (easiest):
    1. Sign up at https://formspree.io
    2. Create a form and copy your endpoint (e.g. https://formspree.io/f/xyzabc)
    3. Uncomment the Formspree code below and replace the URL
*/

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('formName').value.trim();
  const email   = document.getElementById('formEmail').value.trim();
  const subject = document.getElementById('formSubject').value.trim();
  const message = document.getElementById('formMessage').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all required fields.';
    formStatus.style.color = '#ff6680';
    return;
  }

  // ---- OPTION A: EmailJS ----
  // Uncomment and fill in your EmailJS details:
  /*
  try {
    formStatus.textContent = 'Sending...';
    await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      from_name: name,
      reply_to: email,
      subject: subject,
      message: message,
    }, 'YOUR_PUBLIC_KEY');
    formStatus.textContent = '✅ Message sent successfully!';
    formStatus.style.color = '#7c5cbf';
    contactForm.reset();
  } catch (err) {
    formStatus.textContent = '❌ Failed to send. Please try again.';
    formStatus.style.color = '#ff6680';
  }
  */

  // ---- OPTION B: Formspree ----
  // Uncomment and replace YOUR_FORM_ID with your Formspree ID:
  /*
  try {
    formStatus.textContent = 'Sending...';
    const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, subject, message }),
    });
    if (res.ok) {
      formStatus.textContent = '✅ Message sent successfully!';
      formStatus.style.color = '#7c5cbf';
      contactForm.reset();
    } else {
      throw new Error();
    }
  } catch {
    formStatus.textContent = '❌ Failed to send. Please try again.';
    formStatus.style.color = '#ff6680';
  }
  */

  // ---- DEFAULT (demo message until you set up above) ----
  formStatus.textContent = '⚠️ Form not connected yet. See script.js to enable email sending.';
  formStatus.style.color = '#f0a840';
});

/* ---- SMOOTH SCROLL for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- PROJECT IMAGE FALLBACK ---- */
// Shows icon placeholder if image file doesn't exist
document.querySelectorAll('.project-img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
    const fallback = img.nextElementSibling;
    if (fallback?.classList.contains('project-img-fallback')) {
      fallback.style.display = 'grid';
    }
  });
});