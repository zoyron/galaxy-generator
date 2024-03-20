import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();
gui.close();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Galaxy
 */
const parameters = {};
parameters.count = 2000;
parameters.size = 0.05;
parameters.radius = 5;
parameters.branches = 3;
parameters.spin = 1;

let geometry = null;
let positions = null;
let material = null;
let particles = null;

const generateGalaxy = () => {
  // destroy old galaxy
  if(particles != null){
    geometry.dispose();
    material.dispose();
    scene.remove(particles);
  }


  geometry = new THREE.BufferGeometry();
  positions = new Float32Array(parameters.count * 3);

  // filling up the co-ordinates of the particles of the geometry
  for (let i = 0; i < parameters.count ; i++) {
    const i3 = i*3;

    const radius = Math.random() * parameters.radius;
    const branchesAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;


    positions[i3] = Math.cos(branchesAngle) * radius;
    positions[i3+1] = Math.random();
    positions[i3+2] = Math.sin(branchesAngle) * radius;
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  // creating the material for the geometry
  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  // creating the particles
  particles = new THREE.Points(geometry, material);
  scene.add(particles);
};
generateGalaxy();
gui.add(parameters, 'count').min(100).max(30000).step(100).onFinishChange(generateGalaxy);
gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy);
gui.add(parameters, 'radius').min(0.1).max(20).step(0.01).onFinishChange(generateGalaxy);
gui.add(parameters, 'branches').min(2).max(12).step(1).onFinishChange(generateGalaxy);
gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy);


/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
