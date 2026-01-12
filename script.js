// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Nav background on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(15, 15, 26, 0.95)';
    } else {
        nav.style.background = 'rgba(15, 15, 26, 0.8)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in effect to sections
document.querySelectorAll('.problem-card, .feature-card, .step, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Demo play button functionality
const playDemoBtn = document.getElementById('playDemoBtn');
if (playDemoBtn) {
    playDemoBtn.addEventListener('click', () => {
        // Future: integrate with Vapi or similar for live demo call
        alert('🎧 Live demo feature coming soon!\n\nFor now, book a strategy call to hear the AI in action.');
    });
}

// Typing animation for hero title (optional enhancement)
const addTypingEffect = () => {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    heroTitle.style.opacity = '1';
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    addTypingEffect();
});

// Track calendar booking (analytics placeholder)
const calendarEmbed = document.getElementById('calendarEmbed');
if (calendarEmbed) {
    // Listen for messages from the iframe (if GHL supports it)
    window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'booking_complete') {
            console.log('Booking completed:', event.data);
            // Future: send to analytics
        }
    });
}
