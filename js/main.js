let isTransitioning = false;

function setupSectionObserver() {
  const sections = Array.from(document.querySelectorAll("section"));
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentIndex = sections.indexOf(entry.target);
        const hasNextSection = currentIndex < sections.length - 1;
        const hasPreviousSection = currentIndex > 0;

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

const productSection = document.getElementById("products");
productSection.addEventListener("click", () => {
  clearInterval(productInterval); // Detiene la ejecución de nextProduct()
  productInterval = null; // Limpia la variable del intervalo
});
let productInterval;
const navLinks = document.querySelectorAll("nav a");
const logoContainer = document.getElementById("logo-container");
const homeLogoContainer = document.querySelector("#home .logo");
const homeLogo = homeLogoContainer
  ? homeLogoContainer.querySelector("img")
  : null;
const header = document.querySelector("header");
const logoHome = document.querySelector("#home .logo img");
const logoHeader = document.querySelector("#logo-container img");
var previusSection = "home";
function updateNavigation(activeId) {
  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${activeId}`
    );
  });

  if (activeId !== "home") {
    if (!isTransitioning) {
      header.classList.add("not-home");
      if (previusSection === "home") {
        if (homeLogo && !logoContainer.contains(homeLogo)) {
          animateLogoToHeader();
        }
      }
    }
  } else {
    if (isTransitioning) {
      stopTransition();
    }
    homeLogo.classList.remove("center-logo-home");
    homeLogo.classList.add("center-logo");
    header.classList.remove("not-home");
    headerLogo.classList.add("hidden");
  }
  previusSection = activeId;
  if (activeId === "products" && !productInterval) {
    productInterval = setInterval(() => {
      nextProduct();
    }, 4000);
  } else {
    clearInterval(productInterval);
    productInterval = null;
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
    isTransitioning = true;
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
          isTransitioning = false;
        }, 300);
      }, 500);
    }, 100);
  }
}

function stopTransition() {
  isTransitioning = false;
  homeLogo.style.transform = "";
  homeLogo.style.opacity = "";
}

var burguerHeader = document.querySelector("header");
var navMenu = document.querySelector("nav");

var contentContactInfo = `
<h2>Let's get in touch</h2>
<p>We're open for any suggestion or just to have a chat</p>
<span class="material-symbols-outlined"> location_on </span>
<div>
  <strong>Address:</strong> Rúa Da Cruz Da Nogueira 13-B. Santiago de
  Compostela - A Coruña, 15702, Spain.
</div>
<span class="material-symbols-outlined"> call </span>
<div><strong>Phone:</strong> (+34) 624.91.27.72</div>
<span class="material-symbols-outlined"> call </span>
<div><strong>Phone:</strong> (+58) 414-7819521</div>
<span class="material-symbols-outlined"> mail </span>
<div><strong>Email:</strong> management@visenergycorp.com</div>
<span class="material-symbols-outlined"> mail </span>
<div><strong>Email:</strong> contacto@visenergycorp.com</div>
`;

var contentContactForm = `
<h2>Get in touch</h2>
<input
  type="text"
  placeholder="Fulles"
  name=""
  id=""

/>
<input
  type="email"
  placeholder="Escribe"
  name="mailito"

/>
<input type="text" placeholder="Subject" name="subject"/>
<textarea
  placeholder="Message"
  name="message"
  id="message"
></textarea>
<button type="submit">Send Message</button>

`;

function sendDataForEmail(data) {
  fetch('https://script.google.com/macros/s/AKfycbyAl_Q_lA5PCb4YSldOMqVVHVF5TXuYHPu5FNKX1CF2FQ_GJHLy9FOFBJd45ro9_GSNEw/exec', {
    
      method: 'POST',
      body: data,
  })
      .then(response => {
          if (!response.ok) {
              throw new Error('Error en la solicitud.');
          }
          return response.json();
      })
      .then(data => {
          openModal(successModal);
      })
      .catch(error => {
          console.error('Error:', error);
          openModal(errorModal);
      });
}
		
function EventSendEmail(e, form) {
  var formData = new FormData(form);
  //sendDataForEmail(formData);
  form.reset();
}

document.addEventListener("DOMContentLoaded", function () {
  preloadImages();
  setupSectionObserver();
  transitionInClickMenu();
  EventClickDownButton();
  updateBackground();
  checkWidth();

  var form = document.querySelector('form:not([class*="hidden="])');
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    EventSendEmail(e, this);
  });

  var contactInfo = document.querySelector(".contact-info");

  var switchContact = document.querySelector("#mySwitch");
  switchContact.addEventListener("change", function () {
    if (this.checked) {
      //removeAllExceptSwitch("contact-info");
      contactInfo.classList.add("contact-form");
      contactInfo.classList.remove("contact-info");
      addNewChildren(contentContactForm, "contact-form");

      var form = document.querySelector('form:not([class*="hidden="])');
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        EventSendEmail(e, this);
      });
    } else {
      removeAllExceptSwitch("contact-form");
      contactInfo.classList.remove("contact-form");
      contactInfo.classList.add("contact-info");
      addNewChildren(contentContactInfo, "contact-info");
    }
  });

  var burguerMenu = document.getElementById("hamburguer-menu-btn");
  burguerMenu.addEventListener("click", function (e) {
    if (burguerHeader.classList.contains("nav-open")) {
      burguerHeader.classList.remove("nav-open");
      navMenu.classList.remove("nav-burguer");
    } else {
      navMenu.classList.add("nav-burguer");
      burguerHeader.classList.add("nav-open");
    }
  });

  var buttonContactRalaxy = document.getElementById("contact-us-btn");

  var contactUsSection = document.getElementById("contact");

  buttonContactRalaxy.addEventListener("click", function (e) {
    contactUsSection.scrollIntoView({ behavior: "smooth" });
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var currentComponent = document.querySelector(".logo-product");

      if (currentComponent.childNodes.length > 0) {
        removeInfoTerrabox();
      }

      addInfoTerrabox(this.id);
    });
  });
  document.querySelectorAll(".nav-link-2").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      var currentComponent = document.querySelector(
        "#product2 .content-section"
      );

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

  window.addEventListener("resize", checkWidth);
});

function nextProduct() {
  const currentProduct = document.querySelector(".cont-prod.active");
  let nextProduct = currentProduct.nextElementSibling;

  if (!nextProduct || !nextProduct.classList.contains("cont-prod")) {
    nextProduct = document.querySelector(".cont-prod:first-of-type");
  }

  //document.body.classList.add("no-scroll");

  currentProduct.classList.add("exit-left"); // Salida a la izquierda
  nextProduct.classList.add("transitioning"); // Asegura que el nuevo contenedor sea visible

  setTimeout(() => {
    nextProduct.classList.add("enter-right"); // Entrada desde la derecha
    //
    setTimeout(() => {
      currentProduct.classList.remove("active", "exit-left", "transitioning");
      nextProduct.classList.remove("enter-right", "transitioning");
      nextProduct.classList.add("active");
      //
      //    // Remover la clase 'no-scroll' después de la transición
      //    document.body.classList.remove("no-scroll");
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
  const images = [
    "images/background-terrabox.png",
    "images/background-ralaxy.png",
  ];
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

var componentWhatIsRalaxy = `
<div id="content-que-es" class="new-content-section">
  <h2>What is Ralaxy</h2>
  <p>
    Ralaxy es un sistem a potencial
    para revolucionar la seguridad
    vial m ediante la 
    vial m ediante la m ejora de la
    visibilidad de señalizaciones
    en calles, avenidas, autopistas 
    y carreteras. Su tecnología de
    biolum iniscencia a través de la 
    carga solar representa un
    avance significativo. Ralaxy por
    la evolución del transito
    vehicular en el m undo.
  </p>
</div>
`;

var componentApproachRalaxy = `

<div id="content-enfoque-y-abordaje" class="new-content-section">
<h2>Benefit</h2>
  <p>
  Desarrollar e implementar un sistema de señalización vial
  avanzado, utilizando la tecnología de bioluminiscencia y carga
  solar para mejorar la visibilidad y seguridad en las vías de tráfico.
  </p>
</div>`;

var componentProposalRalaxy = `
<img src="images/ralaxy-logo.svg" alt="" class="logo-ralaxy"/>
<h3 class="">Innovación y seguridad vial</h3>
<button class="download-button" id="contact-us-btn">
  Contact us
</button>
`;

var componentWhatIs = `
<div id="content-que-es" class="new-content-section">
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

<div id="content-enfoque-y-abordaje" class="new-content-section">
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
<img src="images/terrabox-logo.svg" alt="" class="logo-terrabox" />
<h3 class=''>Recicla y Gana</h3>
<img
  id="googleplay"
  class="appstore-icon"
  src="images/googleplay.svg"
  alt="google play"
/>
<img
  id="applestore"
  class="appstore-icon"
  src="images/Group1.svg"
  alt="apple store"
/>
`;

var containerInfo = document.querySelector("#product-content");
var newContainerInfo = document.querySelector(".logo-product");

function addInfoTerrabox(concept) {
  var currentComponent = "";
  if (concept === "what-is") {
    newContainerInfo.innerHTML = componentWhatIs;
    currentComponent = document.querySelector(".new-content-section");
  } else if (concept === "approach") {
    newContainerInfo.innerHTML = componentApproach;
    currentComponent = document.querySelector(".new-content-section");
  } else if (concept === "proposal") {
    newContainerInfo.innerHTML = componentProposal;
    checkWidth(true);
    var children = newContainerInfo.querySelectorAll("*");
  }
  checkWidthAndAddStyleInfo(currentComponent);
  var width = window.innerWidth;
  var height = window.innerHeight;

  if (height >= width && width <= 600 && concept != "proposal") {
    removeImageProductForInfo();
  }
  if (height >= width && width <= 600 && concept == "proposal") {
    addImageProductForInfo();
  }

  setTimeout(() => {
    if (children) {
      if (children.length > 0) {
        for (let i = 0; i < children.length; i++) {
          children[i].classList.toggle("active");
        }
      }
    }
    currentComponent.classList.toggle("active");
  }, 100);
}

function removeImageProductForInfo() {
  document.querySelector(".image-product-container").classList.add("hidden");
}

function addImageProductForInfo() {
  document.querySelector(".image-product-container").classList.remove("hidden");
}

function removeInfoTerrabox() {
  newContainerInfo.innerHTML = "";
}
var containerInfo2 = document.querySelector("#product2 #product-content");
var newContainerInfo2 = document.querySelector("#product2 .logo-product");
function addInfoRalaxy(concept) {
  var currentComponent = "";
  if (concept === "what-is") {
    newContainerInfo2.innerHTML = componentWhatIsRalaxy;
    currentComponent = document.querySelector(
      "#product2 .logo-product .new-content-section"
    );
  } else if (concept === "approach") {
    newContainerInfo2.innerHTML = componentApproachRalaxy;
    currentComponent = document.querySelector(
      "#product2 .logo-product .new-content-section"
    );
  } else if (concept === "proposal") {
    newContainerInfo2.innerHTML = componentProposalRalaxy;
    var children = newContainerInfo2.querySelectorAll("*");
  }

  setTimeout(() => {
    console.log(children);
    if (children) {
      if (children.length > 0) {
        for (let i = 0; i < children.length; i++) {
          console.log(children[i]);
          children[i].classList.add("active");
        }
      }
    }
    currentComponent.classList.toggle("active");
  }, 100);
}

function removeInfoRalaxy() {
  containerInfo2.innerHTML = "";
}

function transitionInClickMenu() {
  const menuLinks = document.querySelectorAll("nav a");

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      if (burguerHeader.classList.contains("nav-open")) {
        burguerHeader.classList.remove("nav-open");
        navMenu.classList.remove("nav-burguer");
      }

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

function checkWidth(ifForDonwloadDesktopButton) {
  var width = window.innerWidth;
  var height = window.innerHeight;
  console.log(width);
  var contactForm = document.querySelector(".contact-form");
  if (height >= width && width <= 800) {
    console.log(width);
    contactForm.classList.add("hidden");
  } else {
    contactForm.classList.remove("hidden");
  }

  if (ifForDonwloadDesktopButton) {
    if (width >= height && width >= 500) {
      addClassDesktop();
    }
  } else {
    if (height >= width && width >= 500) {
      addImageProduct();
      addStyleInfoProduct();
    } else {
      removeImageProduct();
      removeStyleInfoProduct();
    }

    if (height >= width && width <= 500) {
      addImageProductSingle();
      addStyleInfoProduct();
    } else {
      removeImageProductSingle();
      removeStyleInfoProduct();
    }

    if (height >= width && width >= 500) {
      addClassTall();
    } else {
      removeClassTall();
    }

    if (width >= height && width >= 500) {
      addImageProduct();
      addClassDesktop();
    } else {
      removeClassDesktop();
    }

    if (width >= height && width <= 500) {
      addClassTall();
    } else {
      removeClassTall();
    }
  }
  var heightCondition = width - height;
  heightCondition = Math.abs(heightCondition);
  var imageRalaxy = document.querySelector("#image-ralaxy");
  if (width >= height && heightCondition >= 400) {
    imageRalaxy.classList.add("ralaxy-image-complete");
  }

  if (height >= width && heightCondition <= 300) {
    console.log("haaaa", heightCondition);
    imageRalaxy.src = "images/t5.png";
  } else {
    imageRalaxy.src = "images/ralaxy-1-600.svg";
  }
}

function checkWidthAndAddStyleInfo(currentComponent) {
  var width = window.innerWidth;
  var height = window.innerHeight;

  if (height >= width) {
    addStyleInfoProduct(currentComponent);
  } else {
    removeStyleInfoProduct(currentComponent);
  }
}

function addStyleInfoProduct(currentComponent) {
  //var container = document.querySelector('.new-content-section')
  var container = currentComponent;
  if (container) {
    console.log(container);
    container.classList.add("info-vertical");
  }
}
function removeStyleInfoProduct(currentComponent) {
  //var container = document.querySelector('.new-content-section')
  var container = currentComponent;
  if (container) {
    console.log("xxxxxxxx");
    container.classList.remove("info-vertical");
  }
}

function addClassDesktop() {
  var imageProductContainer = document.querySelectorAll(
    ".image-product-container"
  );
  imageProductContainer.forEach(function (imageProductContainer) {
    imageProductContainer.classList.add("desktop");
  });

  document.querySelector(".secondary-navbar").classList.add("desktop");

  document.querySelector(".secondary-navbar-2").classList.add("desktop");

  var logoProduct = document.querySelectorAll(".logo-product");
  logoProduct.forEach(function (logoProduct) {
    logoProduct.classList.add("desktop");
  });

  document.querySelector(".logo-terrabox").classList.add("desktop");
  document.querySelector(".logo-ralaxy").classList.add("desktop");

  var h3LogoProduct = document.querySelectorAll(".logo-product h3");
  h3LogoProduct.forEach(function (h3LogoProduct) {
    console.log(h3LogoProduct);
    h3LogoProduct.classList.add("desktop");
  });

  document.querySelector("#googleplay").classList.add("desktop");

  document.querySelector(".appstore-icon").classList.add("desktop");

  document.querySelector("#applestore").classList.add("desktop");

  var imageProductContainer = document.querySelectorAll(
    ".new-content-product .image-product-container"
  );
  imageProductContainer.forEach(function (imageProductContainer) {
    imageProductContainer.classList.add("desktop");
  });

  var newContentProduct = document.querySelectorAll(".new-content-product");
  newContentProduct.forEach(function (newContentProduct) {
    newContentProduct.classList.add("desktop");
  });

  var completeProduct = document.getElementById("image-product-complete");
  if (completeProduct) {
    completeProduct.classList.add("desktop");
  }
}

function removeClassDesktop() {
  var imageProductContainer = document.querySelectorAll(
    ".image-product-container"
  );
  imageProductContainer.forEach(function (imageProductContainer) {
    imageProductContainer.classList.remove("desktop");
  });

  document.querySelector(".secondary-navbar").classList.remove("desktop");

  document.querySelector(".secondary-navbar-2").classList.remove("desktop");

  var logoProduct = document.querySelectorAll(".logo-product");
  logoProduct.forEach(function (logoProduct) {
    logoProduct.classList.remove("desktop");
  });

  document.querySelector(".logo-terrabox").classList.remove("desktop");
  document.querySelector(".logo-ralaxy").classList.remove("desktop");

  var h3LogoProduct = document.querySelectorAll(".logo-product h3");
  h3LogoProduct.forEach(function (h3LogoProduct) {
    h3LogoProduct.classList.remove("desktop");
  });

  document.querySelector("#googleplay").classList.remove("desktop");

  document.querySelector(".appstore-icon").classList.remove("desktop");

  document.querySelector("#applestore").classList.remove("desktop");

  var imageProductContainer = document.querySelectorAll(
    ".new-content-product .image-product-container"
  );
  imageProductContainer.forEach(function (imageProductContainer) {
    imageProductContainer.classList.remove("desktop");
  });

  var newContentProduct = document.querySelectorAll(".new-content-product");
  newContentProduct.forEach(function (newContentProduct) {
    newContentProduct.classList.remove("desktop");
  });

  var completeProduct = document.getElementById("image-product-complete");
  if (completeProduct) {
    completeProduct.classList.remove("desktop");
  }
}

function addClassTall() {
  document.querySelector(".image-product-container").classList.add("tall");

  document.querySelector(".logo-product").classList.add("tall");

  document.querySelector(".new-content-product").classList.add("tall");
}

function removeClassTall() {
  document.querySelector(".image-product-container").classList.remove("tall");

  document.querySelector(".logo-product").classList.remove("tall");

  document.querySelector(".new-content-product").classList.remove("tall");
}

function addImageProductSingle() {
  var container = document.querySelector(".image-product-container");

  var imageProductSingle = document.createElement("img");
  imageProductSingle.id = "image-product-single";
  imageProductSingle.src = "images/app-terrabox.svg";
  imageProductSingle.classList.add("image-product-app");
  container.appendChild(imageProductSingle);
}
function addImageProduct() {
  var imageProductComplete = document.getElementById("image-product-complete");

  if (!imageProductComplete) {
    var container = document.querySelector(".image-product-container");

    imageProductComplete = document.createElement("img");
    imageProductComplete.id = "image-product-complete";
    imageProductComplete.src = "images/terrabox-1.svg";
    container.appendChild(imageProductComplete);
  }
}

function removeImageProduct() {
  var imageProductComplete = document.getElementById("image-product-complete");
  var container = document.querySelector(".image-product-container");
  if (imageProductComplete) {
    container.removeChild(imageProductComplete);
  }
}

function removeImageProductSingle() {
  var imageProductSingle = document.getElementById("image-product-single");
  var container = document.querySelector(".image-product-container");
  if (imageProductSingle) {
    imageProductSingle.removeChild(imageProductComplete);
  }
}

function removeAllExceptSwitch(parentId) {
  const parent = document.querySelector("." + parentId);
  const switchElement = document.getElementById("mySwitch").closest(".switch");

  const children = Array.from(parent.children);

  children.forEach((child) => {
    if (child !== switchElement) {
      parent.removeChild(child);
    }
  });
}

function addNewChildren(elements, parentId) {
  const parent = document.querySelector("." + parentId);

  const tempContainer = document.createElement("div");
  tempContainer.innerHTML = elements;

  while (tempContainer.firstElementChild) {
    const newChild = tempContainer.firstElementChild;
    parent.appendChild(newChild);
  }
}




/*-- Modal --*/

var successModal = document.getElementById("successModal");
var errorModal = document.getElementById("errorModal");


var closeSuccess = document.querySelector("#successModal .close");
var closeError = document.querySelector("#errorModal .close");


closeSuccess.onclick = function () {
    closeModal(successModal);
}

closeError.onclick = function () {
    closeModal(errorModal);
}

function openModal(modal) {
    modal.style.display = "block";
}

function closeModal(modal) {
    modal.style.display = "none";
}