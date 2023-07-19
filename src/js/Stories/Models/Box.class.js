import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { StoryObject } from './StoryObject.class';

export class Box extends StoryObject{
    constructor(_story, _width, _height, _depth, _x, _y, _z, _material){
       super(_story, new THREE.BoxGeometry(_width, _height, _depth), _material);
       this.size = {
        width: _width,
        height: _height,
        depth: _depth,
       };
       this.initPosition = {
        x: _x,
        y: _y,
        z: _z
       };
       this.contactMaterials = [];
       this.setParameters(new THREE.Vector3(_x, _y, _z));
    }

    setPhysics(qX, qY, qZ){
        this.physicsMaterial = new CANNON.Material();
        this.body = new CANNON.Body({
            shape: new CANNON.Box(
                new CANNON.Vec3(
                    this.size.width/2, 
                    this.size.height/2, 
                    this.size.depth/2
                )
            ),
            type: CANNON.Body.STATIC,
            material: this.physicsMaterial,
            position: new CANNON.Vec3(
                this.initPosition.x,
                this.initPosition.y,
                this.initPosition.z
            )
        });
        this.body.quaternion.setFromEuler(qX, qY, qZ);
        this.physics.addBody(this.body);
    }
}