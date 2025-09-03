document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            // Alterna la clase 'is-active' en el menú y el botón
            mainNav.classList.toggle('is-active');
            menuToggle.classList.toggle('is-active');

            // Actualiza el atributo ARIA para accesibilidad
            const isActive = mainNav.classList.contains('is-active');
            menuToggle.setAttribute('aria-expanded', isActive);
        });
    }

    // --- NUEVO CÓDIGO PARA EL BOTÓN VOLVER ARRIBA ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        // Mostrar u ocultar el botón según el scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) { // Muestra el botón después de 300px de scroll
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        // Desplazamiento suave al hacer clic en el botón
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Hace el scroll suave
            });
        });
    }
    // --- FIN DEL NUEVO CÓDIGO ---    

});