// ===========================
// Advanced JavaScript with ES6+ Features
// ===========================

// Constants
// ===========================
const FORM_SUBMISSION_DELAY = 1500; // milliseconds
const DEBOUNCE_DELAY = 300; // milliseconds
const NOTIFICATION_DURATION = 5000; // milliseconds

// Utility Functions
// ===========================

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Sanitize user input to prevent XSS
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
const sanitizeInput = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
};

/**
 * Show notification message
 * @param {string} message - Message to display
 * @param {string} type - Type of notification (success or error)
 */
const showNotification = (message, type = 'success') => {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.hidden = false;
    
    // Auto-hide after duration
    setTimeout(() => {
        notification.hidden = true;
    }, NOTIFICATION_DURATION);
};

/**
 * Store form data in localStorage
 * @param {FormData} formData - Form data to store
 */
const saveFormData = (formData) => {
    try {
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        localStorage.setItem('contactFormData', JSON.stringify(data));
    } catch (error) {
        console.error('Error saving form data:', error);
    }
};

/**
 * Load form data from localStorage
 */
const loadFormData = () => {
    try {
        const savedData = localStorage.getItem('contactFormData');
        if (savedData) {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const input = document.querySelector(`[name="${key}"]`);
                if (input && input.type !== 'checkbox') {
                    input.value = data[key];
                } else if (input && input.type === 'checkbox') {
                    input.checked = data[key] === 'yes';
                }
            });
        }
    } catch (error) {
        console.error('Error loading form data:', error);
    }
};

// Theme Toggle Functionality
// ===========================

const initThemeToggle = () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Update ARIA label
        themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        
        // Announce to screen readers
        const announcement = isDark ? 'Dark mode enabled' : 'Light mode enabled';
        showNotification(announcement, 'success');
    });
};

// Form Validation
// ===========================

const validators = {
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    phone: {
        pattern: /^[\(]?[0-9]{3}[\)]?[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/,
        message: 'Please enter a valid phone number (e.g., (123) 456-7890)'
    },
    name: {
        pattern: /^[a-zA-ZÀ-ÿ\s\-']{2,50}$/,
        message: 'Name must be 2-50 characters and may include letters, spaces, hyphens, and apostrophes'
    }
};

/**
 * Validate a single form field
 * @param {HTMLInputElement} field - Field to validate
 * @returns {boolean} Whether field is valid
 */
const validateField = (field) => {
    const errorSpan = document.getElementById(`${field.id}-error`);
    if (!errorSpan) return true;
    
    let isValid = true;
    let errorMessage = '';
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    // Check pattern validation
    else if (field.value && validators[field.name]) {
        const validator = validators[field.name];
        if (!validator.pattern.test(field.value)) {
            isValid = false;
            errorMessage = validator.message;
        }
    }
    // Check minlength
    else if (field.minLength > 0 && field.value.length < field.minLength) {
        isValid = false;
        errorMessage = `Must be at least ${field.minLength} characters`;
    }
    // Check maxlength
    else if (field.maxLength > 0 && field.value.length > field.maxLength) {
        isValid = false;
        errorMessage = `Must be no more than ${field.maxLength} characters`;
    }
    // Check number constraints
    else if (field.type === 'number') {
        const value = parseFloat(field.value);
        const min = parseFloat(field.min);
        const max = parseFloat(field.max);
        
        if (field.value && (isNaN(value) || (min && value < min) || (max && value > max))) {
            isValid = false;
            errorMessage = `Please enter a number between ${min} and ${max}`;
        }
    }
    // Check select fields
    else if (field.tagName === 'SELECT' && field.hasAttribute('required') && !field.value) {
        isValid = false;
        errorMessage = 'Please select an option';
    }
    // Check checkbox
    else if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
        isValid = false;
        errorMessage = 'You must agree to continue';
    }
    
    errorSpan.textContent = errorMessage;
    field.setAttribute('aria-invalid', !isValid);
    
    return isValid;
};

/**
 * Calculate and update form completion progress
 */
const updateFormProgress = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const requiredFields = form.querySelectorAll('[required]');
    const completedFields = Array.from(requiredFields).filter(field => {
        if (field.type === 'checkbox') {
            return field.checked;
        }
        return field.value.trim() !== '';
    });
    
    const percentage = Math.round((completedFields.length / requiredFields.length) * 100);
    
    const progressBar = document.getElementById('form-progress');
    const progressPercentage = document.getElementById('progress-percentage');
    
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
        progressBar.setAttribute('aria-valuenow', percentage);
    }
    
    if (progressPercentage) {
        progressPercentage.textContent = percentage;
    }
};

/**
 * Update character count for textarea
 */
const updateCharacterCount = () => {
    const messageField = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    
    if (messageField && charCount) {
        const length = messageField.value.length;
        const maxLength = messageField.maxLength;
        charCount.textContent = `${length} / ${maxLength}`;
        
        // Change color when approaching limit
        if (length > maxLength * 0.9) {
            charCount.style.color = 'var(--color-warning)';
        } else if (length === maxLength) {
            charCount.style.color = 'var(--color-error)';
        } else {
            charCount.style.color = 'var(--color-text-light)';
        }
    }
};

