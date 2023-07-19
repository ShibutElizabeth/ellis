//https://jsfiddle.net/prisoner849/jm0vb71c/, https://discourse.threejs.org/t/selective-bloom-parts-of-a-single-geometry/28683
// https://stackoverflow.com/questions/67014085/threejs-selective-bloom-for-specific-parts-of-one-object-using-emission-map
//https://github.com/vanruesc/postprocessing


import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';  
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

export default class PostProcessing
{
    constructor(story)
    {
        this.story = story;
        this.canvas = this.story.canvas;
        this.renderer = this.story.renderer;
        this.scene = this.story.scene;
        this.camera = this.story.camera;
        this.sizes = this.story.sizes;

        this.update = function update() {}

        // Wait for resources
        // this.resources.on('ready', () =>
        // {
            this.setRenderTarget();
            this.setPasses();
        // })
    }
    setRenderTarget()
    {
        this.renderTarget = new THREE.WebGLRenderTarget
        (
            800,
            600,
            {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
                encoding: THREE.sRGBEncoding
            }
        )
    }

    setPasses()
    {
        this.renderPass = new RenderPass(this.scene, this.camera.instance);
        this.finalComposer = new EffectComposer(this.renderer.instance, this.renderTarget);

        this.finalComposer.setSize(this.sizes.width, this.sizes.height);
        this.finalComposer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));

        this.finalComposer.addPass( this.renderPass );

        this.enableUpdate()

    }


    enableUpdate()
    {
        this.update = function update() {
            {this.finalComposer.render()}
        }
    }

    resize()
    {
        if(this.finalComposer) {this.finalComposer.setSize(this.sizes.width, this.sizes.height)}
        if(this.finalComposer) {this.finalComposer.setPixelRatio(Math.min(this.sizes.width / this.sizes.height, 2))}

    }
}

