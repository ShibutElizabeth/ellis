
import { About } from "./About";
import { Animations } from "./Animations";
import { Contact } from "./Contact";
import { initAnimation, initScroll } from "./LocoScroll";
import { Projects } from "./Projects";

window.addEventListener('load', () => {
    console.log('hello');

    initScroll();
    const animations = new Animations();
    const about = new About();
    const projects = new Projects();
    const contact = new Contact();

})