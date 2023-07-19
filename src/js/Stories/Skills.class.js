import * as THREE from 'three';
import { Box } from "./Models/Box.class";
import { Story } from "./Story.class";

export class Skills extends Story{
    constructor(){
        super('skills');
        this.boxMaterial = new THREE.MeshPhysicalMaterial({ color: new THREE.Color("rgb(125, 102, 162)") });
        this.box = new Box(this, 3, 3, 3, 0, 0, 0, this.boxMaterial);
        this.setLights();
    }

    setLights(){
        /* directional light */
        this.directionalLight = new THREE.DirectionalLight(new THREE.Color("#ffffff"), 1.0);
        this.directionalLight.position.set(30, 30, 30);
        this.scene.add(this.directionalLight);
        this.directionalLight.shadow.mapSize.width = 512;
        this.directionalLight.shadow.mapSize.height = 512;
        this.directionalLight.shadow.camera.near = 0.5;
        this.directionalLight.shadow.camera.far = 500;

    }
}