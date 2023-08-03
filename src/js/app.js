
import { About } from "./animations/About";
import { Hero } from "./animations/Hero";
import { Contact } from "./animations/Contact";
import { initScroll } from "./LocoScroll";
import { Projects } from "./animations/Projects";

window.addEventListener('load', () => {
    initScroll();
    const hero = new Hero();
    const about = new About();
    const projects = new Projects();
    const contact = new Contact();
})