const defaults = {
  speed: 10,
  maxSize: 15,
  minSize: 10,
  newOn: 400,
};

var $wrap = $(".contact__bg");
let wrapH = $wrap.height();
let wrapW = $wrap.width();

const $petal = $('<span class="petal"></span>');

const getRandomRotate = () => {
  const rotateX = 360;
  const rotateY = Math.random() * 60 - 30;
  const rotateZ = Math.random() * 120 - 30;
  const translateX = Math.random() * 10 - 5;
  const translateY = Math.random() * 10 - 10;
  const translateZ = Math.random() * 15;
  return `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`;
};

const randomSwayAnims = [...Array(10)].map(getRandomRotate);

const applySwayAnim = (element) => {
  const randomSway =
    randomSwayAnims[Math.floor(Math.random() * randomSwayAnims.length)];
  element.css("transform", randomSway);
  setTimeout(() => {
    applySwayAnim(element);
  }, 1000);
};

const petalGen = () => {
  setTimeout(requestAnimationFrame, defaults.newOn, petalGen);

  const petal = $petal.clone();
  const size =
    Math.floor(Math.random() * (defaults.maxSize - defaults.minSize + 1)) +
    defaults.minSize;
  const startPosLeft = Math.random() * wrapW;
  const fallTime = (wrapH * 0.1 + Math.random() * 5) / defaults.speed;
  const horizontalOffset = Math.random() * 2 - 1;

  petal
    .on("animationend", () => {
      petal.remove();
    })
    .css({
      width: size,
      height: size,
      left: startPosLeft,
      position: "absolute",
      animation: `fall ${fallTime}s linear`,
    })
    .appendTo($wrap);

  const updatePos = () => {
    petal.css("left", `+=${horizontalOffset}`);
    requestAnimationFrame(updatePos);
  };

  updatePos();
  applySwayAnim(petal);
};

$(window).resize(() => {
  wrapH = $wrap.height();
  wrapW = $wrap.width();
});

$(window).on("load", () => {
  requestAnimationFrame(petalGen);
});
