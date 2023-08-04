import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { linkOnMouseClick, scaleCursor, setItemHover } from "../lib/utils";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export class Projects{
    constructor(){
        this.cards = document.querySelectorAll('.js-project');
        this.buttons = document.querySelectorAll('.js-project-btn');
        this.companies = document.querySelectorAll('.js-project-link');
        this.initProjectsTimeline();
        this.initProjectsLinks();
    }

    initProjectsTimeline(){
        const tl = gsap.timeline();
        this.cards.forEach((card, i) => {
            tl.to(card, {
                transform: 'translateX(0)',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 70%',
                    scrub: 1,
                }
            })
        })
    } 

    initProjectsLinks(){
        const links = [
            'https://moralia.ca/',
            'https://www.younergy.com/',
            'https://wlitz.com/',
            'https://snobarchitects.com/',
            'https://app.sloyd.ai/'
        ];

        this.buttons.forEach((btn, i) => {
            btn.addEventListener('click', (e) => linkOnMouseClick(e, links[i]));
            btn.addEventListener('mouseenter', () => scaleCursor(true));
            btn.addEventListener('mouseleave', () => scaleCursor(false));
        });

        this.companies.forEach((company) => {
            company.addEventListener('mouseenter', () => scaleCursor(true));
            company.addEventListener('mouseleave', () => scaleCursor(false));
            company.addEventListener('click', (e) => linkOnMouseClick(e, e.target.href));
        });
    }
}