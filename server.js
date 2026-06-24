// ── Nav menu toggle ──────────────────────────────────────────────────
let menuIcon = document.querySelector('#menu-icon');
let navbar   = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// ── Scroll: active nav link + sticky header ──────────────────────────
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top    = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id     = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// ── Contact form — POST to backend ───────────────────────────────────
const contactForm = document.getElementById('contactForm');
const msgEl       = document.getElementById('msg');
const submitBtn   = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.value    = 'Sending…';
    submitBtn.disabled = true;
    msgEl.textContent  = '';
    msgEl.style.color  = '';

    const body = {
        Name:    document.getElementById('Name').value.trim(),
        Email:   document.getElementById('Email').value.trim(),
        Mobile:  document.getElementById('Mobile').value.trim(),
        Subject: document.getElementById('Subject').value.trim(),
        Message: document.getElementById('Message').value.trim(),
    };

    try {
        const res  = await fetch('http://localhost:3000/contact', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(body),
        });

        const data = await res.json();

        if (res.ok && data.success) {
            msgEl.style.color = '#00e5ff';
            msgEl.textContent = '✅ ' + data.message;
            contactForm.reset();
        } else {
            msgEl.style.color = '#ff4b4b';
            msgEl.textContent = '❌ ' + (data.message || 'Something went wrong.');
        }
    } catch (err) {
        msgEl.style.color = '#ff4b4b';
        msgEl.textContent = '❌ Could not reach server. Make sure the backend is running.';
    } finally {
        submitBtn.value    = 'Send Message';
        submitBtn.disabled = false;
    }
});
