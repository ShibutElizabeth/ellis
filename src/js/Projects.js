import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";

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
        this.buttons = document.querySelectorAll('.js-project-btn');
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
                    // end: 'top 75%',
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
        ]
        const onBtnClick = (e, i) => {
            e.preventDefault();
            window.open(links[i], "_blank");
        }
        this.buttons.forEach((btn, i) => {
            btn.addEventListener('click', (e) => onBtnClick(e, i))
        })
    }
}