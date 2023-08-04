
import { About } from "./animations/About";
import { Hero } from "./animations/Hero";
import { Contact } from "./animations/Contact";
import { initScroll } from "./LocoScroll";
import { Projects } from "./animations/Projects";
import { Preloader } from "./Stories/Preloader.class";
import { Cursor } from "./animations/Cursor";

window.addEventListener('load', () => {
    // const preloader = new Preloader();
    initScroll();
    const cursor = new Cursor();
    const hero = new Hero();
    const about = new About();
    const projects = new Projects();
    const contact = new Contact();
})