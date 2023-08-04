import * as THREE from 'three';
import { Scene } from './Scene';

//Create a cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xffffff });
const cube = new THREE.Mesh(geometry, material);

//Create a scene
const scene = new Scene();
scene.addSceneObject("Cube1", cube);
scene.render();