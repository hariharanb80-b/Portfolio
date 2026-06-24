// ── Nav menu toggle ──────────────────────────────────────────────────
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

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
const contactForm = document.querySelector('form[name="submit-to-google-sheet"]');
const msgEl       = document.getElementById('msg');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('input[type="submit"]');
        submitBtn.value    = 'Sending…';
        submitBtn.disabled = true;
        msgEl.textContent  = '';
        msgEl.style.color  = '';

        const body = {
            Name:    contactForm.querySelector('input[name="Name"]').value,
            Email:   contactForm.querySelector('input[name="Email Address"]').value,
            Mobile:  contactForm.querySelector('input[name="Mobile Number"]').value,
            Subject: contactForm.querySelector('input[name="Email Subject"]').value,
            Message: contactForm.querySelector('textarea[name="Your Message"]').value,
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
                msgEl.textContent = data.message;
                contactForm.reset();
            } else {
                msgEl.style.color = '#ff4b4b';
                msgEl.textContent = data.message || 'Something went wrong.';
            }
        } catch (err) {
            msgEl.style.color = '#ff4b4b';
            msgEl.textContent = 'Could not reach server. Please try again later.';
        } finally {
            submitBtn.value    = 'Send Message';
            submitBtn.disabled = false;
        }
    });
}
