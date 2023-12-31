import {
    TextureLoader,
    MeshPhysicalMaterial
} from 'three';

export class Materials{
    constructor(){
        this.textureLoader  = new TextureLoader();
		this.skillsSources = [
            '../../../gsap-logo.png',
            '../../../typescript-logo.png',
            '../../../react-logo.png',
            '../../../css-logo.png',
            '../../../smile.jpeg',
            '../../../git-logo.png',
            '../../../js-logo.png',
            '../../../three-logo.png',
            '../../../vue-logo.png',
        ];
        this.skillsMaterials = [];
        this.mapSourses = ['../../../map.jpeg'];
        this.map = this.textureLoader.load(this.mapSourses[0]);
        this.setSkillsMaterials();
    }

    setSkillsMaterials(){
        this.skillsSources.forEach((skill) => {
            this.skillsMaterials.push(this.getObjectMaterial(skill));
        });
    }

    getObjectMaterial(url, flip){
        const texture = this.textureLoader.load(url);
        texture.flipY = true;
        texture.flipX = true;
        return new MeshPhysicalMaterial({ map: texture });
    }
}