const buttons = document.querySelectorAll("button");
for (const button of buttons) {
  button.addEventListener("click", function () {
    const scrollPosition = document.querySelector(
      this.dataset.target
    ).offsetTop;

    window.scrollTo({ top: scrollPosition, behavior: "smooth" });
  });
}

document.querySelector(".mouse-icon").addEventListener("click", function () {
  document.querySelector("#about").scrollIntoView({
    behavior: "smooth",
  });
});
