document.addEventListener('DOMContentLoaded', function () {
  const scrollLinks = document.querySelectorAll('.nav-link, .cta-button');

  scrollLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href && href.startsWith('#')) {
        e.preventDefault();

        // Warten, bis ALLE Ressourcen geladen sind (insb. Bilder)
        window.requestAnimationFrame(() => {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;

            // Nochmal in requestAnimationFrame um Layout Shift nach Lazy Loading zu vermeiden
            setTimeout(() => {
              const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
            }, 50); // Delay gibt dem Browser Zeit, Bilder final zu positionieren
          }
        });
      }
    });
  });
});
