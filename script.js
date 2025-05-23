document.addEventListener('DOMContentLoaded', function() {
    // Default language
    let currentLanguage = 'en';

    // Get language buttons
    const enButton = document.getElementById('en-switch');
    const frButton = document.getElementById('fr-switch');

    // Get all translatable elements
    const translatableElements = document.querySelectorAll('[data-translate]');

    // Function to update language
    function updateLanguage(lang) {
        currentLanguage = lang;

        // Update active state on buttons
        enButton.classList.toggle('active', lang === 'en');
        frButton.classList.toggle('active', lang === 'fr');

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update all translatable elements
        translatableElements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key] && translations[key][lang]) {
                element.textContent = translations[key][lang];
            }
        });

        // Store the language preference
        localStorage.setItem('bubbleLanguage', lang);
    }

    // Set up event listeners for language switches
    enButton.addEventListener('click', () => updateLanguage('en'));
    frButton.addEventListener('click', () => updateLanguage('fr'));

    // Check for stored language preference
    const storedLanguage = localStorage.getItem('bubbleLanguage');
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'fr')) {
        updateLanguage(storedLanguage);
    } else {
        // Try to detect browser language
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('fr')) {
            updateLanguage('fr');
        } else {
            updateLanguage('en');
        }
    }

    // Simple form submission handling
    const waitlistForm = document.getElementById('waitlist-form');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const commentsInput = document.getElementById('comments');

            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                comments: commentsInput.value
            };

            // For now, just show an alert - we'll implement real API later
            alert('Thank you for joining our waitlist! We\'ll be in touch soon.');

            // Clear the form
            waitlistForm.reset();
        });
    }

    // Chat interface functionality
    const chatInput = document.querySelector('.chat-input');
    const chatSubmit = document.querySelector('.chat-submit');
    const suggestionButtons = document.querySelectorAll('.chat-suggestion-btn');

    suggestionButtons.forEach(button => {
        button.addEventListener('click', () => {
            chatInput.value = button.textContent;
            chatInput.focus();
        });
    });

    chatSubmit.addEventListener('click', () => {
        if (chatInput.value.trim()) {
            alert('This is a placeholder response. Chat functionality will be implemented in the future.');
            chatInput.value = '';
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim()) {
            alert('This is a placeholder response. Chat functionality will be implemented in the future.');
            chatInput.value = '';
        }
    });
});