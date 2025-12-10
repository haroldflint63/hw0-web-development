// Form validation and submission handling
const form = document.querySelector('#contact-form');
const emailInput = document.querySelector('#email');
const favInput = document.querySelector('#fav');
const emailError = document.querySelector('#email-error');
const favError = document.querySelector('#fav-error');
const formMessages = document.querySelector('#form-messages');
const submitBtn = document.querySelector('#submit-btn');

// Email validation function
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate email field
function validateEmailField() {
  const email = emailInput?.value.trim() || '';
  
  if (!email) {
    showError(emailInput, emailError, 'Email is required');
    return false;
  } else if (!validateEmail(email)) {
    showError(emailInput, emailError, 'Please enter a valid email address');
    return false;
  } else {
    clearError(emailInput, emailError);
    return true;
  }
}

// Validate favorite number field
function validateFavField() {
  const fav = favInput?.value || '';
  
  if (fav && (fav < 1 || fav > 10)) {
    showError(favInput, favError, 'Please enter a number between 1 and 10');
    return false;
  } else {
    clearError(favInput, favError);
    return true;
  }
}

// Show error message
function showError(input, errorElement, message) {
  if (!errorElement) return;
  errorElement.textContent = message;
  input.setAttribute('aria-invalid', 'true');
}

// Clear error message
function clearError(input, errorElement) {
  if (!errorElement) return;
  errorElement.textContent = '';
  input.removeAttribute('aria-invalid');
}

// Show form message (success or error)
function showFormMessage(message, type) {
  if (!formMessages) return;
  formMessages.textContent = message;
  formMessages.className = type; // 'success' or 'error'
  formMessages.setAttribute('role', 'alert');
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    formMessages.classList.add('hidden');
  }, 5000);
}

// Real-time email validation
if (emailInput) {
  emailInput.addEventListener('blur', () => {
    validateEmailField();
  });
  
  emailInput.addEventListener('input', () => {
    if (emailInput.value.trim()) {
      clearError(emailInput, emailError);
    }
  });
}

// Real-time favorite number validation
if (favInput) {
  favInput.addEventListener('blur', () => {
    validateFavField();
  });
  
  favInput.addEventListener('input', () => {
    clearError(favInput, favError);
  });
}

// Form submission handler
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isEmailValid = validateEmailField();
    const isFavValid = validateFavField();
    const isValid = isEmailValid && isFavValid;
    
    // If validation passes, show success message
    if (isValid) {
      const email = emailInput.value.trim();
      
      // Show loading state
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending';
      }
      
      // Simulate form submission (in production, replace with actual API call)
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send';
        }
        
        showFormMessage(`Thank you! We will contact you at ${email}`, 'success');
        
        // Reset form
        form.reset();
      }, 1000);
    } else {
      showFormMessage('Please fix the errors above', 'error');
    }
  });
}
