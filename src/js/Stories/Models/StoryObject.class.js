import * as THREE from 'three';

export class StoryObject {
    constructor(_story, _geometry, _material){
        this.story = _story;
        this.scene = this.story.scene;
        this.physics = this.story.physics;
        this.setInstance(_geometry, _material);
    }

    setInstance(geometry, material){
        this.geometry = geometry; 
        this.material = material;
        this.instance = new THREE.Mesh(this.geometry, this.material); 
    }

    setParameters(position){
        this.instance.position.copy(position);
        this.instance.castShadow = true;
        this.instance.receiveShadow = true;
        this.scene.add(this.instance);
    }
    
    update(){
        if(this.body){
            this.instance.position.copy(this.body.position);
            this.instance.quaternion.copy(this.body.quaternion);
        }
    }
}