import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { StoryObject } from './StoryObject.class';

export class Ball extends StoryObject {
    constructor(_story, _radius, _wSegments, _hSegments, _x, _y, _z, _material){
        super(_story, new THREE.SphereGeometry(_radius, _wSegments, _hSegments), _material);
        this.radius = _radius;
        this.initPosition = {
            x: _x,
            y: _y,
            z: _z
        };
        this.contactMaterials = [];
        this.setParameters(new THREE.Vector3(_x, _y, _z));
        this.setPhysics();
    }

    setPhysics(){
        this.physicsMaterial = new CANNON.Material();
        this.body = new CANNON.Body({
            mass: 4,
            shape: new CANNON.Sphere(this.radius),
            position: new CANNON.Vec3(
                this.initPosition.x,
                this.initPosition.y,
                this.initPosition.z
            ),
            material: this.physicsMaterial
        });
        this.physics.addBody(this.body);
        this.body.linearDamping = 0.21;

        // const groundSphereContactMat = new CANNON.ContactMaterial(
        //     groundPhysMat,
        //     spherePhysMat,
        //     {restitution: 0.9}
        // );

        // this.physics.addContactMaterial(groundSphereContactMat);
    }

}