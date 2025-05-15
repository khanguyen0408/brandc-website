// JavaScript approach for including header and footer components

document.addEventListener('DOMContentLoaded', function() {
// Function to load HTML components
function loadComponent(url, targetElementId) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById(targetElementId).innerHTML = this.responseText;
    }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

// Load the header component
if (document.getElementById('header-container')) {
    loadComponent('../../components/header.html', 'header-container');
}

// Load the footer component
if (document.getElementById('footer-container')) {
    loadComponent('../../components/footer.html', 'footer-container');
}
});