document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');

    // ... (All validation functions like validateFullName, validateEmail, etc., remain the same) ...

    function displayError(inputElement, message) {
        // ... (Error display function remains the same) ...
        const group = inputElement.closest('.input-group') || inputElement.closest('.checkbox-group');
        const errorSpanId = inputElement.id + 'Error';
        const errorSpan = document.getElementById(errorSpanId);

        if (message) {
            group.classList.add('error');
            group.classList.remove('success');
            errorSpan.textContent = message;
        } else {
            group.classList.remove('error');
            group.classList.add('success');
            errorSpan.textContent = '';
        }
    }

    function validateFullName() {
        if (fullName.value.trim().length < 3) {
            displayError(fullName, 'Full name must be at least 3 characters.');
            return false;
        }
        displayError(fullName, '');
        return true;
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const value = email.value.trim();
        if (!emailRegex.test(value)) {
            displayError(email, 'Please enter a valid email address.');
            return false;
        }
        displayError(email, '');
        return true;
    }

    function validatePassword() {
        const value = password.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(value)) {
            displayError(password, 'Password must be 8+ chars, with caps, small, & number.');
            return false;
        }
        displayError(password, '');
        return true;
    }

    function validateConfirmPassword() {
        if (confirmPassword.value !== password.value) {
            displayError(confirmPassword, 'Passwords do not match.');
            return false;
        }
        displayError(confirmPassword, '');
        return true;
    }

    function validateTerms() {
        if (!terms.checked) {
            displayError(terms, 'You must agree to the Terms and Conditions.');
            return false;
        }
        displayError(terms, '');
        return true;
    }

    function validateForm() {
        // Run all validations
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isTermsValid = validateTerms();

        return isFullNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isTermsValid;
    }
    
    // --- New Functionality: Storing Data ---

    function saveUser(userData) {
        // 1. Get existing users (or an empty array if none exist)
        const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        
        // 2. Add the new user
        // Note: In a real app, you would NEVER store passwords on the client side!
        // We're only saving Name/Email for the simulated admin list.
        const newUser = {
            id: users.length + 1,
            fullName: userData.fullName,
            email: userData.email
        };
        users.push(newUser);
        
        // 3. Save the updated list back to Local Storage
        localStorage.setItem('registeredUsers', JSON.stringify(users));
    }


    // Main form submission handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            const userData = {
                fullName: fullName.value.trim(),
                email: email.value.trim(),
                password: password.value // Still used for validation, not stored
            };
            
            saveUser(userData);

            // Confetti animation idea (CSS-only for simplicity, or use a library)
            alert('Registration Successful! 🎉 Welcome to SecureApp.');
            
            form.reset();
            // Optional: Remove success classes after reset
            document.querySelectorAll('.input-group, .checkbox-group').forEach(el => el.classList.remove('success'));
        }
    });

    // Add event listeners for instant validation on blur
    fullName.addEventListener('blur', validateFullName);
    email.addEventListener('blur', validateEmail);
    password.addEventListener('blur', validatePassword);
    confirmPassword.addEventListener('blur', validateConfirmPassword);
    terms.addEventListener('change', validateTerms);
});