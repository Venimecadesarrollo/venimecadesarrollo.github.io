function transitionInClickMenu() {
  const menuLinks = document.querySelectorAll("nav a");

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      if (burguerHeader.classList.contains("nav-open")) {
        burguerHeader.classList.remove("nav-open");
        navMenu.classList.remove("nav-burguer");
      }
    });
  });
}

var burguerHeader = document.querySelector("header");
var navMenu = document.querySelector("nav");

document.addEventListener("DOMContentLoaded", function () {
  transitionInClickMenu();
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
});
