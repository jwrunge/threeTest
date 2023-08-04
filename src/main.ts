import * as THREE from 'three';

//Set window dimensions
let width = 0;
let height = 0;

function setWindowDimensions() {
    width = window.innerWidth;
    height = window.innerHeight;
}

window.addEventListener('resize', setWindowDimensions);
setWindowDimensions();

//Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

//Camera
const fov = 45;
const aspect = width / (height || 1);
const near = 0.1;   //Near clipping plane
const far = 100;    //Far clipping plane
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

//Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//Create a cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//Render the scene
const container = document.getElementById('canvas');
container?.appendChild(renderer.domElement);
renderer.render(scene, camera);