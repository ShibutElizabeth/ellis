import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera
{
    constructor(_story)
    {
        this.story = _story;
        this.sizes = this.story.sizes;
        this.scene = this.story.scene;
        this.canvas = this.story.canvas;
        this.config = this.story.config;

        this.setInstance();
        this.setControls();
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.4, 1000);
        this.instance.position.x = 0;
        this.instance.position.y = 10;
        this.instance.position.z = 10;
        this.instance.lookAt(0, 0, 0);
        this.scene.add(this.instance);
    }

    
    setControls()
    {
        // console.log('controls')
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.target.set(0, 0, 0);
        // this.controls.enableRotate = false;
        // this.controls.enablePan = false;
        // this.controls.enableDamping = true;
        // this.controls.enablePan = false;
        // this.controls.rotateSpeed = 1.2;
        // this.controls.zoomSpeed = 0.8;
        // this.controls.target.z = -1;
        // this.controls.enableRotate = false;
        // this.controls.enableZoom = false;
        // this.controls.addEventListener('change', ()=>{
        //     console.log(this.controls)
        // })
    }

    
    sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update()
    {
        this.controls.update();
    }
}

// test