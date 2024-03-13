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
 * Lights
 */
// Ambient light globally illuminates all objects in the scene equally.
// this light cannot be used to cast shadows as it does not have a direction. it is the omnidirectional lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 0.5 because had to make it dim light
scene.add(ambientLight);

// directional light will provide light with all light rays coming from the same direction. all rays will be parallel
const directionalLight = new THREE.DirectionalLight(0x0000ff, 0.9);
//directionalLight.position.set(1, 0.25, 0); // this is making the directional light come from the right-hand side.
scene.add(directionalLight);

// point light
const pointLight = new THREE.PointLight(0xff0000, 2.5);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);



/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;
//material.wireframe = true;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.y = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.25, 0.085, 16, 32),
  material,
);
torus.position.y = 1;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -2;

scene.add(sphere, cube, torus, plane);

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
camera.position.x = 0;
camera.position.y = 1;
camera.position.z = 4;
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

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
