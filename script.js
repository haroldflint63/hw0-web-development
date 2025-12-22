// ================================
// Dark Mode Toggle
// ================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
}

// Toggle theme on button click
themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ================================
// Smooth Scrolling for Navigation
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - navHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// Back to Top Button
// ================================
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton?.classList.add('visible');
    } else {
        backToTopButton?.classList.remove('visible');
    }
});

backToTopButton?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ================================
// Form Validation and Submission
// ================================
const contactForm = document.getElementById('contact-form');

// Validation functions
const validators = {
    name: (value) => {
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
    },
    email: (value) => {
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
    },
    message: (value) => {
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
    }
};

// Validate individual field
function validateField(field) {
    const fieldName = field.name;
    const value = field.value;
    const errorElement = field.parentElement.querySelector('.error-message');
    
    const errorMessage = validators[fieldName] ? validators[fieldName](value) : '';
    
    if (errorMessage) {
        field.classList.add('error');
        field.classList.remove('success');
        errorElement.textContent = errorMessage;
        return false;
    } else {
        field.classList.remove('error');
        field.classList.add('success');
        errorElement.textContent = '';
        return true;
    }
}

// Add real-time validation
contactForm?.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
            validateField(field);
        }
    });
});

// Handle form submission
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const fields = contactForm.querySelectorAll('input, textarea');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        
        // Show success toast
        showToast(`Thanks, ${name}! We'll contact you at ${email} soon.`, 'success');
        
        // Reset form
        contactForm.reset();
        fields.forEach(field => {
            field.classList.remove('success', 'error');
            const errorElement = field.parentElement.querySelector('.error-message');
            if (errorElement) errorElement.textContent = '';
        });
    } else {
        showToast('Please fix the errors in the form.', 'error');
    }
});

// ================================
// Toast Notification
// ================================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// ================================
// Scroll Animations (Fade In)
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.skill-card, .project-card, .stat-item, .contact-method, .about-content, .about-stats'
    );
    
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

// ================================
// Navbar Scroll Effect
// ================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ================================
// Performance: Native Lazy Loading Support
// ================================
// Modern browsers support native lazy loading for images
// The loading="lazy" attribute is already set in HTML
// No additional JavaScript is needed for lazy loading

// ================================
// Accessibility: Focus Management
// ================================
document.addEventListener('keydown', (e) => {
    // Show focus outline only when using keyboard navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ================================
// Console Message
// ================================
console.log('%c👋 Welcome to my portfolio!', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
console.log('%cBuilt with vanilla HTML, CSS, and JavaScript', 'font-size: 14px; color: #6b7280;');
