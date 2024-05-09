function setupSectionObserver() {
    const sections = Array.from(document.querySelectorAll('section'));
    const options = {
        root: null, // Se observa respecto al viewport
        rootMargin: '0px',
        threshold: 0.5 // El callback se ejecutará cuando el 50% del elemento esté visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        
        entries.forEach(entry => {
            const currentIndex = sections.indexOf(entry.target);
            const hasNextSection = currentIndex < sections.length - 1;
            const hasPreviousSection = currentIndex > 0;

            if (entry.isIntersecting) {
                updateNavigation(entry.target.id);
                updateDownButton(entry.target.id, hasNextSection)
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
}

function updateNavigation(activeId) {
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupSectionObserver();
    transitionInClickMenu();
    EventClickDownButton();
});

function transitionInClickMenu(){
    const menuLinks = document.querySelectorAll('nav a');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

            // Obtener el ID de la sección objetivo desde el atributo href del enlace
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Comprobar si la sección objetivo existe
            if (targetSection) {
                // Realizar un scroll suave hacia la sección objetivo
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function updateDownButton(section, hasNextSection){
    containerButton = document.getElementById("scroll-indicator");
    if (section !== "home") {
        containerButton.classList.add("only-icon");
    } else {
        containerButton.classList.remove("only-icon");
    }
    if (!hasNextSection) {
        containerButton.classList.add("hidden");
    } else {
        containerButton.classList.remove("hidden");
    }
}

function EventClickDownButton(){
    const downButton = document.querySelector("#scroll-indicator");
    downButton.addEventListener("click", function() {
        moveToNextSection();
    });
}

function moveToNextSection() {
    // Obtiene todas las secciones
    const sections = Array.from(document.querySelectorAll('section'));
    // Encuentra la sección que está mayormente visible en la ventana
    const currentSectionIndex = sections.findIndex(section => {
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight;
    });
    
    // Si hay una siguiente sección, haz scroll hacia ella
    if (currentSectionIndex !== -1 && currentSectionIndex + 1 < sections.length) {
        sections[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
    }
}