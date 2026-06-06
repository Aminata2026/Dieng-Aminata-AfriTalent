
document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. DARK MODE AVEC LOCALSTORAGE --- */
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Vérifier la préférence sauvegardée
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if(darkModeToggle) darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }

    if(darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            darkModeToggle.innerHTML = isDark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
        });
    }}) 

    window.addEventListener('scroll', () => {
    const navbar = document.getElementById('mainNav');

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    /* --- 7. BOUTON RETOUR EN HAUT (Smooth Scroll) --- */
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 500 ? 'block' : 'none';
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});