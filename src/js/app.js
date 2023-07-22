
import { Animations } from "./Animations";
import { initAnimation, initScroll } from "./LocoScroll";


window.addEventListener('load', () => {
    console.log('hello');

    initScroll();
    // initAnimation();
    const animations = new Animations();
    // const skills = new Skills();
})