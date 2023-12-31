import { Mesh } from 'three';

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
        this.instance = new Mesh(this.geometry, this.material); 
    }

    setParameters(position, cast, receive){
        this.instance.position.copy(position);
        this.instance.castShadow = cast;
        this.instance.receiveShadow = receive;
        this.scene.add(this.instance);
    }
    
    update(){
        if(this.body){
            this.instance.position.copy(this.body.position);
            this.instance.quaternion.copy(this.body.quaternion);
        }
    }
}