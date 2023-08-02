import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { Skills } from "./Stories/Skills.class";
import debounce from "./lib/debounce";
import { Portfolio } from "./Stories/Portfolio.class";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export class Projects{
    constructor(){
        this.sources = [
            '../../moralia.png',
            '../../younergy.png',
            '../../wlitz.png',
            '../../sloyd.png'
        ];
        this.cards = document.querySelectorAll('.js-project');
        // this.portfolio = new Portfolio();
        this.initProjectsTimeline();
    }

    initProjectsTimeline(){
        const tl = gsap.timeline();
        this.cards.forEach((card, i) => {
            tl.fromTo(card, {
                x: 50 + Math.sin(Math.PI*i) *25,
            }, {
                x: 0,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    // end: 'top 75%',
                    scrub: 1,
                }
            })
        })
    } 
}