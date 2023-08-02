
import { About } from "./About";
import { Animations } from "./Animations";
import { Contact } from "./Contact";
import { initAnimation, initScroll } from "./LocoScroll";
import { Projects } from "./Projects";
import { animate, init } from "./Stories/Models/ContactSphere";


window.addEventListener('load', () => {
    console.log('hello');

    initScroll();
    // initAnimation();
    const animations = new Animations();
    const about = new About();
    const projects = new Projects();
    // const skills = new Skills();
    const contact = new Contact();
    init();
    animate();
})