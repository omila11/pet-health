// Main JavaScript file for PetvaxHub

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('PetvaxHub loaded successfully!');
    
    // Add any global JavaScript functionality here
    initializeNavigation();
});

// Initialize navigation functionality
function initializeNavigation() {
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.includes(currentPage) || (currentPage === 'index.html' && href === 'index.html'))) {
            link.classList.add('active');
        }
    });
}

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show notification helper
function showNotification(message, type = 'info') {
    // You can implement a custom notification system here
    alert(message);
}
