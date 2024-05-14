function setupSectionObserver() {
  const sections = Array.from(document.querySelectorAll("section"));
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      const currentIndex = sections.indexOf(entry.target);
      const hasNextSection = currentIndex < sections.length - 1;
      const hasPreviousSection = currentIndex > 0;

      if (entry.isIntersecting) {
        console.log("xxx");

        updateNavigation(entry.target.id);
        updateDownButton(entry.target.id, hasNextSection);
        updateBackground(entry.target.id);
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });
}
const navLinks = document.querySelectorAll("nav a");
const logoContainer = document.getElementById("logo-container");
const homeLogoContainer = document.querySelector("#home .logo");
const homeLogo = homeLogoContainer
  ? homeLogoContainer.querySelector("img")
  : null;
const header = document.querySelector("header");
const logoHome = document.querySelector('#home .logo img');
const logoHeader = document.querySelector('#logo-container img');
function updateNavigation(activeId) {
  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${activeId}`
    );
  });
  console.log(activeId !== "home" && homeLogo);

  if (activeId !== "home") {
    header.classList.add("not-home");
    document.querySelector("nav").style.cssText = "float: right;"; // Alinea el menú a la derecha
    if (homeLogo && !logoContainer.contains(homeLogo)) {
      animateLogoToHeader();
    }
  } else {
    homeLogo.classList.remove("center-logo-home");
    homeLogo.classList.add("center-logo");
    header.classList.remove("not-home");
    document.querySelector("nav").style.cssText = "float: none;"; // Restablece el estilo del menú
    headerLogo.classList.add("hidden");
  }

  if (activeId !== "home" && homeLogo) {
    document.querySelector("nav").style.cssText = "float: right;"; // Alinea el menú a la derecha
  } else {
    document.querySelector("nav").style.cssText = "float: none;"; // Restablece el estilo del menú
  }
}

const headerLogo = document.querySelector(".header-logo");
function animateLogoToHeader() {
  const homeLogo = document.querySelector(".home-logo");

  const logoContainer = document.getElementById("logo-container");

  if (homeLogo && headerLogo && logoContainer) {
    const headerLogoRect = logoContainer.getBoundingClientRect();

    const translateX =
      headerLogoRect.left - window.innerWidth / 2 + headerLogoRect.width / 2;
    const translateY =
      headerLogoRect.top - window.innerHeight / 2 + headerLogoRect.height / 2;

    setTimeout(() => {
      homeLogo.classList.add("animate-logo");
      setTimeout(() => {
        homeLogo.style.transform = `translate(${
          translateX - 70
        }px, ${-50}px) scale(0.5)`;
        setTimeout(() => {
          homeLogo.classList.remove("center-logo", "animate-logo");
          homeLogo.classList.add("center-logo-home");
          headerLogo.classList.remove("hidden");
          homeLogo.style.transform = "";
          homeLogo.style.opacity = "";
        }, 300);
      }, 500);
    }, 100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  preloadImages();
  setupSectionObserver();
  transitionInClickMenu();
  EventClickDownButton();
  updateBackground();
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var currentComponent = document.querySelector(".content-section-2");

      if (currentComponent) {
        removeInfoTerrabox();
      }

      addInfoTerrabox(this.id);
    });
  });
  document.querySelectorAll(".nav-link-2").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      console.log(this.id);
      var currentComponent = document.querySelector(
        "#product2 .content-section"
      );
      console.log(currentComponent);
      if (currentComponent) {
        removeInfoRalaxy();
      }

      addInfoRalaxy(this.id);
    });
  });

  var nextButton = document.getElementById("next-button");
  nextButton.addEventListener("click", function () {
    nextProduct();
  });
});

function nextProduct() {
  const currentProduct = document.querySelector(".products-container.active");
  let nextProduct = currentProduct.nextElementSibling;

  if (!nextProduct || !nextProduct.classList.contains("products-container")) {
    nextProduct = document.querySelector(".products-container:first-of-type");
  }

  // Añadir la clase 'no-scroll' al body para ocultar las barras de desplazamiento
  document.body.classList.add("no-scroll");

  currentProduct.classList.add("exit-left"); // Salida a la izquierda
  nextProduct.classList.add("transitioning"); // Asegura que el nuevo contenedor sea visible

  setTimeout(() => {
    nextProduct.classList.add("enter-right"); // Entrada desde la derecha

    setTimeout(() => {
      currentProduct.classList.remove("active", "exit-left", "transitioning");
      nextProduct.classList.remove("enter-right", "transitioning");
      nextProduct.classList.add("active");

      // Remover la clase 'no-scroll' después de la transición
      document.body.classList.remove("no-scroll");
    }, 500); // Ajusta el tiempo a la duración de la transición
  }, 10);
}

function updateBackground(activeId) {
  const body = document.body;

  // Elimina las clases de fondo existentes
  body.classList.remove("home-bg", "about-us-bg", "products-bg");

  // Añade la clase de fondo correspondiente según la sección activa
  switch (activeId) {
    case "home":
      body.classList.add("home-bg");
      break;
    case "about-us":
      body.classList.add("about-us-bg");
      break;
    case "products":
      body.classList.add("products-bg");
      break;
    default:
      break;
  }
}

const preloadImages = () => {
  const images = ["background-terrabox.png", "background-ralaxy.png"];
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

var componentWhatIsRalaxy = `
<div id="content-que-es" class="content-section">
  <h2>What is TerraBox</h2>
  <p>
    TerraBox es esencial por su capacidad de mejorar 
    significativamente la gestión de residuos, disminuyendo el impacto
    ambiental y fomentando la conciencia ecológica. Este proyecto
    innovador no solo utiliza tecnología avanzada para optimizar
    el
    reciclaje, sino que también involucra a la comunidad através de un
    sistema de incentivos, ofreciendo beneficios económicos y
    adaptándos a diferentes entornos urbanos y rurales, políticas
  locales, y necesidad especificas de gestión de residuos.
  </p>
</div>
`;

var componentApproachRalaxy = `

<div id="content-enfoque-y-abordaje" class="content-section">
<h2>Benefit</h2>
  <p>
    Optimizar la recolección y gestión de materiales reciclables, con
    el fin de mejorar así la eficiencia en la reutilización urbana y
    fom entar la participación ciudadana. Metodología El proyecto se
    enfocará en el diseño, implementación y evaluación del TerraBox
    mediante técnicas de ingeniería y análisis de sostenibilidad. con
    pruebas piloto y recopilación de datos para medir su impacto y
    eficaci
  </p>
</div>`;

var componentProposalRalaxy = `
<div id="content-enfoque-y-abordaje" class="content-section">
  <h1>TERRABOX</h1>
  <h2>Recicla y gana</h2>
  <button id="download-button">Descarga</button>
</div>
`;

var componentWhatIs = `
<div id="content-que-es" class="content-section">
  <h2>What is TerraBox</h2>
  <p>
    TerraBox es esencial por su capacidad de mejorar 
    significativamente la gestión de residuos, disminuyendo el impacto
    ambiental y fomentando la conciencia ecológica. Este proyecto
    innovador no solo utiliza tecnología avanzada para optimizar
    el
    reciclaje, sino que también involucra a la comunidad através de un
    sistema de incentivos, ofreciendo beneficios económicos y
    adaptándos a diferentes entornos urbanos y rurales, políticas
  locales, y necesidad especificas de gestión de residuos.
  </p>
</div>
`;

var componentApproach = `

<div id="content-enfoque-y-abordaje" class="content-section">
<h2>Benefit</h2>
  <p>
    Optimizar la recolección y gestión de materiales reciclables, con
    el fin de mejorar así la eficiencia en la reutilización urbana y
    fom entar la participación ciudadana. Metodología El proyecto se
    enfocará en el diseño, implementación y evaluación del TerraBox
    mediante técnicas de ingeniería y análisis de sostenibilidad. con
    pruebas piloto y recopilación de datos para medir su impacto y
    eficaci
  </p>
</div>`;

var componentProposal = `
<div id="content-enfoque-y-abordaje" class="content-section">
  <h1>TERRABOX</h1>
  <h2>Recicla y gana</h2>
  <button id="download-button">Descarga</button>
</div>
`;

var containerInfo = document.querySelector("#product-content");

function addInfoTerrabox(concept) {
  var currentComponent = "";
  if (concept === "what-is") {
    containerInfo.innerHTML = componentWhatIs;
    currentComponent = document.querySelector(".content-section");
  } else if (concept === "approach") {
    containerInfo.innerHTML = componentApproach;
    currentComponent = document.querySelector(".content-section");
  } else if (concept === "proposal") {
    containerInfo.innerHTML = componentProposal;
    currentComponent = document.querySelector(".content-section");
  }

  setTimeout(() => {
    currentComponent.classList.toggle("active");
  }, 100);
}

function removeInfoTerrabox() {
  containerInfo.innerHTML = "";
}
var containerInfo2 = document.querySelector("#product2 #product-content");
function addInfoRalaxy(concept) {
  var currentComponent = "";
  if (concept === "what-is") {
    containerInfo2.innerHTML = componentWhatIs;
    currentComponent = document.querySelector("#product2 .content-section");
  } else if (concept === "approach") {
    containerInfo2.innerHTML = componentApproach;
    currentComponent = document.querySelector("#product2 .content-section");
  } else if (concept === "proposal") {
    containerInfo2.innerHTML = componentProposal;
    currentComponent = document.querySelector("#product2 .content-section");
  }

  setTimeout(() => {
    currentComponent.classList.toggle("active");
  }, 100);
}

function removeInfoRalaxy() {
  console.log("aaaaaaaa", containerInfo2);
  containerInfo2.innerHTML = "";
}

function transitionInClickMenu() {
  const menuLinks = document.querySelectorAll("nav a");

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      if (this.id !== "nav-about-us") {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

        // Obtener el ID de la sección objetivo desde el atributo href del enlace
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        // Comprobar si la sección objetivo existe
        if (targetSection) {
          // Realizar un scroll suave hacia la sección objetivo
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
}

function updateDownButton(section, hasNextSection) {
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

function EventClickDownButton() {
  const downButton = document.querySelector("#scroll-indicator");
  downButton.addEventListener("click", function () {
    moveToNextSection();
  });
}

function moveToNextSection() {
  // Obtiene todas las secciones
  const sections = Array.from(document.querySelectorAll("section"));
  // Encuentra la sección que está mayormente visible en la ventana
  const currentSectionIndex = sections.findIndex((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight;
  });

  // Si hay una siguiente sección, haz scroll hacia ella
  if (currentSectionIndex !== -1 && currentSectionIndex + 1 < sections.length) {
    sections[currentSectionIndex + 1].scrollIntoView({ behavior: "smooth" });
  }
}
