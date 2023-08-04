import {
    Raycaster,
    Vector2,
} from 'three';
import { clickCursor, scaleCursor } from '../lib/utils';

export default class RayCaster
{
    constructor(_story)
    {
        this.story = _story;
        this.container = document.querySelector('#canvas-container-skills');
        this.scene = this.story.scene;
        this.resources = this.story.resources;
        this.camera = this.story.camera;
        this.sizes = this.story.sizes;
        this.controller = this.story.controller;
        this.config = this.story.config;
        this.objectsToTest = [];

        this.config.touch = this.story.config.touch;
        this.objectsToTest = this.story.objectsToTest;
        this.raycaster = new Raycaster();
        this.cursorDown = new Vector2();
        this.cursor = new Vector2();

        this.touchedPoints = [];

        window.addEventListener('pointerdown', (event) => {
            const rect = this.container.getBoundingClientRect();
            this.touchedPoints.push(event.pointerId);

            this.cursorXMin = Math.abs(((event.clientX - rect.left)/ this.sizes.width * 2 - 1) * 0.9);
            this.cursorXMax = Math.abs(((event.clientX - rect.left) / this.sizes.width * 2 - 1) * 1.1);

            this.cursorYMin = Math.abs(((event.clientY - rect.top) / this.sizes.height * 2 - 1) * 0.9);
            this.cursorYMax = Math.abs(((event.clientY - rect.top) / this.sizes.height * 2 - 1) * 1.1);

        });

        // Click listener
        window.addEventListener('pointerup', (event) => {
            const rect = this.container.getBoundingClientRect();
            this.cursor.x = (event.clientX - rect.left) / this.sizes.width * 2 - 1;
            this.cursor.y = -((event.clientY - rect.top) / this.sizes.height) * 2 + 1;

            this.absX = Math.abs(this.cursor.x);
            this.absY = Math.abs(this.cursor.y);

            if (this.touchedPoints.length === 1 && this.absX > this.cursorXMin && this.absX < this.cursorXMax && this.absY > this.cursorYMin && this.absY < this.cursorYMax) {
                this.click(this.cursor);

                this.touchedPoints = [];
            } else {
                this.touchedPoints = [];
            }
        });

        this.container.addEventListener('pointermove', (event) => {
            const rect = this.container.getBoundingClientRect();
            this.cursor.x = (event.clientX - rect.left) / this.sizes.width * 2 - 1;
            this.cursor.y = -((event.clientY - rect.top) / this.sizes.height) * 2 + 1;
            this.raycaster.setFromCamera(this.cursor, this.camera.instance);
            if(this.raycaster && this.objectsToTest){
                const intersects = this.raycaster.intersectObjects(this.objectsToTest);
                if (intersects.length > 0) {
                    scaleCursor(true);
                } else {
                    scaleCursor(false);
                }
            }
        });

        this.story.controller.hide(7);
        this.objectsToTest[7].material.color.set(0x426186);

    }
    click(cursor)
    {
        this.raycaster.setFromCamera(cursor, this.camera.instance);

        this.objectsToTest
            .forEach((mesh) => {
                mesh.material.color.set(0xffffff);
            })
        //Object click listener
        this.intersectsObjects = this.raycaster.intersectObjects(this.objectsToTest);
        if (this.intersectsObjects.length) {
            this.selectedModel = this.intersectsObjects[0].object;
            this.selectedModel.material.color.set(0x426186);
            clickCursor();

            switch (this.selectedModel) {
                case this.objectsToTest[0]:
                    this.story.controller.hide(0);
                    break;
                case this.objectsToTest[1]:
                    this.story.controller.hide(1);
                    break;
                case this.objectsToTest[2]:
                    this.story.controller.hide(2);
                    break;
                case this.objectsToTest[3]:
                    this.story.controller.hide(3);
                    break;
                case this.objectsToTest[4]:
                    this.story.controller.hide(4);
                    break;
                case this.objectsToTest[5]:
                    this.story.controller.hide(5);
                    break;
                case this.objectsToTest[6]:
                    this.story.controller.hide(6);
                    break;
                case this.objectsToTest[7]:
                    this.story.controller.hide(7);
                    break;
                case this.objectsToTest[8]:
                    this.story.controller.hide(8);
                    break;
            }
        } else {
            this.story.controller.hide(-1);
        }
    }
}