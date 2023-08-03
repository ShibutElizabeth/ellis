import {
    SphereGeometry,
    Vector3,
} from 'three';
import {
    Material,
    Body,
    Sphere,
    Vec3
} from 'cannon-es';
import { StoryObject } from './StoryObject.class';

export class Ball extends StoryObject {
    constructor(_story, _radius, _wSegments, _hSegments, _x, _y, _z, _material){
        super(_story, new SphereGeometry(_radius, _wSegments, _hSegments), _material);
        this.radius = _radius;
        this.initPosition = {
            x: _x,
            y: _y,
            z: _z
        };
        this.contactMaterials = [];
        this.setParameters(new Vector3(_x, _y, _z));
        this.setPhysics();
    }

    setPhysics(){
        this.physicsMaterial = new Material();
        this.body = new Body({
            mass: 4,
            shape: new Sphere(this.radius),
            position: new Vec3(
                this.initPosition.x,
                this.initPosition.y,
                this.initPosition.z
            ),
            material: this.physicsMaterial
        });
        this.physics.addBody(this.body);
        this.body.linearDamping = 0.21;
    }

}