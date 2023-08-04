import * as THREE from "three";
import { Renderer } from "./Renderer";
import { Camera } from "./Camera";

type SceneObject = THREE.Mesh<any>;

export class Scene {
    scene: THREE.Scene
    sceneObjects: Map<string, SceneObject> = new Map();
    cameras: { [key: string]: Camera } = {};
    renderer: Renderer;
    activeCamera: string = "default";
    ready: Promise<boolean>

    constructor(ops?: {
        renderer?: Renderer,
        cameras?: { [key: string]: Camera },
        background?: THREE.Color | THREE.Texture | THREE.CubeTexture | null
    }) {
        this.renderer = ops?.renderer || new Renderer("canvas", window.innerWidth, window.innerHeight);
        this.cameras = ops?.cameras || { default: new Camera(window.innerWidth, window.innerHeight, {}) };
        this.scene = new THREE.Scene();
        this.scene.background = ops?.background || new THREE.Color(0x000000);
        this.ready = this.renderer.ready;
    }

    //Meta
    setBackground(background: THREE.Color | THREE.Texture | THREE.CubeTexture | null) {
        this.scene.background = background;
    }

    //Scene objects
    addSceneObject(name: string, sceneObject: SceneObject) {
        this.sceneObjects.set(name, sceneObject);
        this.scene.add(sceneObject);
    }

    removeSceneObject(name: string) {
        const sceneObject = this.sceneObjects.get(name);
        if (sceneObject) {
            this.scene.remove(sceneObject);
            this.sceneObjects.delete(name);
        }
    }

    //Cameras
    addCamera(name: string, camera: Camera) {
        this.cameras[name] = camera;
    }

    switchCamera(name: string) {
        this.activeCamera = name;
    }

    removeCamera(name: string) {
        delete this.cameras[name];
    }

    //Rendering
    async render() {
        await this.ready;
        this.renderer.render(this.scene, this.cameras[this.activeCamera].camera);
    }
}