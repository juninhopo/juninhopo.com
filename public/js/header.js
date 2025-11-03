// Load header component into all pages
document.addEventListener('DOMContentLoaded', function() {
  fetch('/components/header.html')
    .then(response => response.text())
    .then(data => {
      // Insert header at the beginning of body
      document.body.insertAdjacentHTML('afterbegin', data);
    })
    .catch(error => console.error('Error loading header:', error));
});
