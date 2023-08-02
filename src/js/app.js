
import { About } from "./About";
import { Animations } from "./Animations";
import { initAnimation, initScroll } from "./LocoScroll";
import { Projects } from "./Projects";


window.addEventListener('load', () => {
    console.log('hello');

    initScroll();
    // initAnimation();
    const animations = new Animations();
    const about = new About();
    const projects = new Projects();
    // const skills = new Skills();
})