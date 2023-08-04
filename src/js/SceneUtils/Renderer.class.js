import {
    WebGLRenderer,
    sRGBEncoding,
    PCFSoftShadowMap
} from 'three';

export default class Renderer
{
    constructor(_story)
    {
        this.story = _story;
        this.sizes = this.story.sizes;
        this.scene = this.story.scene;
        this.camera = this.story.camera.instance;
        this.time = this.story.time;
        this.canvas = document.querySelector(`#canvas-`+ this.story.name);
        this.setInstance();
    }

    setInstance()
    {
        this.instance = new WebGLRenderer({
            powerPreference: 'high-performance',
            canvas: this.canvas
        });

        this.instance.setSize(this.canvas.width, this.canvas.height);
        this.instance.setPixelRatio(Math.min(this.sizes.width / this.sizes.height, 2));
        this.instance.outputEncoding = sRGBEncoding;
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = PCFSoftShadowMap; 
        this.story.canvas = this.instance.domElement = this.canvas;
        this.canvas.style.touchAction = 'pan-y';
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(this.sizes.width / this.sizes.height, 2));
    }

}