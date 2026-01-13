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

// Demo Voice Modal
function createDemoModal() {
    const modal = document.createElement('div');
    modal.id = 'demoModal';
    modal.innerHTML = `
        <div class="demo-modal-overlay" onclick="closeDemoModal()"></div>
        <div class="demo-modal-content">
            <button class="demo-modal-close" onclick="closeDemoModal()">&times;</button>
            <div class="demo-modal-header">
                <div class="demo-modal-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z"/>
                        <path d="M17 12c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V22h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    </svg>
                </div>
                <h3>Talk to Our AI Receptionist</h3>
                <p>Call now to experience how it handles live roofing inquiries.</p>
            </div>
            
            <a href="tel:+15183517231" class="demo-option demo-option-primary" onclick="trackCallClick()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
                <div>
                    <strong>Call (518) 351-7231</strong>
                    <span>AI Receptionist Demo</span>
                </div>
            </a>
            
            <p class="demo-modal-note">Available 24/7. Standard call rates apply.</p>
        </div>
    `;
    document.body.appendChild(modal);
}

function openDemoModal() {
    if (!document.getElementById('demoModal')) {
        createDemoModal();
    }
    document.getElementById('demoModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDemoModal() {
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function trackCallClick() {
    console.log('Call-to-action clicked');
    // Optional: Add analytics event here
}

// Demo play button functionality
const playDemoBtn = document.getElementById('playDemoBtn');
if (playDemoBtn) {
    playDemoBtn.addEventListener('click', openDemoModal);
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
