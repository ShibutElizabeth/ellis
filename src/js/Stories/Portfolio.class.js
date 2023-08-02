import * as THREE from 'three';
import { Story } from "./Story.class";
import Picture from './Models/Picture.class';

export class Portfolio extends Story{
    constructor(){
        super('portfolio');
        this.renderer.instance.setClearColor(0xf0712c, 0);
        this.picture = new Picture();
        this.scene.add(this.picture.instance);
        this.mouse = {
            moved: false,
            x: 0,
            y: 0,
          };
        this.mouseTarget = new THREE.Vector2(0,0);
        window.addEventListener("mousemove", this.mousemove.bind(this));
        console.log('potfolio')
    }

    update(){
        console.log('update')
        
        this.camera.update();
        this.postProcessing.update();
        if(this.picture){
            this.picture.updateMesh(this.time/7);
            this.mouseTarget.x += (this.mouse.x - this.mouseTarget.x)*0.05;
            this.mouseTarget.y += (this.mouse.y - this.mouseTarget.y)*0.05;
            this.picture.updateDelta(this.delta);
        }

    }

    mousemove(event) {
        let direction = 0;
        if(event.x < this.width / 3){
          direction = 1;
        } else if(event.x < 2 * this.width / 3){
          direction = 0;
        } else{
          direction = -1;
        }
        // this.delta = 1.0;
        this.delta = (event.x -  this.width/2)/this.width;
    
        // set new mouse coords
        this.mouse.x = event.x / this.width;
        this.mouse.y = event.y / this.height;
      }


    setLights(){
        /* directional light */
        this.directionalLight = new THREE.DirectionalLight(new THREE.Color("#ffffff"), 1);
        this.directionalLight.position.set(30, 30, 30);
        this.scene.add(this.directionalLight);
        this.directionalLight.shadow.mapSize.width = 512;
        this.directionalLight.shadow.mapSize.height = 512;
        this.directionalLight.shadow.camera.near = 0.5;
        this.directionalLight.shadow.camera.far = 500;

    }
}