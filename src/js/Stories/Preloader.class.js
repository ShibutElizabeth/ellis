import { 
    DirectionalLight, 
    SpotLight, 
    MeshPhysicalMaterial, 
    AnimationMixer,
    Color
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Story } from "./Story.class";

export class Preloader extends Story{
    constructor(){
        super('preloader');
        this.renderer.instance.setClearColor(0xf0712c, 0);
        this.setLights();
        this.loadModel();
        this.setCameraPosition();
    }

    setCameraPosition(){
        this.camera.instance.position.set(-387, 149, 386);
        this.camera.controls.target.set(-4, 112,-39)
    }

    loadModel(){
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(
            '../../../trex.glb',
            (file) =>
                {
                    this.model = file.scene;
                    console.log(this.model);
                    this.mixer = new AnimationMixer(this.model);
                    this.clips = file.animations;
                    
                    this.setMaterials();
                }
        )
    }

    update(){
        this.camera.update();
        this.postProcessing.update();
        if(this.mixer) this.mixer.update(this.clock.getDelta()/2);
    }

    setMaterials()
    {
        this.setMeshesMaterials([this.model], new MeshPhysicalMaterial({color: new Color('#ffffff')}));
        const clip = this.clips[0];
        const action = this.mixer.clipAction(clip);
        action.play();
        action.paused = true;
        this.scene.add(this.model);
    }

    setMeshesMaterials(objects, material){
        objects.forEach((object) => {
            if(object.material){
                object.material = material;
            }
            if(object.children){
                this.setMeshesMaterials(object.children, material);
            }
        })
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