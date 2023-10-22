async function includeHTML() {
  const elements = document.querySelectorAll('[include-html]');

  const promises = Array.from(elements).map(async (element) => {
    const file = element.getAttribute('include-html');

    try {
      const response = await fetch(file);
      if (response.ok) {
        const text = await response.text();
        element.innerHTML = text;
      } else {
        element.innerHTML = 'Page not found.';
      }
    } catch (error) {
      console.error('Error fetching include-html file:', error);
    } finally {
      element.removeAttribute('include-html');
    }
  });

  await Promise.all(promises);
}
