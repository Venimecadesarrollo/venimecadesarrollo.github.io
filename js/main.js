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

let logoAnimetionLoaded = false;
function updateNavigation(activeId) {
  console.log(activeId)
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === `#${activeId}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  if(activeId === "home"){
    logoHeader.classList.add("hidden");
  }

  if (activeId !== "home") {
    if (!isTransitioning) {
      header.classList.add("not-home");
      if (previusSection === "home" && !logoAnimetionLoaded) {
        if (homeLogo && !logoContainer.contains(homeLogo)) {
          animateLogoToHeader();
        }
      }
    }
    if(logoAnimetionLoaded){
      setTimeout(() => {
        logoHeader.classList.remove("hidden");
      }, 250);
    }
  } else {
    if (isTransitioning) {
      stopTransition();
    }
    if(!logoAnimetionLoaded){
      homeLogo.classList.remove("center-logo-home");
      homeLogo.classList.add("center-logo");
      headerLogo.classList.add("hidden");
    }
    header.classList.remove("not-home");
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
  if (activeId === "contact") {
    //document.body.classList.add("auto-height");
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
          logoAnimetionLoaded = true;
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
<span><img src="assets/icons/location.svg" alt="icon-location"></span>
<div>
  <strong>Address:</strong> Avinguda Diagonal 328, número 3-3, 08013, Barcelona, Spain
</div>
<span><img src="assets/icons/call.svg" alt="icon-call"></span>
<div><strong>Phone:</strong> (+34) 624.91.27.72</div>
<span><img src="assets/icons/call.svg" alt="icon-call"></span>
<div><strong>Phone:</strong> (+58) 414-7819521</div>
<span><img src="assets/icons/mail.svg" alt="icon-mail"></span>
<div><strong>Email:</strong> management@visenergycorp.com</div>
<span><img src="assets/icons/mail.svg" alt="icon-mail2"></span>
<div><strong>Email:</strong> contacto@visenergycorp.com</div>
`;

var contentContactForm = `
<h2>Get in touch</h2>
<form>
<input
  type="text"
  placeholder="Full Name"
  name="name"
  id="full-name"

/>
<input
  type="email"
  placeholder="Email Address"
  name="email"
  id="email"

/>
<input type="text" placeholder="Subject" name="subject"/>
<textarea
  placeholder="Message"
  name="message"
  id="message"
></textarea>
<button type="submit">Send Message</button>
</form>
`;

function sendDataForEmail(data) {
  fetch(
    "https://script.google.com/macros/s/AKfycbyAl_Q_lA5PCb4YSldOMqVVHVF5TXuYHPu5FNKX1CF2FQ_GJHLy9FOFBJd45ro9_GSNEw/exec",
    {
      method: "POST",
      body: data,
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud.");
      }
      return response.json();
    })
    .then((data) => {
      openModal(successModal);
    })
    .catch((error) => {
      openModal(errorModal);
    });
}

function EventSendEmail(e, form) {
  var formData = new FormData(form);
  sendDataForEmail(formData);
  form.reset();
}

window.onload = function () {
  const loaderContainer = document.querySelector("#loader-container");
  loaderContainer.style.opacity = '0'; 
  setTimeout(() => {
    loaderContainer.style.display = 'none';
    document.body.classList.remove("loading");
  }, 1000);
};

document.addEventListener("DOMContentLoaded", function () {

  preloadImages();
  setupSectionObserver();
  transitionInClickMenu();
  EventClickDownButton();
  updateBackground();
  checkWidth();

  var form = document.querySelector(".contact-form form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    EventSendEmail(e, this);
  });

  var contactInfo = document.querySelector(".contact-info");

  var switchContact = document.querySelector("#mySwitch");
  switchContact.addEventListener("change", function () {
    if (this.checked) {
      removeAllExceptSwitch("contact-info");
      contactInfo.classList.add("contact-formJs");
      contactInfo.classList.remove("contact-info");
      addNewChildren(contentContactForm, "contact-formJs");

      var form = document.querySelector(".contact-formJs form");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        EventSendEmail(e, this);
      });
    } else {
      removeAllExceptSwitch("contact-formJs");
      contactInfo.classList.remove("contact-formJs");
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
  handleScrollAndGestures();
});

