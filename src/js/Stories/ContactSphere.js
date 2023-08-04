import {
    TextureLoader,
    MeshBasicMaterial,
    SphereGeometry,
    Mesh
} from 'three';
import { Story } from './Story.class';
import { isMobileDevice } from '../lib/utils';

export class ContactSphere extends Story{
    constructor(){
        super('contact');
        this.isMobile = isMobileDevice();
        this.container = document.querySelector('#canvas-container-contact');
        const { width } = this.container.getBoundingClientRect();
        this.renderer.instance.alpha = true;
	    this.renderer.instance.setSize(width, width);
        this.renderer.instance.setPixelRatio(2);
        this.renderer.instance.setClearColor(0xf0712c, 0);
        this.setMaterials();
        this.setMeshes();
    }

    setMaterials(){
        const texture = new TextureLoader().load( '../../contact-first.png' );
        const texture2 = new TextureLoader().load( '../../contact-second.png' );
        this.material = new MeshBasicMaterial( {
            map: texture
        });
      
        this.material2 = new MeshBasicMaterial( {
            map: texture2
        });

        this.material.transparent = true;
        this.material2.transparent = true;
    }

    setMeshes(){
        this.geometry = new SphereGeometry(9.98, 50, 50 );
        this.geometry2 = new SphereGeometry( 10, 50, 50 );
        
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh2 = new Mesh(this.geometry2, this.material2);
        
        this.mesh2.rotation.y = - Math.PI/2;
        this.mesh.rotation.y = - Math.PI/2;

        this.scene.add(this.mesh2);
        this.scene.add(this.mesh);
        if(!this.isMobile){
            window.addEventListener("mousemove", this.onMouseMove.bind(this));
        }
    }

    update(){
        this.camera.update();
        this.postProcessing.update();
        if(this.mesh && this.mesh2){
            this.mesh2.rotation.y -= 0.0009;
            this.mesh.rotation.y += 0.0009;
        }
    }

    onMouseMove(e) {
        var touchstart = e.type === 'touchstart' || e.type === 'touchmove',
            e = touchstart ? e.originalEvent : e,
            pageX = touchstart ? e.targetTouches[0].pageX : e.pageX,
            pageY = touchstart ? e.targetTouches[0].pageY : e.pageY;

     
        this.pos = (((360*(event.pageX - window.innerWidth/2)/window.innerWidth)* Math.PI / 180)/2) - Math.PI/2;
  
        this.pos2 = ((360*(event.pageY - window.innerHeight/8)/window.innerHeight)* Math.PI / 180) - Math.PI/2;
        if(this.mesh && this.mesh2){
            this.mesh2.rotation.y = -this.pos - Math.PI;
            this.mesh.rotation.y = this.pos;
    
            this.mesh2.rotation.x = this.pos2/10;
            this.mesh.rotation.x = this.pos2/10;
        }
    };
}