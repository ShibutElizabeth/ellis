import {
    BoxGeometry,
    Vector3
} from 'three';
import {
    Material,
    Body,
    Box,
    Vec3
} from 'cannon-es';
import { StoryObject } from './StoryObject.class';

export class SkillBox extends StoryObject{
    constructor(_story, _width, _height, _depth, _x, _y, _z, _material){
       super(_story, new BoxGeometry(_width, _height, _depth), _material);
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
       this.setParameters(new Vector3(_x, _y, _z), true, true);
    }

    setPhysics(qX, qY, qZ){
        this.physicsMaterial = new Material();
        this.body = new Body({
            mass: 4,
            shape: new Box(
                new Vec3(
                    this.size.width/2, 
                    this.size.height/2, 
                    this.size.depth/2
                )
            ),
            material: this.physicsMaterial,
            position: new Vec3(
                this.initPosition.x,
                this.initPosition.y,
                this.initPosition.z
            )
        });
        this.body.quaternion.setFromEuler(qX, qY, qZ);
        this.body.linearDamping = 0.5;
        this.physics.addBody(this.body);
    }
}