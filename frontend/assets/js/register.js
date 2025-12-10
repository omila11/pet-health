// Registration functionality with API integration

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

async function handleRegister(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const mobileNumber = document.querySelector('input[name="mobile number"]').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation
    if (!fullName || !email || !mobileNumber || !password || !confirmPassword) {
        showError('Please fill in all fields');
        return;
    }
    
    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters long');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    try {
        // Show loading state
        const submitButton = event.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Registering...';
        submitButton.disabled = true;
        
        // Call API
        const response = await api.register({
            fullName,
            email,
            password,
            mobileNumber
        });
        
        // Success
        alert('Registration successful! Redirecting to login...');
        window.location.href = 'login.html';
        
    } catch (error) {
        showError(error.message || 'Registration failed. Please try again.');
        
        // Restore button
        const submitButton = event.target.querySelector('button[type="submit"]');
        submitButton.textContent = 'Register';
        submitButton.disabled = false;
    }
}

function showError(message) {
    // Create or update error message element
    let errorDiv = document.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.marginBottom = '15px';
        errorDiv.style.padding = '10px';
        errorDiv.style.backgroundColor = '#ffe6e6';
        errorDiv.style.border = '1px solid #ff0000';
        errorDiv.style.borderRadius = '4px';
        
        const form = document.querySelector('form');
        form.insertBefore(errorDiv, form.firstChild);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
