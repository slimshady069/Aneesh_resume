// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling with validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        let isValid = true;
        const email = formData.get('email');
        const message = formData.get('message');
        const name = formData.get('name');
        
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            isValid = false;
        }
        
        if (!email || !isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            isValid = false;
        }
        
        if (!message || message.length < 10) {
            showNotification('Message must be at least 10 characters long', 'error');
            isValid = false;
        }
        
        if (isValid) {
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            showNotification('Thank you for your message! I will get back to you soon.', 'success');
            this.reset();
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation to service cards on scroll
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

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Mobile navigation toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger i');
    
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('fa-bars');
    hamburger.classList.toggle('fa-times');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (navLinks.classList.contains('show') && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('show');
        const hamburgerIcon = hamburger.querySelector('i');
        hamburgerIcon.classList.add('fa-bars');
        hamburgerIcon.classList.remove('fa-times');
    }
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${progress}%`;
});

// Dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Scroll to top button
const scrollTopButton = document.createElement('button');
scrollTopButton.className = 'scroll-top';
scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.classList.add('show');
    } else {
        scrollTopButton.classList.remove('show');
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add typing effect to hero section
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect when the page loads
    window.addEventListener('load', typeWriter);
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Portfolio Filtering
const portfolioItems = document.querySelectorAll('.portfolio-item');
const portfolioFilters = document.createElement('div');
portfolioFilters.className = 'portfolio-filters';
portfolioFilters.innerHTML = `
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="web-design">Web Design</button>
    <button class="filter-btn" data-filter="development">Development</button>
    <button class="filter-btn" data-filter="consulting">Consulting</button>
`;

document.querySelector('.portfolio').insertBefore(portfolioFilters, document.querySelector('.portfolio-grid'));

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        
        // Filter items
        const filter = btn.dataset.filter;
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Testimonial Slider
const testimonials = [
    {
        text: "Amazing work! The team delivered exactly what we needed.",
        author: "John Doe",
        position: "CEO, Company Inc.",
        image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23f0f0f0'/><text x='50%' y='50%' font-size='24' text-anchor='middle' fill='%23999'>JD</text></svg>"
    },
    {
        text: "Professional team, excellent communication, and outstanding results.",
        author: "Jane Smith",
        position: "Marketing Director, Tech Corp",
        image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23f0f0f0'/><text x='50%' y='50%' font-size='24' text-anchor='middle' fill='%23999'>JS</text></svg>"
    },
    {
        text: "The best web development team we've worked with. Highly recommended!",
        author: "Mike Johnson",
        position: "Founder, Startup XYZ",
        image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23f0f0f0'/><text x='50%' y='50%' font-size='24' text-anchor='middle' fill='%23999'>MJ</text></svg>"
    }
];

let currentTestimonial = 0;
const testimonialSlider = document.querySelector('.testimonial-slider');
const testimonialDots = document.querySelector('.testimonial-dots');

// Create dots
testimonials.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'testimonial-dot' + (index === 0 ? ' active' : '');
    dot.addEventListener('click', () => showTestimonial(index));
    testimonialDots.appendChild(dot);
});

function showTestimonial(index) {
    currentTestimonial = index;
    const testimonial = testimonials[index];
    
    testimonialSlider.innerHTML = `
        <div class="testimonial-slide">
            <div class="testimonial-content">
                <p>${testimonial.text}</p>
                <div class="testimonial-author">
                    <img src="${testimonial.image}" alt="${testimonial.author}">
                    <div>
                        <h4>${testimonial.author}</h4>
                        <p>${testimonial.position}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Update dots
    document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Blog Card Hover Effects
document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Animate stats when they come into view
const stats = document.querySelectorAll('.stat-number');
const animateStats = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = parseInt(target.textContent);
            let currentValue = 0;
            const duration = 2000;
            const increment = finalValue / (duration / 16);

            const updateValue = () => {
                currentValue += increment;
                if (currentValue < finalValue) {
                    target.textContent = Math.floor(currentValue);
                    requestAnimationFrame(updateValue);
                } else {
                    target.textContent = finalValue;
                }
            };

            updateValue();
            observer.unobserve(target);
        }
    });
};

const statsObserver = new IntersectionObserver(animateStats, {
    threshold: 0.5
});

stats.forEach(stat => statsObserver.observe(stat));

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

// Download resume functionality
const downloadResume = document.querySelector('.cta-button.secondary');
if (downloadResume) {
    downloadResume.addEventListener('click', (e) => {
        e.preventDefault();
        // Add your resume download logic here
        alert('Resume download functionality will be implemented here.');
    });
}

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const category = button.getAttribute('data-filter');
        
        projectItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
}); 

// FAQ Toggle Function
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('i');
    
    // Close all other FAQ items
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.faq-answer');
            const otherIcon = item.querySelector('.faq-question i');
            if (otherAnswer) {
                otherAnswer.style.maxHeight = '0px';
            }
            if (otherIcon) {
                otherIcon.style.transform = 'rotate(0deg)';
            }
        }
    });
    
    // Toggle current FAQ item
    faqItem.classList.toggle('active');
    
    if (faqItem.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    } else {
        answer.style.maxHeight = '0px';
        icon.style.transform = 'rotate(0deg)';
    }
}

// Quote form functionality
function scrollToQuoteForm() {
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add click event listeners to quote buttons
document.addEventListener('DOMContentLoaded', function() {
    const quoteButtons = document.querySelectorAll('.quote-btn');
    quoteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToQuoteForm();
        });
    });
}); 