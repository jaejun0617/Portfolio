function startAnimations() {
  console.log("Scroll detected!");
  charts.forEach(function (chart) {
    if (
      isElementInViewport(chart) &&
      !chart.classList.contains("animation-started")
    ) {
      chart.style.animationPlayState = "running";
      chart.classList.add("animation-started");
    }
  });
}
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  console.log(rect);
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
