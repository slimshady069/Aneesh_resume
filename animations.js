// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Custom cursor effect
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursor.appendChild(cursorDot);

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    document.querySelectorAll('a, button, .card, .service-card, .benefit-card, .partner-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
}

// Magnetic effect with enhanced smoothness
function magneticEffect(element) {
    let bounds;
    let currentX = 0;
    let currentY = 0;
    let aimX = 0;
    let aimY = 0;

    function updateBounds() {
        bounds = element.getBoundingClientRect();
    }

    function updatePosition() {
        currentX += (aimX - currentX) * 0.1;
        currentY += (aimY - currentY) * 0.1;
        element.style.transform = `translate(${currentX}px, ${currentY}px)`;
        requestAnimationFrame(updatePosition);
    }

    element.addEventListener('mousemove', (e) => {
        updateBounds();
        aimX = (e.clientX - bounds.left - bounds.width / 2) * 0.3;
        aimY = (e.clientY - bounds.top - bounds.height / 2) * 0.3;
    });

    element.addEventListener('mouseleave', () => {
        aimX = 0;
        aimY = 0;
    });

    updatePosition();
}

// Intersection Observer for fade-in animations
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Smooth page transition effect
function initPageTransition() {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.href.startsWith(window.location.origin)) {
                e.preventDefault();
                transition.style.transform = 'scaleY(1)';
                
                setTimeout(() => {
                    window.location.href = link.href;
                }, 500);
            }
        });
    });
}

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initPageTransition();

    // Hero section animations with enhanced 3D effect
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero p');
    const heroButtons = document.querySelectorAll('.hero .cta-button');
    const heroFeatures = document.querySelectorAll('.hero-features .feature');

    if (heroTitle) {
        revealText(heroTitle);
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px) scale(0.95)';
    }
    
    if (heroSubtitle) {
        revealText(heroSubtitle);
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px) scale(0.95)';
    }

    heroButtons.forEach((button, index) => {
        button.classList.add('animate-fade-in', `delay-${(index + 3) * 100}`);
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px) scale(0.95)';
        magneticEffect(button);
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
            button.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    heroFeatures.forEach((feature, index) => {
        feature.classList.add('animate-fade-in', `delay-${(index + 4) * 100}`);
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px) scale(0.95)';
    });

    // Enhanced section animations with 3D parallax and smooth reveals
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const heading = section.querySelector('h2');
        const content = section.querySelectorAll('p, .card, .grid-item, .partner-card, .blog-card, .faq-item, .service-card, .benefit-card');
        
        if (heading) {
            revealText(heading);
            heading.classList.add('animate-slide-left');
            observer.observe(heading);
        }
        
        content.forEach((item, index) => {
            item.classList.add('animate-fade-in', `delay-${(index + 1) * 100}`);
            observer.observe(item);
        });

        // Enhanced parallax effect with perspective and depth
        if (section.classList.contains('hero') || section.classList.contains('broker-hero')) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.5;
                section.style.backgroundPositionY = `${rate}px`;
                section.style.transform = `perspective(1000px) rotateX(${scrolled * 0.02}deg) scale(${1 + scrolled * 0.0001})`;
            });
        }
    });

    // Enhanced floating animation with 3D rotation and magnetic effect
    const floatingElements = document.querySelectorAll('.profile-image, .partner-logo img, .service-card, .benefit-card');
    floatingElements.forEach(element => {
        element.classList.add('animate-float');
        element.style.transformStyle = 'preserve-3d';
        magneticEffect(element);
    });

    // Enhanced timeline animations with smooth reveals and 3D effect
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        // Set initial state
        item.style.opacity = '1';
        item.style.transform = 'translateX(-100px)'; // Start from left side
        item.style.transition = 'transform 0.6s ease-out';
        item.style.transitionDelay = `${index * 0.2}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'translateX(0)'; // Move to original position
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        observer.observe(item);
        
        const title = item.querySelector('h3');
        if (title) revealText(title);
    });

    // Enhanced skill bars with 3D effect and progress animation
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9) rotateX(10deg)';
        observer.observe(item);
        
        const progressBar = item.querySelector('.progress-bar');
        if (progressBar) {
            const width = progressBar.getAttribute('data-progress');
            progressBar.style.width = '0';
            setTimeout(() => {
                progressBar.style.width = width + '%';
            }, 500);
        }
    });

    // Enhanced project cards with 3D hover effect and magnetic interaction
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) rotateX(5deg)';
        observer.observe(item);
        magneticEffect(item);
        
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) rotateX(0deg)';
            item.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) rotateX(5deg)';
            item.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
    });

    // Enhanced FAQ items with 3D flip and smooth text reveal
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) rotateX(5deg)';
        observer.observe(item);
        
        const question = item.querySelector('.question');
        if (question) revealText(question);
        
        item.addEventListener('click', () => {
            item.style.transform = 'rotateX(180deg)';
            setTimeout(() => {
                item.style.transform = 'rotateX(0deg)';
            }, 300);
        });
    });

    // Enhanced hover animations with 3D effect and magnetic interaction
    const cards = document.querySelectorAll('.card, .service-card, .benefit-card, .partner-card');
    cards.forEach(card => {
        magneticEffect(card);
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
    });

    // Smooth scroll with easing and progress indicator
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

    // Enhanced scroll progress indicator with gradient animation
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
});

// Enhanced CSS animations with Apple-style transitions
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #007AFF;
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s, border-color 0.3s;
        z-index: 9999;
    }

    .cursor-dot {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 4px;
        height: 4px;
        background: #007AFF;
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }

    .cursor-hover {
        width: 40px;
        height: 40px;
        border-color: #5856D6;
    }

    .page-transition {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        transform: scaleY(0);
        transform-origin: top;
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 9999;
    }

    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, #007AFF, #5856D6);
        z-index: 1000;
        transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .visible {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .animate-float {
        animation: float 3s ease-in-out infinite;
        transform-style: preserve-3d;
    }

    @keyframes float {
        0% { transform: translateY(0px) rotateX(0deg); }
        50% { transform: translateY(-10px) rotateX(5deg); }
        100% { transform: translateY(0px) rotateX(0deg); }
    }

    .card, .service-card, .benefit-card, .partner-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transform-style: preserve-3d;
        backface-visibility: hidden;
    }

    .faq-item {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        transform-style: preserve-3d;
        backface-visibility: hidden;
    }

    .progress-bar {
        transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .word {
        display: inline-block;
        margin-right: 0.25em;
    }

    span {
        display: inline-block;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);

// Simple text reveal animation
function revealText(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    const words = text.split(' ');
    words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';
        wordSpan.style.display = 'inline-block';
        wordSpan.style.opacity = '0';
        wordSpan.style.transform = 'translateY(20px)';
        
        for (let i = 0; i < word.length; i++) {
            const span = document.createElement('span');
            span.textContent = word[i];
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            wordSpan.appendChild(span);
        }
        
        element.appendChild(wordSpan);
        element.appendChild(document.createTextNode(' '));
        
        setTimeout(() => {
            wordSpan.style.opacity = '1';
            wordSpan.style.transform = 'translateY(0)';
            
            const letters = wordSpan.querySelectorAll('span');
            letters.forEach((letter, letterIndex) => {
                setTimeout(() => {
                    letter.style.opacity = '1';
                    letter.style.transform = 'translateY(0)';
                }, letterIndex * 15);
            });
        }, wordIndex * 50);
    });
}

// Apply text reveal to hero section
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero h1');
    const heroText = document.querySelector('.hero p');
    
    if (heroTitle) revealText(heroTitle);
    if (heroText) revealText(heroText);
});

// Smooth hover transitions for buttons and cards
document.querySelectorAll('.cta-button, .contact-btn, .expertise-card, .project-item').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.02)';
        element.style.transition = 'transform 0.3s ease-out';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1)';
    });
});

// Staggered animation for skill items
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// Smooth navigation menu transitions
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-2px)';
        link.style.transition = 'transform 0.3s ease-out';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
    });
});

// Loading screen animation
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
});

// Smooth dark mode transition
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    document.body.style.transition = 'background-color 0.3s ease-out, color 0.3s ease-out';
}

// Stats counter animation
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.textContent);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    entry.target.textContent = target + (entry.target.textContent.includes('+') ? '+' : '');
                    clearInterval(timer);
                } else {
                    entry.target.textContent = Math.floor(current) + (entry.target.textContent.includes('+') ? '+' : '');
                }
            }, 20);
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

stats.forEach(stat => statsObserver.observe(stat)); 