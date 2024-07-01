let btn = document.getElementById("back-to-top"),
  docElem = document.documentElement,
  offset,
  scrollPos,
  docHeight;

docHeight = Math.max(docElem.offsetHeight, docElem.scrollHeight);

if (docHeight != "undefined") {
  offset = docHeight / 4;
}

window.addEventListener("scroll", function () {
  scrollPos = docElem.scrollTop;
  console.log(scrollPos);

  btn.className = scrollPos > offset ? "visible" : "";
});

btn.addEventListener("click", function (ev) {
  ev.preventDefault();

  scrollToTop();
});
function scrollToTop() {
  let scrollInterval = setInterval(function () {
    if (scrollPos != 0) {
      window.scrollBy(0, -300);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
}
