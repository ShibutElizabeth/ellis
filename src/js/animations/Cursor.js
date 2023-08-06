import { gsap } from "gsap";

export class Cursor{
    constructor(){
        this.cursor = document.querySelector('.js-cursor');
        this.sm = document.querySelectorAll('.js-cursor-sm');
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    onMouseMove(e){
        gsap.to(this.cursor, {
            x: e.clientX - 25,
            y: e.clientY - 25,
            duration: 0.2,
        });
        gsap.to(this.sm, {
            x: e.clientX - 25,
            y: e.clientY - 25,
            delay: 0.03,
            duration: 0.2,
            stagger: 0.03,
        })
    }
}