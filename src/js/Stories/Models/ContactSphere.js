import * as THREE from 'three';
var camera, scene, renderer;
var image, mesh, mesh2;
var pos, pos2;

init();
animate();

//add textureloader

export function init() {

    const contactCanvas = document.querySelector('#canvas-contact')
    renderer = new THREE.WebGLRenderer( {alpha: true, powerPreference: 'high-performance',
    canvas: contactCanvas});
	renderer.setSize(contactCanvas.clientWidth, contactCanvas.clientWidth); //handle pixel density stuff (currently being set in CSS
  // renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setPixelRatio(2);
  // console.log(window.devicePixelRatio );
	// document.body.appendChild( renderer.domElement );

	scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera( -10, 10, 10,  -10, - 10, 10); 
  
    // var texture = new THREE.Texture( image );
    var texture = new THREE.TextureLoader().load( '../../contact-first.png' );
    var texture2 = new THREE.TextureLoader().load( '../../contact-second.png' );
  
	var material = new THREE.MeshBasicMaterial( {
		map: texture
	} );
  
  	var material2 = new THREE.MeshBasicMaterial( {
		map: texture2
	} );
    material.transparent = true;
    material2.transparent = true;
    
	var geometry = new THREE.SphereGeometry(9.98, 50, 50 );
    mesh = new THREE.Mesh( geometry, material);
    var geometry2 = new THREE.SphereGeometry( 10, 50, 50 );
    mesh2 = new THREE.Mesh( geometry2, material2);
	// scene.add( mesh );
    mesh2.rotation.y= -Math.PI/2;
    mesh.rotation.y= -Math.PI/2;
    scene.add( mesh2 );
  	scene.add( mesh );
}

export function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	renderer.render( scene, camera );
    mesh2.rotation.y -=0.0009;
    mesh.rotation.y +=0.0009;
}

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

 

// window.addEventListener( "mousemove", function() {
//     pos = (((360*(event.pageX - window.innerWidth/2)/window.innerWidth)* Math.PI / 180)/2) - Math.PI/2;
  
//     pos2 = ((360*(event.pageY - window.innerHeight/8)/window.innerHeight)* Math.PI / 180) - Math.PI/2;
  
//     mesh2.rotation.y=-pos - Math.PI;
//     mesh.rotation.y=pos;
//     mesh2.rotation.x=pos2/10;
//     mesh.rotation.x=pos2/10;
  
  
//     // mesh.rotation.z=10;
// });

 window.addEventListener("mousemove", function( e ) {

        // e.preventDefault();

        console.log(e)
        var touchstart = e.type === 'touchstart' || e.type === 'touchmove',
            e = touchstart ? e.originalEvent : e,
            pageX = touchstart ? e.targetTouches[0].pageX : e.pageX,
            pageY = touchstart ? e.targetTouches[0].pageY : e.pageY;

     
        pos = (((360*(event.pageX - window.innerWidth/2)/window.innerWidth)* Math.PI / 180)/2) - Math.PI/2;
  
        pos2 = ((360*(event.pageY - window.innerHeight/8)/window.innerHeight)* Math.PI / 180) - Math.PI/2;
     
        mesh2.rotation.y=-pos - Math.PI;
        mesh.rotation.y=pos;

        mesh2.rotation.x=pos2/10;
        mesh.rotation.x=pos2/10;
 });