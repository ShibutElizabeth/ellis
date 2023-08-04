import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import debounce from "../lib/debounce";
import { isMobileDevice, setItemHover } from "../lib/utils";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export class About{
    constructor(){
        this.isMobile = isMobileDevice();
        this.section = document.querySelector('.js-about');
        this.headers = document.querySelectorAll('.js-about-move');
        this.photo = document.querySelector('.js-about-photo');
        this.img = this.photo.querySelector('img');
        this.exps = document.querySelectorAll('.js-exp');
        this.text = this.section.querySelector('.js-about-text');
        this.initTextsAnimation();  
        if(!this.isMobile) setItemHover(this.photo); 
        this.initExpsTimeline();
        this.initItemParallax();
    }

    initTextsAnimation(){
        const tl = gsap.timeline();
        tl
        .fromTo(this.headers[0], {
            x: '0%',
        }, {
            x: '-55%',
            scrollTrigger: {
                trigger: this.section,
                start: 'top 90%',
                end: '+=120%',
                scrub: 1,
            }
        })
        .fromTo(this.headers[1], {
            x: '-55%',
        }, {
            x: '0%',
            scrollTrigger: {
                trigger: this.section,
                start: 'top 90%',
                end: '+=120%',
                scrub: 1,
            }
        });
    }

    initItemParallax() {
        const tl = gsap.timeline();
        const show = () => {
            gsap.fromTo(this.photo, {
                opacity: 0,
                y: 100,
            },{
                opacity: 1,
                y: 0,
                delay: 0.3,
                duration: 0.5,
                ease: 'power1.easeIn',
            });
        };

        gsap.set(this.photo, {
            opacity: 0,
            y: 100,
        });

        tl
        .to(this.photo, {
            onStart: () => show(),
            scrollTrigger: {
                trigger: this.photo,
                start: 'top 90%',
                end: 'top 80%',
                toggleActions: 'play none none none'
            }
        })
        .fromTo(this.img, {
            y: 0,
        }, {
            y: 30,
            scrollTrigger: {
                trigger: this.photo,
                start: 'top 40%%',
                end: 'top top',
                scrub: 1,
            }
        });
    }

    initExpsTimeline(){
        const show = () => {
            gsap.fromTo(this.exps, {
                opacity: 0,
                y: 50,
            },{
                opacity: 1,
                y: 0,
                delay: 0.5,
                duration: 0.5,
                stagger: 0.4,
                ease: 'power1.easeIn',
            });
        }
        const showDescription = () => {
            gsap.fromTo(this.text, {
                opacity: 0,
                y: 100,
            },{
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power1.easeIn',
            });
        }

        const tl = gsap.timeline();
        tl.to(this.exps, {
            onStart: () => show(),
            scrollTrigger: {
                trigger: this.isMobile ? this.exps : this.photo,
                start: this.isMobile ? 'top 90%' : 'top 80%',
                end: 'top 70%',
                toggleActions: 'play none none none',
            }
        }).to(this.text, {
            delay: 0.5,
            onStart: () => showDescription(),
            scrollTrigger: {
                trigger: this.text,
                start: 'top 70%',
            }
        });
    }
}