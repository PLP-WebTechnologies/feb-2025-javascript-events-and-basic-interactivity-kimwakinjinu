document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('sports-survey-form');
    const submitButton = document.getElementById('submit-survey-btn');
    const thankYouMessage = document.getElementById('thank-you-message');
    const questionSections = document.querySelectorAll('.question-section');
    const emailInput = document.getElementById('email');

    // Function to display error messages
    const displayError = (element, message) => {
        const errorSpan = element.parentElement.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    };

    // Function to clear error messages
    const clearErrors = () => {
        document.querySelectorAll('.error-message').forEach(span => span.textContent = '');
    };

    // Form validation logic
    const validateForm = (event) => {
        let isValid = true;
        clearErrors(); // Clear previous errors

        // Validate radio button questions
        questionSections.forEach(section => {
            const radioButtons = section.querySelectorAll('input[type="radio"]');
            const sectionName = radioButtons[0].name;
            const isChecked = Array.from(radioButtons).some(radio => radio.checked);

            if (!isChecked) {
                displayError(radioButtons[0], 'Please select an option.');
                isValid = false;
            }
        });

        // Validate email format if entered
        if (emailInput.value.trim() !== '') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                displayError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            }
        }

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if invalid
        } else {
            // If valid, hide form and show thank you message
            form.classList.add('hidden');
            thankYouMessage.classList.remove('hidden');
            event.preventDefault(); // Prevent actual form submission for this example
        }
    };

    // Event Listener for form submission
    form.addEventListener('submit', validateForm);

    // Event Listener for button hover (CSS handles basic hover, JS for bonus)
    submitButton.addEventListener('mouseover', () => {
        // Optional: Add a class for a special hover effect if needed
        // submitButton.classList.add('hover-effect');
    });

    submitButton.addEventListener('mouseout', () => {
        // Optional: Remove the class
        // submitButton.classList.remove('hover-effect');
    });

    // Event Listener for keypress (e.g., Enter key submits the form)
    document.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && !thankYouMessage.classList.contains('hidden')) {
             // Prevent submitting if thank you message is already shown
             event.preventDefault();
        } else if (event.key === 'Enter') {
            // Trigger form submission on Enter key press
            validateForm(event);
        }
    });

    // Bonus: Double-click for a secret action (e.g., change button color dramatically)
    submitButton.addEventListener('dblclick', () => {
        submitButton.style.backgroundColor = '#ff00ff'; // Magenta!
        submitButton.textContent = 'SECRET SUBMIT!';
    });
});

