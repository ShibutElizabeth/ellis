import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { Box } from "./Models/Box.class";
import { Ball } from './Models/Ball.class';
import { Story } from "./Story.class";
import { StoryObject } from './Models/StoryObject.class';
import { Ground } from './Models/Ground.class';
import { Materials } from './Materials.class';

import RayCaster from '../SceneUtils/RayCaster.class';

export class Skills extends Story{
    constructor(){
        super('skills');
        this.renderer.instance.setClearColor(0xf0712c, 0);
        this.materials = new Materials();
        this.boxMaterials = this.materials.skillsMaterials;
        this.boxes = [];
        this.boxMaterial = new THREE.MeshPhysicalMaterial({ color: new THREE.Color("rgb(125, 102, 162)") });
        this.groundMaterial = new THREE.MeshPhysicalMaterial({ color: new THREE.Color("rgb(125, 102, 162)"), visible: false });
        this.setGround();
        this.setBoxes();
        this.setLights();
        this.timestep = 1/60;
        this.raycaster = new RayCaster(this);
        
    }

    setGround(){
        this.ground = new Ground(this, 20, 0.2, 20, 0, 0, 0, this.groundMaterial);
        this.ground.setPhysics(0, 0, 0);
    }

    setBoxes(){
        this.boxMaterials.forEach((material, i) => {
            const box = new Box(this, 1, 1, 1, 1.7*Math.sin(Math.PI/(i+1)), 6+i*3.1 - 0.7*Math.sin(Math.PI/(i+1)), -1.3*Math.sin(Math.PI/(i+1)), material);
            box.setPhysics(0, 0, 0);
            this.setContactMaterials(box.physicsMaterial, this.ground.physicsMaterial, 0.7);
            this.boxes.push(box);
            this.setContactMaterials(box.physicsMaterial, box.physicsMaterial, 0.3);
        })
    }

    setContactMaterials(ownMaterial, groundMaterial, value){
        const ballLeftRoadContact = new CANNON.ContactMaterial(
            groundMaterial,
            ownMaterial,
            {restitution: value}
        );
        this.physics.addContactMaterial(ballLeftRoadContact);
        this.ready = true;
    }

    update(){
        if(this.ready){
            this.physics.step(this.timestep);
        this.ground.update();
        this.boxes.forEach((box) => {
            box.update();
        });
        this.camera.update();
        this.postProcessing.update();
        }
        
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