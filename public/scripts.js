/* ========================================
   SYLVIE ZHAO REAL ESTATE - MAIN JAVASCRIPT
   ======================================== */

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.testimonial-dot');
const prevArrow = document.querySelector('.testimonial-arrow.prev');
const nextArrow = document.querySelector('.testimonial-arrow.next');
let currentIndex = 0;

function showTestimonial(index) {
    if (testimonials.length === 0) return;

    // Handle wrapping
    if (index < 0) index = testimonials.length - 1;
    if (index >= testimonials.length) index = 0;

    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
}

if (dots.length > 0) {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });

    // Arrow navigation
    if (prevArrow) {
        prevArrow.addEventListener('click', () => showTestimonial(currentIndex - 1));
    }
    if (nextArrow) {
        nextArrow.addEventListener('click', () => showTestimonial(currentIndex + 1));
    }

    // Auto-rotate testimonials
    setInterval(() => {
        showTestimonial(currentIndex + 1);
    }, 6000);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission - opens email client
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value || 'Not provided';
        const service = document.getElementById('service').value || 'Not specified';
        const message = document.getElementById('message').value;

        // Build email body
        const subject = encodeURIComponent(`Website Inquiry from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}

Message:
${message}`
        );

        // Open email client - CHANGE THIS EMAIL ADDRESS
        window.location.href = `mailto:zhaosylvie@gmail.com?subject=${subject}&body=${body}`;
    });
}

// Inquiry form on listing pages
const inquiryForm = document.querySelector('.inquiry-form form');
if (inquiryForm) {
    inquiryForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const inputs = this.querySelectorAll('input, textarea');
        const name = inputs[0].value;
        const email = inputs[1].value;
        const phone = inputs[2].value || 'Not provided';
        const message = inputs[3].value;

        const subject = encodeURIComponent(`Property Inquiry from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`
        );

        // Open email client - CHANGE THIS EMAIL ADDRESS
        window.location.href = `mailto:zhaosylvie@gmail.com?subject=${subject}&body=${body}`;
    });
}

// Listing tabs (for home page featured listings)
const tabButtons = document.querySelectorAll('.tab-btn');
const homeListingCards = document.querySelectorAll('.listings .listing-card');

tabButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        tabButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.textContent.toLowerCase().trim();

        homeListingCards.forEach(card => {
            const badge = card.querySelector('.listing-badge');
            const badgeText = badge ? badge.textContent.toLowerCase().trim() : '';

            let showCard = false;

            if (filter === 'residential') {
                showCard = (badgeText === 'residential');
            } else if (filter === 'commercial') {
                showCard = (badgeText === 'commercial');
            } else if (filter === 'recently sold') {
                showCard = (badgeText === 'sold');
            }

            card.style.display = showCard ? '' : 'none';
        });
    });
});

// Filter buttons (for listings page)
const filterButtons = document.querySelectorAll('.filter-btn');
const listingCards = document.querySelectorAll('.listings-page .listing-card');
const listingsCount = document.querySelector('.listings-count');

filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Get filter type from button text
        const filter = this.textContent.toLowerCase().trim();
        let visibleCount = 0;

        listingCards.forEach(card => {
            // Get the badge text to determine listing type
            const badge = card.querySelector('.listing-badge');
            const badgeText = badge ? badge.textContent.toLowerCase().trim() : '';

            let showCard = false;

            if (filter === 'all properties') {
                showCard = true;
            } else if (filter === 'residential') {
                showCard = badgeText === 'residential';
            } else if (filter === 'commercial') {
                showCard = badgeText === 'commercial';
            } else if (filter === 'sold') {
                showCard = badgeText === 'sold';
            }

            // Show or hide the card
            if (showCard) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update the count text
        if (listingsCount) {
            listingsCount.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? 'property' : 'properties'}`;
        }
    });
});

// Mobile menu toggle (basic implementation)
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function () {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}
