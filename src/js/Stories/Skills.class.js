import { 
    DirectionalLight, 
    SpotLight, 
    MeshPhysicalMaterial, 
    ShadowMaterial,
    Color
} from 'three';
import { ContactMaterial } from 'cannon-es';
import { SkillBox } from "./Models/SkillBox.class";
import { Story } from "./Story.class";
import { Ground } from './Models/Ground.class';
import { Materials } from './Materials.class';
import RayCaster from '../SceneUtils/RayCaster.class';
import SkillsController from './Controllers/SkillsController.class';

export class Skills extends Story {
    constructor(){
        super('skills');
        this.renderer.instance.setClearColor(0xf0712c, 0);
        this.materials = new Materials();
        this.boxMaterials = this.materials.skillsMaterials;
        this.boxes = [];
        this.objectsToTest = [];
        this.boxMaterial = new MeshPhysicalMaterial({ color: new Color("rgb(125, 102, 162)") });
        this.groundMaterial = new ShadowMaterial();
        this.setGround();
        this.setBoxes();
        this.setLights();
        this.timestep = 1/60;
        this.controller = new SkillsController(this);
        this.raycaster = new RayCaster(this);

    }

    setGround(){
        this.ground = new Ground(this, 15, 0.2, 20, 2.8, 0, 0, this.groundMaterial);
        this.ground.setPhysics(0, 0, 0);
    }

    setBoxes(){
        this.boxMaterials.forEach((material, i) => {
            const box = new SkillBox(this, 1, 1, 1, 1.7*Math.sin(Math.PI/(i+1)), 6+i*3.1 - 0.7*Math.sin(Math.PI/(i+1)), -1.3*Math.sin(Math.PI/(i+1)), material);
            box.setPhysics(0, 0, 0);
            this.setContactMaterials(box.physicsMaterial, this.ground.physicsMaterial, 0.7);
            this.boxes.push(box);
            this.setContactMaterials(box.physicsMaterial, box.physicsMaterial, 0.3);
        })
        this.boxes.forEach((box) => {
            this.objectsToTest.push(box.instance);
        })
    }

    setContactMaterials(ownMaterial, groundMaterial, value){
        const ballLeftRoadContact = new ContactMaterial(
            groundMaterial,
            ownMaterial,
            { restitution: value }
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
        this.directionalLight = new DirectionalLight(new Color("#ffffff"), 1);
        this.directionalLight.position.set(30, 30, 30);
        this.scene.add(this.directionalLight);
        this.directionalLight.shadow.mapSize.width = 512;
        this.directionalLight.shadow.mapSize.height = 512;
        this.directionalLight.shadow.camera.near = 0.5;
        this.directionalLight.shadow.camera.far = 500;


        /* spot light */
        const light = new SpotLight( 0xffffff );
        light.castShadow = true; // default false
        light.position.set(15, 16, -5);
        light.distance = 500;
        light.intensity = 0.3;
        light.angle = 0.3;
        light.decay = 2;
        light.penumbra = 1;
        this.scene.add( light );

        //Set up shadow properties for the light
        light.shadow.mapSize.width = 512; // default
        light.shadow.mapSize.height = 512; // default
        light.shadow.camera.near = 0.1; // default
        light.shadow.camera.far = 500; // default
        light.shadow.focus = 1; // default
    }
}