/**
 * Initialize real-time form validation
 */
const initFormValidation = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Validate on blur (when user leaves field)
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
        field.addEventListener('blur', () => {
            if (field.value) {
                validateField(field);
            }
        });
        
        // Real-time validation for text inputs (debounced)
        if (field.type === 'text' || field.type === 'email' || field.type === 'tel' || field.tagName === 'TEXTAREA') {
            field.addEventListener('input', debounce(() => {
                if (field.value) {
                    validateField(field);
                }
                updateFormProgress();
            }, DEBOUNCE_DELAY));
        }
        
        // Update progress on change for other fields
        field.addEventListener('change', () => {
            validateField(field);
            updateFormProgress();
        });
    });
    
    // Character count for message field
    const messageField = document.getElementById('message');
    if (messageField) {
        messageField.addEventListener('input', debounce(updateCharacterCount, DEBOUNCE_DELAY));
    }
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isFormValid = true;
        fields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            showNotification('Please fix the errors in the form', 'error');
            // Focus on first invalid field
            const firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) {
                firstInvalid.focus();
            }
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        submitBtn.disabled = true;
        btnText.hidden = true;
        btnLoader.hidden = false;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, FORM_SUBMISSION_DELAY));
            
            const formData = new FormData(form);
            const email = sanitizeInput(formData.get('email'));
            
            // Save to localStorage
            saveFormData(formData);
            
            // Show success message
            showNotification(`Thank you! We will contact you at ${email}`, 'success');
            
            // Reset form after success
            setTimeout(() => {
                form.reset();
                updateFormProgress();
                updateCharacterCount();
                
                // Clear error messages
                form.querySelectorAll('.error-message').forEach(span => {
                    span.textContent = '';
                });
            }, 2000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('An error occurred. Please try again.', 'error');
        } finally {
            // Restore button state
            submitBtn.disabled = false;
            btnText.hidden = false;
            btnLoader.hidden = true;
        }
    });
    
    // Form reset
    form.addEventListener('reset', () => {
        setTimeout(() => {
            form.querySelectorAll('.error-message').forEach(span => {
                span.textContent = '';
            });
            form.querySelectorAll('[aria-invalid]').forEach(field => {
                field.setAttribute('aria-invalid', 'false');
            });
            updateFormProgress();
            updateCharacterCount();
            localStorage.removeItem('contactFormData');
        }, 0);
    });
};

// Smooth Scrolling for Navigation
// ===========================

const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#main') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update focus for accessibility
                target.tabIndex = -1;
                target.focus();
            }
        });
    });
};

// Analytics Tracking (Basic)
// ===========================

const trackEvent = (category, action, label) => {
    try {
        console.log('Analytics Event:', { category, action, label });
        // In production, this would send to analytics service
        // Example: gtag('event', action, { event_category: category, event_label: label });
    } catch (error) {
        console.error('Analytics error:', error);
    }
};

// Track button clicks
const initAnalytics = () => {
    document.querySelectorAll('button, a').forEach(element => {
        element.addEventListener('click', () => {
            const label = element.textContent.trim() || element.getAttribute('aria-label') || 'Unknown';
            trackEvent('User Interaction', 'Click', label);
        });
    });
};

// Keyboard Accessibility Enhancements
// ===========================

const initKeyboardNavigation = () => {
    // Add keyboard support for details elements
    document.querySelectorAll('summary').forEach(summary => {
        summary.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                summary.click();
            }
        });
    });
    
    // Trap focus in modal-like elements if needed
    // This is a placeholder for future modal functionality
};

// Performance Monitoring
// ===========================

const logPerformanceMetrics = () => {
    try {
        if (window.performance && window.performance.timing) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const connectTime = perfData.responseEnd - perfData.requestStart;
            
            console.log('Performance Metrics:', {
                pageLoadTime: `${pageLoadTime}ms`,
                connectTime: `${connectTime}ms`
            });
        }
    } catch (error) {
        console.error('Performance monitoring error:', error);
    }
};

// Service Worker Registration (Basic)
// ===========================

const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        // Service worker registration would go here
        // For this demo, we'll just log that it's supported
        console.log('Service Worker support detected');
    }
};

// Initialize Everything
// ===========================

const init = () => {
    try {
        // Core functionality
        initThemeToggle();
        initFormValidation();
        initSmoothScrolling();
        
        // Load saved form data
        loadFormData();
        
        // Initial progress calculation
        updateFormProgress();
        updateCharacterCount();
        
        // Enhanced features
        initKeyboardNavigation();
        initAnalytics();
        
        // Performance and advanced features
        logPerformanceMetrics();
        registerServiceWorker();
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Initialization error:', error);
    }
};

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Page became visible - could refresh data here
        console.log('Page is now visible');
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        sanitizeInput,
        validateField,
        showNotification
    };
}
