document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".important__menu button");
  const sections = ["#hello", "#about", "#skill", "#project", "#contact"];

  function changeMenuItemColor() {
    let currentSection = "";

    sections.forEach((section) => {
      const element = document.querySelector(section);
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;

      if (
        elementTop <= window.innerHeight / 2 &&
        elementBottom >= window.innerHeight / 2
      ) {
        currentSection = section;
      }
    });

    if (currentSection === "#hello") {
      menuItems.forEach((menuItem) => {
        menuItem.style.color = "#fff";
      });
    } else {
      menuItems.forEach((menuItem) => {
        menuItem.style.color = "#000";
      });
    }
  }

  window.addEventListener("scroll", changeMenuItemColor);
  changeMenuItemColor();
});
