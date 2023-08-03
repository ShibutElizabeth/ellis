import * as THREE from 'three';
import { Story } from './Story.class';

export class ContactSphere extends Story{
    constructor(){
        super('contact');
        this.container = document.querySelector('#canvas-container-contact');
        const { width } = this.container.getBoundingClientRect();
        this.renderer.instance.alpha = true;
	    this.renderer.instance.setSize(width, width);
        this.renderer.instance.setPixelRatio(2);
        this.renderer.instance.setClearColor(0xf0712c, 0);
        this.setMaterials();
        this.setMeshes();
        console.log(this);
    }

    setMaterials(){
        const texture = new THREE.TextureLoader().load( '../../contact-first.png' );
        const texture2 = new THREE.TextureLoader().load( '../../contact-second.png' );
        this.material = new THREE.MeshBasicMaterial( {
            map: texture
        } );
      
        this.material2 = new THREE.MeshBasicMaterial( {
            map: texture2
        } );
        this.material.transparent = true;
        this.material2.transparent = true;
    }

    setMeshes(){
        this.geometry = new THREE.SphereGeometry(9.98, 50, 50 );
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.geometry2 = new THREE.SphereGeometry( 10, 50, 50 );
        this.mesh2 = new THREE.Mesh(this.geometry2, this.material2);
        this.mesh2.rotation.y = - Math.PI/2;
        this.mesh.rotation.y = - Math.PI/2;
        this.scene.add(this.mesh2);
        this.scene.add(this.mesh);
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
        window.addEventListener("touchmove", this.onMouseMove.bind(this));
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

    // Math.radians = function(degrees) {
    //     return degrees * Math.PI / 180;
    // };
}
// var camera, scene, renderer;
// var image, mesh, mesh2;
// var pos, pos2;

// init();
// animate();

// //add textureloader

// export function init() {

//     const contactCanvas = document.querySelector('#canvas-contact')
//     renderer = new THREE.WebGLRenderer( {alpha: true, powerPreference: 'high-performance',
//     canvas: contactCanvas});
// 	renderer.setSize(contactCanvas.clientWidth, contactCanvas.clientWidth);
//     renderer.setPixelRatio(2);

// 	scene = new THREE.Scene();
//     camera = new THREE.OrthographicCamera( -10, 10, 10,  -10, - 10, 10); 
//     var texture = new THREE.TextureLoader().load( '../../contact-first.png' );
//     var texture2 = new THREE.TextureLoader().load( '../../contact-second.png' );
  
// 	var material = new THREE.MeshBasicMaterial( {
// 		map: texture
// 	} );
  
//   	var material2 = new THREE.MeshBasicMaterial( {
// 		map: texture2
// 	} );
//     material.transparent = true;
//     material2.transparent = true;
    
// 	var geometry = new THREE.SphereGeometry(9.98, 50, 50 );
//     mesh = new THREE.Mesh( geometry, material);
//     var geometry2 = new THREE.SphereGeometry( 10, 50, 50 );
//     mesh2 = new THREE.Mesh( geometry2, material2);
//     mesh2.rotation.y= -Math.PI/2;
//     mesh.rotation.y= -Math.PI/2;
//     scene.add( mesh2 );
//   	scene.add( mesh );
// }

// export function animate() {
// 	requestAnimationFrame( animate );
// 	render();
// }

// function render() {
// 	renderer.render( scene, camera );
//     mesh2.rotation.y -=0.0009;
//     mesh.rotation.y +=0.0009;
// }

// Math.radians = function(degrees) {
//   return degrees * Math.PI / 180;
// };


// window.addEventListener("mousemove", onMouseMove)
// function onMouseMove(e) {
//         console.log(e)
//         var touchstart = e.type === 'touchstart' || e.type === 'touchmove',
//             e = touchstart ? e.originalEvent : e,
//             pageX = touchstart ? e.targetTouches[0].pageX : e.pageX,
//             pageY = touchstart ? e.targetTouches[0].pageY : e.pageY;

     
//         pos = (((360*(event.pageX - window.innerWidth/2)/window.innerWidth)* Math.PI / 180)/2) - Math.PI/2;
  
//         pos2 = ((360*(event.pageY - window.innerHeight/8)/window.innerHeight)* Math.PI / 180) - Math.PI/2;
     
//         mesh2.rotation.y=-pos - Math.PI;
//         mesh.rotation.y=pos;

//         mesh2.rotation.x=pos2/10;
//         mesh.rotation.x=pos2/10;
//  };