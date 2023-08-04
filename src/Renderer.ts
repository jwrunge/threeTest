import * as THREE from "three";

export class Renderer {
    renderer: THREE.WebGLRenderer;
    ready: Promise<boolean>;

    constructor(canvasId: string, width: number, height: number) {
        //Set up logical renderer
        this.renderer = new THREE.WebGLRenderer();
        this.updateDimensions(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        //Set up HTML canvas renderer
        this.ready = new Promise((resolve, reject) => {
            document.addEventListener('DOMContentLoaded', ()=> {
                const container = document.getElementById(canvasId);
                if(container) {
                    container.appendChild(this.renderer.domElement);
                    resolve(true);
                }
                else {
                    reject("Could not find canvas container");
                }
            });
        });
    }

    render(scene: THREE.Scene, camera: THREE.Camera) {
        console.log("RENDERING", this, this.renderer, scene, camera)
        this.renderer.render(scene, camera);
    }

    updateDimensions(width: number, height: number) {
        this.renderer.setSize(width, height);
    }
}