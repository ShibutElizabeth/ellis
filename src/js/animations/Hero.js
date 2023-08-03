import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { Skills } from "../Stories/Skills.class";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export class Hero{
    constructor(){
        this.names = document.querySelectorAll('.js-hero-name');
        this.heroMask = document.querySelector('.js-hero-mask');
        this.mouseScroll = document.querySelector('.js-mouse-scroll');
        this.mouseClick = document.querySelector('.js-mouse-click');
        this.container = document.querySelector('#skills-container');
        this.maskMouseMove = () => {};
        this.initFirstTimeline();
        this.initMaskTransition();
    }

    initSkills() {
        const skills = new Skills();
    }

    initFirstTimeline(){
        const firstTl = gsap.timeline();
        firstTl.fromTo(this.names, {
            transform: 'translateY(102%)',
        }, {
            transform: 'translateY(0%)',
            duration: 0.6,
            stagger: 0.4,
            ease: 'power1.easeOut',
        })
        .fromTo(this.heroMask, {
            scale: 0,
        }, {
            scale: 1,
            duration: 0.5,
            ease: 'power1.easeOut',
            transformOrigin: 'right bottom',
            onComplete: () => {
                this.initSkills();
                this.initMouseScrollAnim()
            },
        })
        // .fromTo(this.mouseScroll, {
        //     opacity: 0,
        // }, {
        //     opacity: 1,
        //     delay: 1.5,
        //     duration: 0.8,
        //     onComplete: () => ,
        // });
    }

    initMouseScrollAnim(){
        const paths = this.mouseScroll.querySelectorAll('path');
        gsap.fromTo([paths[1], paths[2]], {
            y: 0,
        }, {
            y: 4,
            duration: 0.6,
            yoyo: true,
            repeat: -1,
        })
    }

    hideMouse(element){
        gsap.fromTo(element, {
            opacity: 1,
        }, {
            opacity: 0,
            duration: 0.2,
        });
    }

    showMouse(element){
        gsap.fromTo(element, {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 0.2,
        });
    }

    removeMaskHover() {
        window.removeEventListener('mousemove', this.maskMouseMove);
    }

    initMaskTransition(){
        const sceneTL = gsap.timeline();
        sceneTL
        .fromTo(this.heroMask, {
            left: '25vw',
            top: '25vh',
            width: '65vw',
            height: '65vh',
        }, {
            left: '5vw',
            top: '80vh',
            width: '90vw',
            height: '90vh',
            scrollTrigger: {
                trigger: this.container,
                start: 'top 90%',
                end: 'top 30%',
                scrub: 1
            }
        })
        .to(this.mouseScroll, {
            delay: 1.5,
            scrollTrigger: {
                trigger: this.container,
                start: 'top 110%',
                end: 'top 90%',
                scrub: 1,
                onEnter: () => this.showMouse(this.mouseScroll),
                onEnterBack: () => this.showMouse(this.mouseScroll),
                onLeave: () => this.hideMouse(this.mouseScroll),
                onLeaveBack: () => this.hideMouse(this.mouseScroll),
            }
        })
        .to(this.mouseClick, {
            scrollTrigger: {
                trigger: this.container,
                start: 'top 40%',
                end: 'top 10%',
                scrub: 1,
                onEnter: () => this.showMouse(this.mouseClick),
                onLeave: () => this.hideMouse(this.mouseClick),
                onEnterBack: () => this.showMouse(this.mouseClick),
                onLeaveBack: () => this.hideMouse(this.mouseClick),
            }
        });
    }
}