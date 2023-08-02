import 'regenerator-runtime/runtime';
import {
  Vector3,
  Vector2,
  ShaderMaterial,
  Mesh,
  DoubleSide,
} from 'three';
import * as THREE from 'three';
import fragmentShader from '../../../shaders/fragment-blob.glsl';
import vertexShader from '../../../shaders/vertex-blob.glsl';

export default class Picture {
  constructor(){
    this.size = 1.0;
    this.coefficient = 1.6;
    this.setupMaterial();
    this.setupInstance();
  }

  setupMaterial(){
    const k = this.coefficient;
    const color = new Vector3(0.91, 0.44, 0.17);
    this.material = new ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable"
      },
      side: DoubleSide,
      uniforms: {
        time: {
          value: 0
        },
        coefficient: {
          value: k
        },
        uColor: {
          value: color,
        },
        delta: {
          value: 1,
        }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
  }

  setupInstance(){
    // const sphereGeometry = new THREE.PlaneGeometry(10, 10);
    this.geometry = new THREE.PlaneGeometry(10, 10);
    // const g = this.geometry.get;
    this.instance = new Mesh(this.geometry, this.material);
    this.instance.position.set(-1, 0, 0);
  }

  updateRotation(mouse){
    this.instance.rotation.x = mouse.y;
    this.instance.rotation.y = mouse.x;
  }

  updateDelta(delta){
    this.material.uniforms.delta.value = delta;
  }

  updateMesh(time){
    this.material.uniforms.time.value = time;
  }

  updateCoefficient(k){
    this.material.uniforms.coefficient.value = k;
  }

}