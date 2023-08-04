import * as THREE from 'three';

export class Camera {
    camera: THREE.PerspectiveCamera;

    constructor(width: number, height: number, ops?: {
        fov?: number,
        aspect?: number,
        near?: number,
        far?: number,
        position?: THREE.Vector3
    }) {
        const fov = ops?.fov || 45;
        const aspect = width / (height || 1);
        const near = ops?.near || 0.1;   //Near clipping plane
        const far = ops?.far || 100;    //Far clipping plane
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        if(ops?.position) this.camera.position.set(ops.position.x, ops.position.y, ops.position.z);
        else this.camera.position.set(0, 0, 10);
    }

    updateAspectRatio(width: number, height: number) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    updatePosition(position: THREE.Vector3) {
        this.camera.position.set(position.x, position.y, position.z);
    }
}