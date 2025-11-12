// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Form Validation and Submission
    const registrationForm = document.getElementById('registrationForm');
    const successModal = document.getElementById('successModal');
    const modalClose = document.getElementById('modalClose');
    const closeModalBtn = document.querySelector('.close-modal');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // In a real application, you would send the form data to a server here
                // For demonstration, we'll just show the success modal
                showSuccessModal();
            }
        });
    }
    
    // Close modal events
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            successModal.style.display = 'none';
            registrationForm.reset();
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            successModal.style.display = 'none';
            registrationForm.reset();
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.style.display = 'none';
            registrationForm.reset();
        }
    });
    
    // Form Validation Function
    function validateForm() {
        let isValid = true;
        
        // Parent Name Validation
        const parentName = document.getElementById('parentName');
        const parentNameError = document.getElementById('parentNameError');
        if (!parentName.value.trim()) {
            parentNameError.textContent = 'Please enter your name';
            isValid = false;
        } else {
            parentNameError.textContent = '';
        }
        
        // Child Name Validation
        const childName = document.getElementById('childName');
        const childNameError = document.getElementById('childNameError');
        if (!childName.value.trim()) {
            childNameError.textContent = 'Please enter your child\'s name';
            isValid = false;
        } else {
            childNameError.textContent = '';
        }
        
        // Email Validation
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            emailError.textContent = 'Please enter your email address';
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        } else {
            emailError.textContent = '';
        }
        
        // Phone Validation
        const phone = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        if (!phone.value.trim()) {
            phoneError.textContent = 'Please enter your phone number';
            isValid = false;
        } else if (!phoneRegex.test(phone.value)) {
            phoneError.textContent = 'Please enter a valid phone number';
            isValid = false;
        } else {
            phoneError.textContent = '';
        }
        
        // Child Age Validation
        const childAge = document.getElementById('childAge');
        const childAgeError = document.getElementById('childAgeError');
        if (!childAge.value) {
            childAgeError.textContent = 'Please enter your child\'s age';
            isValid = false;
        } else if (childAge.value < 3 || childAge.value > 18) {
            childAgeError.textContent = 'Child must be between 3 and 18 years old';
            isValid = false;
        } else {
            childAgeError.textContent = '';
        }
        
        return isValid;
    }
    
    // Show Success Modal
    function showSuccessModal() {
        if (successModal) {
            successModal.style.display = 'flex';
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'white';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .benefit-item, .signup-form-container');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .benefit-item, .signup-form-container {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate, .benefit-item.animate, .signup-form-container.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-card:nth-child(1) { transition-delay: 0.1s; }
        .service-card:nth-child(2) { transition-delay: 0.2s; }
        .service-card:nth-child(3) { transition-delay: 0.3s; }
        
        .benefit-item:nth-child(1) { transition-delay: 0.1s; }
        .benefit-item:nth-child(2) { transition-delay: 0.2s; }
        .benefit-item:nth-child(3) { transition-delay: 0.3s; }
    `;
    document.head.appendChild(style);
    
    // Initial check and event listener for animations
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});