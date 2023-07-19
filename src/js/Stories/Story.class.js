import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Camera from '../SceneUtils/Camera.class';
import Sizes from '../SceneUtils/Sizes.class';
import Time from '../SceneUtils/Time.class';
import Renderer from '../SceneUtils/Renderer.class';
import PostProcessing from '../SceneUtils/PostProcessing.class';
import { Trigger } from '../SceneUtils/Trigger.class';
import RayCaster from '../SceneUtils/RayCaster.class';
import SkillsController from './Controllers/SkillsController.class';

export class Story{
    constructor(_name){
        this.name = _name;
        this.canvas = document.querySelector('#canvas-' + _name);
        this.config = {};
        this.config.touch = false;
        window.addEventListener('touchstart', () =>
        {
            this.config.touch = true
        }, { once: true });

        this.scene = new THREE.Scene()
        this.sizes = new Sizes(this);
        this.physics = new CANNON.World({
            gravity: new CANNON.Vec3(0, -9.81, 0)
        });

        if(this.sizes.width / this.sizes.height > 1) {this.config.vertical = false}
        else {this.config.vertical = true}

        this.time = new Time();
        this.clock = new THREE.Clock();
        this.camera = new Camera(this);
        this.renderer = new Renderer(this);
        this.trigger = new Trigger();
        this.controller = new SkillsController(this);
        // this.raycaster = new RayCaster(this);

        this.postProcessing = new PostProcessing(this);

        this.resize();
        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize();
        });
         
        // Time tick event
        this.time.on('tick', () =>
        {
            this.update();
        });
    }

    resize()
    {
        this.camera.resize();
        this.renderer.resize();
        this.postProcessing.resize();
    }

    update()
    {
        this.camera.update();
        this.postProcessing.update();
    }
}