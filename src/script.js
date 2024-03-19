import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { l } from "vite/dist/node/types.d-jgA8ss1A";

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
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * House
 */
// Group() - group is also an object that can be added to the scene. Not just scene, we can also add objects to other object
// example of adding objects to other objects will be seen here by the usage of Group()
const house = new THREE.Group(); 
// every object from hereon that has to be the part of the house will be added to this group object and not the scene directly.
// this house object will take care of adding it to the scene as it is already added to the scene
scene.add(house);

// walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(2,1.75,2),
  new THREE.MeshStandardMaterial({ color: '#C4A484' })
);
walls.position.y = 1.75 / 2 ;
house.add(walls);

//roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(2, 0.75, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.position.y = 1.75 * 1.125 ;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

// door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(0.75, 1),
  new THREE.MeshStandardMaterial({ color: 'brown' })
);
door.position.z = 1 + 0.001;
door.position.y = 0.75 / 2 + 0.125 ;
house.add(door);

// bushes
const bushGeometry = new THREE.SphereGeometry(0.5,16,16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.4, 0.1, 1.1);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(0.7, 0.05, 1.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.5, 0.025, 1.1);

house.add(bush1, bush2, bush3);

// graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.3, 0.4, 0.1);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

for(let i = 0; i < 25 ; i++){
  const angle = Math.random() * Math.PI * 2;
  const radius = 2.125 + Math.random() * 5.25;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(x, 0, z);
  graves.add(grave);
}



// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(7.5, 7.5),
  new THREE.MeshStandardMaterial({ color: "#a9c388" }),
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#ffffff", 1.5);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

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
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
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