function handleScrollAndGestures() {
  const sections = Array.from(document.querySelectorAll("section"));
  let currentSectionIndex = 0;
  let isScrolling = false;

  // Crear un nuevo objeto Hammer en el body
  const hammer = new Hammer(document.body);

  // Configurar Hammer para detectar deslizamientos verticales
  hammer.get("swipe").set({ direction: Hammer.DIRECTION_VERTICAL });

  // Función para desplazarse a la sección actual
  function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({ behavior: "smooth" });
      currentSectionIndex = index;
    }
  }

  // Manejar eventos de deslizamiento
  hammer.on("swipeup swipedown", function (ev) {
    if (ev.type === "swipeup") {
      if (currentSectionIndex < sections.length - 1) {
        scrollToSection(currentSectionIndex + 1);
      }
    } else if (ev.type === "swipedown") {
      if (currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1);
      }
    }
  });

  // Manejar eventos de scroll del ratón en PC
  window.addEventListener("wheel", function (event) {
    if (isScrolling) return;
    isScrolling = true;
    if (event.deltaY > 0) {
      if (currentSectionIndex < sections.length - 1) {
        scrollToSection(currentSectionIndex + 1);
      }
    } else {
      if (currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1);
      }
    }

    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  });
}

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
<div class="new-content-section">
  <h2><span class="accent-color-ralaxy">What is Ralaxy</span></h2>
  <p>
  Ralaxy is a system with the potential to revolutionize road safety by enhancing
  the visibility of signage on streets, avenues, highways, and roads.
  <br>
  Its solar-powered bioluminescence technology represents a
  significant breakthrough.
  Ralaxy for the advancement of vehicular traffic worldwide.
  </p>
</div>
`;

var componentApproachRalaxy = `

<div class="new-content-section">
<h2><span class="accent-color-ralaxy">Focus</span></h2>
  <p>
  Develop and implement an advanced road signaling
system, using bioluminescence and solar charging
technology to improve visibility and safety on traffic routes.
<br>
<br>
<span class="accent-color-ralaxy"> • Research and Development: </span> Carry out studies to
optimize the combination of bioluminescence and solar charging
technologies in traffic paints.
<br>
<br>
<span class="accent-color-ralaxy">• Pilot Tests:</span>
Implement tests in different conditions
and environments to evaluate the effectiveness and durability
of the signage.
<br>
<br>
<span class="accent-color-ralaxy">•Collaboration with Experts:</span> Work with specialists
in materials, solar energy and road safety to perfect the
product.
<br>
<br>
<span class="accent-color-ralaxy">• Production and Distribution:</span> Establish
production processes. In alliance with efficient
Venezuelan paint production companies and a distribution
network to supply paint to government entities
and road construction companies.
  </p>
</div>`;

var componentAddedValueRalaxy = `

<div class="new-content-section">
<h2><span class="accent-color-ralaxy">Added value</span></h2>
<p>
<span class="accent-color-ralaxy">• Improved Road Safety:</span> Significant increase in
visibility of signs, reducing the risk of accidents.<br><br>
<span class="accent-color-ralaxy">• Sustainability:</span> Use of solar energy and bioluminescence,
minimizing environmental impact.
<br>
<br>
<span class="accent-color-ralaxy">• Energy Efficiency: </span>Reduction in energy consumption
thanks to solar charging and induction by vehicular traffic.
<br>
<br>
<span class="accent-color-ralaxy">• Technological Innovation:</span> Application of cutting-edge technology=
in bioluminescence and renewable energies.
<br>
<br>
<span class="accent-color-ralaxy">• Adaptability:</span> System applicable in various environments
and climatic conditions.
<br>
<br>
<span class="accent-color-ralaxy">• Environmental Awareness:</span> Promotion of green and
sustainable technologies.
</p>
</div>`;


var componentProposalRalaxy = `
<img src="images/ralaxy-logo.svg" alt="" class="logo-ralaxy"/>
<h3 class="">Innovation and road safety</h3>
<button class="download-button" id="contact-us-btn">
  Contact us
</button>
`;

var componentWhatIs = `
<div class="new-content-section">
  <h2><span class="accent-color-terrabox">What is TerraBox</span></h2>
  <p>
  TerraBox is essential for its ability to significantly improve waste
  management, reducing environmental impact and promoting ecological awareness.
  <br><br>
  This innovative project not only uses advanced technology to optimize recycling
  but also engages the community through an incentive system, offering economic
  benefits and adapting to different urban and rural environments, local policies,
  and specific waste management needs.
  </p>
</div>
`;

var componentApproach = `

<div class="new-content-section">
<h2><span class="accent-color-terrabox">Focus</span></h2>
  <p>
  Optimize the collection and management of recyclable materials, in order to improve the efficiency of urban reuse
  and encourage citizen participation. <br><br>
  The project's methodology will focus on the design, implementation, and evaluation of TerraBox using
  engineering techniques and sustainability analysis. Pilot testing and data collection will be conducted
  to measure its impact and effectiveness.
  </p>
</div>`;

var componentAddedValue = `

<div class="new-content-section">
<h2><span class="accent-color-terrabox">Added value</span></h2>
  <p>
  <span class="accent-color-terrabox">• Citizen Participation:</span> Encourages community involvement through incentives.
  <br>
  <br>
