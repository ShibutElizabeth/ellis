import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { Skills } from "./Stories/Skills.class";
import debounce from "./lib/debounce";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export class Projects{
    constructor(){
        this.sources = [
            '../../moralia.png',
            '../../younergy.png',
            '../../wlitz.png',
            '../../sloyd.png'
        ];
        this.initProjectsTimeline();
    }

    initProjectsTimeline(){
        var cards = gsap.utils.toArray(".card"),
        radius = 250;

        gsap.set(".grid", {
            perspective: 2000,
            transformStyle: "preserve-3d"
        });

        cards.forEach(function(element, index) {
            gsap.set(element, {
                rotationY: index * 360 / cards.length,
                transformOrigin: "50% 50% " + -radius
            });
            gsap.to(element, {
                duration: 20, 
                rotationY: "-=360",
                repeat: -1, 
                ease: "none"           
            });
        });
    } 
}