/*--- Attendre que le document soit prêt ---*/
document.addEventListener('DOMContentLoaded', () => {

    /* ---  DARK MODE AVEC LOCALSTORAGE --- */
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Vérifier la préférence sauvegardée
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            darkModeToggle.innerHTML = isDark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
        });
    }
})
/* --- NAVBAR DYNAMIQUE AU SCROLL --- */
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('mainNav');

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    /* ---  BOUTON RETOUR EN HAUT (Smooth Scroll) --- */
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 500 ? 'block' : 'none';
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /*--- compteur ---*/

    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target); // Animer une seule fois
            }
        });
    }, { threshold: 0.8 });

    counters.forEach(c => counterObserver.observe(c));

    function animateCounter(element, target) {
        let count = 0;
        const speed = 2000; // Durée totale de l'animation en ms
        const increment = target / (speed / 16); // 60fps

        const update = () => {
            count += increment;
            if (count < target) {
                element.innerText = Math.ceil(count).toLocaleString();
                requestAnimationFrame(update);
            } else {
                element.innerText = target.toLocaleString();
            }
        };
        update();
    }
});


/* --- 4. FILTRAGE DYNAMIQUE (freelances.html) --- */
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".freelance-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        //  active button style
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        cards.forEach(card => {
            const category = card.getAttribute("data-category");

            if (filter === "all" || category === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });

    });
});

/*--- modal ---*/ 
/*--- Attendre que le document soit prêt ---*/
document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("profileModal");

    if (modal) {
        modal.addEventListener("show.bs.modal", function (event) {
            // Le bouton qui a déclenché la modale
            const button = event.relatedTarget;
            // Extraire les infos des attributs data-
            const name = button.getAttribute("data-name");
            const job = button.getAttribute("data-job");
            const price = button.getAttribute("data-price");
            const desc = button.getAttribute("data-desc");
             // Mettre à jour le contenu de la modale
            document.getElementById("modalName").innerText = name;
            document.getElementById("modalJob").innerText = job;
            document.getElementById("modalPrice").innerText = price;
            document.getElementById("modalDesc").innerText = desc;

        });
    }

});


/* --- 6. VALIDATION DE FORMULAIRE (contact.html) --- */
/*--- Attendre que le document soit prêt ---*/ 
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('contactform');

    if (!form) {
        console.error("Formulaire introuvable !");
        return;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Simple validation visuelle
        const validate = (el, condition) => {
            if (condition) {
                el.classList.remove('is-invalid');
                el.classList.add('is-valid');
            } else {
                el.classList.remove('is-valid');
                el.classList.add('is-invalid');
                isValid = false;
            }
        };

        validate(name, name.value.trim().length > 2);
        validate(email, emailRegex.test(email.value));
        validate(message, message.value.trim().length >= 20);

        if (isValid) {
            document.getElementById('formSuccess').classList.remove('d-none');
            form.reset();
        }
    });


});


