import {
    OrthographicCamera,
    PerspectiveCamera,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { isMobileDevice } from "../lib/utils";

export default class Camera
{
    constructor(_story)
    {
        this.isMobile = isMobileDevice();
        this.story = _story;
        this.sizes = this.story.sizes;
        this.scene = this.story.scene;
        this.canvas = this.story.canvas;
        this.config = this.story.config;
        this.orthographic = this.story.name === 'contact';
        this.setInstance();
        if(!this.orthographic) this.setControls();
    }

    setInstance()
    {
        if(this.orthographic){
            this.instance = new OrthographicCamera(-10, 10, 10,  -10, - 10, 10);   
        } else{
            this.instance = new PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.4, 1000);
        }
        this.scene.add(this.instance);
    }

    
    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas);
        
        this.controls.enableRotate = false;
        this.controls.enablePan = false;
        this.controls.enableZoom = false;
        // this.controls.enabled = false;
        // this.controls.addEventListener('change', () => {
        //     console.log(this.controls);
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
        if(this.controls){
            this.controls.update();
        }
    }
}

// test