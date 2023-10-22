document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the selected language from storage or use the default language 'fr'
    const storedLanguage = localStorage.getItem('selectedLanguage') || 'fr';

    i18next
        .use(i18nextHttpBackend)
        .init({
            lng: storedLanguage, // Use the stored language or default to 'fr'
            fallbackLng: 'fr', // fallback language
            debug: true, // enable debug logs
            preload: ['fr', 'en'], // Preload both 'fr' and 'en' translations
            backend: {
                loadPath: 'locales/{{lng}}.json', // Path to localization files with language and namespace placeholders
            },
        }, function (err, t) {
            // Set the selected option based on the stored language after i18next is initialized
            const languageSelect = document.getElementById('language-select');
            languageSelect.value = storedLanguage;

            // Set up the event listener for language change after i18next is initialized
            languageSelect.addEventListener('change', function () {
                const selectedLanguage = languageSelect.value;

                // Store the selected language in localStorage
                localStorage.setItem('selectedLanguage', selectedLanguage);

                // Change the language using i18next
                i18next.changeLanguage(selectedLanguage, () => updateContent());
            });

            // Call updateContent after i18next is initialized
            updateContent();
        });

    function updateContent() {
        const elements = document.querySelectorAll('.translation');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = i18next.t(key);
        });
    }
});
