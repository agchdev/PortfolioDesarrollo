import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Crear escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // Mejora la calidad en pantallas de alta resolución
document.body.appendChild(renderer.domElement);

// Añadir iluminación
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Luz ambiental suave
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 5, 5); // Posición de la luz puntual
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(-5, 10, 5);
scene.add(directionalLight);

// Crear un cargador
const loader = new GLTFLoader();

// Cargar el modelo del PC
let pcModel, keyboardModel, mouseModel;

loader.load('/model/pc.glb', (gltf) => {
  pcModel = gltf.scene;
  pcModel.position.set(0, 0, 0);
  pcModel.scale.set(0.5, 0.5, 0.5); // Ajusta la escala del modelo
  scene.add(pcModel);
});

loader.load('/model/keyboard.glb', (gltf) => {
  keyboardModel = gltf.scene;
  keyboardModel.position.set(0, -0.5, 0);
  keyboardModel.scale.set(0.5, 0.5, 0.5);
  scene.add(keyboardModel);
});

loader.load('/model/mouse.glb', (gltf) => {
  mouseModel = gltf.scene;
  mouseModel.position.set(1, -0.5, 0);
  mouseModel.scale.set(0.5, 0.5, 0.5);
  scene.add(mouseModel);
});

// Ajustar el renderizador al redimensionar la ventana
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animación
function animate() {
  requestAnimationFrame(animate);

  // Animación opcional del PC (por ejemplo, girar lentamente)
  if (pcModel) {
    pcModel.rotation.y += 0.002;
  }

  // Animación del mouse
  if (mouseModel) {
    mouseModel.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

animate();
