import LocomotiveScroll from "locomotive-scroll";
import { Skills } from "./Stories/Skills.class";

window.addEventListener('load', () => {
    console.log('hello');

    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
    })
    const skills = new Skills();
})