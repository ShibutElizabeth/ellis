import * as THREE from 'three';

export class Materials{
    constructor(){
        this.textureLoader  = new THREE.TextureLoader();
		this.skillsSources = [
            '../../static/css-logo.png',
            '../../static/git-logo.png',
            '../../static/gsap-logo.png',
            '../../static/js-logo.png',
            '../../static/node-logo.png',
            '../../static/react-logo.png',
            '../../static/three-logo.png',
            '../../static/typescript-logo.png',
            '../../static/vue-logo.png',
            '../../static/css-logo.png',
        ];
        this.skillsMaterials = [];
        this.setSkillsMaterials();
        console.log('mat')
    }

    setSkillsMaterials(){
        this.skillsSources.forEach((skill) => {
            this.skillsMaterials.push(this.getObjectMaterial(skill));
        });
        console.log(this.skillsMaterials);
    }

    getObjectMaterial(url, flip){
        const texture = this.textureLoader.load(url);
        texture.flipY = false;
        // texture.flipX = flip;
        return new THREE.MeshPhysicalMaterial({ map: texture });
    }
}