(function () {
  "use strict";

  let scene, camera, renderer;
  let container,
    aspectRatio,
    HEIGHT,
    WIDTH,
    fieldOfView,
    nearPlane,
    farPlane,
    mouseX,
    mouseY,
    windowHalfX,
    windowHalfY,
    geometry,
    starStuff,
    materialOptions,
    stars;

  init();
  animate();

  function init() {
    container = document.querySelector("#hello");
    container.classList.add("canvas-container");
    document.body.style.overflowX = "hidden";

    HEIGHT = container.clientHeight;
    WIDTH = container.clientWidth;
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 75;
    nearPlane = 1;
    farPlane = 1000;
    mouseX = 0;
    mouseY = 0;
    windowHalfX = WIDTH / 2;
    windowHalfY = HEIGHT / 2;
    camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );

    camera.position.z = farPlane / 2;
    scene = new THREE.Scene({ antialias: true });
    scene.fog = new THREE.FogExp2(0x000000, 0.0003);

    starForge();

    if (webGLSupport()) {
      renderer = new THREE.WebGLRenderer({ alpha: true });
    } else {
      renderer = new THREE.CanvasRenderer();
    }

    renderer.setClearColor(0x000012, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    container.appendChild(renderer.domElement);

    window.addEventListener("resize", onWindowResize, false);
    document.addEventListener("mousemove", onMouseMove, false);
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.005;
    camera.position.y += (mouseY - camera.position.y) * 0.005;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  function webGLSupport() {
    try {
      let canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch (e) {
      return false;
    }
  }

  function onWindowResize() {
    WIDTH = container.clientWidth;
    HEIGHT = container.clientHeight;

    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
    renderer.setSize(WIDTH, HEIGHT);
  }

  function starForge() {
    let starQty = 45000;
    geometry = new THREE.SphereGeometry(1000, 100, 50);

    materialOptions = {
      size: 1.0,
      transparency: true,
      opacity: 0.7,
    };

    starStuff = new THREE.PointCloudMaterial(materialOptions);

    for (let i = 0; i < starQty; i++) {
      let starVertex = new THREE.Vector3();
      starVertex.x = Math.random() * 4000 - 1000;
      starVertex.y = Math.random() * 4000 - 1000;
      starVertex.z = Math.random() * 4000 - 1000;

      geometry.vertices.push(starVertex);
    }

    stars = new THREE.PointCloud(geometry, starStuff);
    scene.add(stars);
  }

  function onMouseMove(e) {
    mouseX = e.clientX - windowHalfX;
    mouseY = e.clientY - windowHalfY;
  }
})();