<span class="accent-color-terrabox">• Efficiency in waste management:</span>
Improves collection and processing of recyclable materials<br><br>
<span class="accent-color-terrabox">• Reduction of environmental impact:</span>
Reduces pollution and the accumulation of landfills<br><br>
<span class="accent-color-terrabox">• Ecological Awareness:</span>
Raise awareness and education about recycling and sustainability.<br><br>
<span class="accent-color-terrabox">• Sustainability and employment:</span>
Promote sustainable practices and create job opportunities<br><br>
<span class="accent-color-terrabox">• Adaptability:</span>
Adjusts to different contexts and local needs.<br>
  </p>
</div>`;

var componentProposal = `
<img src="images/terrabox-logo.svg" alt="" class="logo-terrabox" />
<h3 class=''><span class="accent-color-terrabox">Recycle and Earn</span></h3>
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
  if (concept === "what-is-terrabox") {
    newContainerInfo.innerHTML = componentWhatIs;
    currentComponent = document.querySelector(".new-content-section");
  } else if (concept === "approach-terrabox") {
    newContainerInfo.innerHTML = componentApproach;
    currentComponent = document.querySelector(".new-content-section");
  } else if (concept === "added-value-terrabox") {
    newContainerInfo.innerHTML = componentAddedValue;
    currentComponent = document.querySelector(".new-content-section");
  } else if (concept === "proposal-terrabox") {
    newContainerInfo.innerHTML = componentProposal;
    checkWidth(true);
    var children = newContainerInfo.querySelectorAll("*");
    currentComponent = document.querySelector(".logo-product");
  }
  checkWidthAndAddStyleInfo(currentComponent);
  var width = window.innerWidth;
  var height = window.innerHeight;

  if (height >= width && width <= 600 && concept != "proposal-terrabox") {
    removeImageProductForInfo();
  }
  if (height >= width && width <= 600 && concept == "proposal-terrabox") {
    addImageProductForInfo();
  }

  setTimeout(() => {
    if (children) {
      if (children.length > 0) {
        for (let i = 0; i < children.length; i++) {
          children[i].classList.add("active");
        }
      }
    }

    currentComponent.classList.add("active");
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

  var width = window.innerWidth;
  var height = window.innerHeight;

  if ((height >= width && width <= 600) && (concept != "approach-ralaxy" && concept != "added-value-ralaxy")) {
    addImageProductRalaxy();
  }
  if ((height >= width && width <= 600) && (concept === "approach-ralaxy" || concept === "added-value-ralaxy")) {
    removeImageProductRalaxy();
  }


  var currentComponent = "";
  if (concept === "what-is-ralaxy") {
    newContainerInfo2.innerHTML = componentWhatIsRalaxy;
    currentComponent = document.querySelector(
      "#product2 .logo-product .new-content-section"
    );
  } else if (concept === "approach-ralaxy") {
    newContainerInfo2.innerHTML = componentApproachRalaxy;
    currentComponent = document.querySelector(
      "#product2 .logo-product .new-content-section"
    );
  } else if (concept === "added-value-ralaxy") {
    newContainerInfo2.innerHTML = componentAddedValueRalaxy;
    currentComponent = document.querySelector(
      "#product2 .logo-product .new-content-section"
    );
  } else if (concept === "proposal-ralaxy") {
    newContainerInfo2.innerHTML = componentProposalRalaxy;
    var children = newContainerInfo2.querySelectorAll("*");
    currentComponent = document.querySelector(
      "#product2 .logo-product"
    );
  }

  setTimeout(() => {
    
    if (children) {
      if (children.length > 0) {
        for (let i = 0; i < children.length; i++) {
          
          children[i].classList.add("active");
        }
      }
    }
    currentComponent.classList.add("active");
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
        event.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
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
  
  var contactForm = document.querySelector(".contact-form");
  if (height >= width && width <= 800) {
    
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
    
    container.classList.add("info-vertical");
  }
}
function removeStyleInfoProduct(currentComponent) {
  var container = currentComponent;
  if (container) {
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

function addImageProductRalaxy() {
  var imageProductComplete = document.getElementById("image-ralaxy");
  

  if (!imageProductComplete) {
    
    var container = document.querySelector('#product2 .image-product-container')

    imageProductComplete = document.createElement("img");
    imageProductComplete.id = "image-ralaxy";
    imageProductComplete.src = "images/t5.png";
    imageProductComplete.classList.add('image-product-ralaxy')
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

function removeImageProductRalaxy() {
  var imageProductComplete = document.getElementById("image-ralaxy");
  
  if (imageProductComplete) {
    var container = imageProductComplete.parentNode;
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
};

closeError.onclick = function () {
  closeModal(errorModal);
};

function openModal(modal) {
  modal.style.display = "block";
}

function closeModal(modal) {
  modal.style.display = "none";
}
