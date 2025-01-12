import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Crear escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear un cargador
const loader = new GLTFLoader();

// Cargar el modelo del PC
let pcModel, keyboardModel, mouseModel;

loader.load('/model/pc.glb', (gltf) => {
  pcModel = gltf.scene;
  pcModel.position.set(0, 0, 0);
  scene.add(pcModel);
});

loader.load('/model/keyboard.glb', (gltf) => {
  keyboardModel = gltf.scene;
  keyboardModel.position.set(0, -0.5, 0); // Ajusta la posición relativa al PC
  scene.add(keyboardModel);
});

loader.load('/model/mouse.glb', (gltf) => {
  mouseModel = gltf.scene;
  mouseModel.position.set(1, -0.5, 0); // Ajusta la posición relativa al teclado
  scene.add(mouseModel);
});

// Animación
function animate() {
  requestAnimationFrame(animate);

  // Ejemplo: Animar el mouse con un ligero movimiento
  if (mouseModel) {
    mouseModel.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

animate();
