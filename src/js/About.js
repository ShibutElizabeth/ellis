import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export class About{
    constructor(){
        this.headers = document.querySelectorAll('.js-about-move');
        this.aboutSvg = document.querySelector('.js-about-svg');
        this.ellipses = this.aboutSvg.querySelectorAll('ellipse');
        console.log(this.ellipses);
        this.initTextsAnimation();   
        this.initSVGAnimation();
    }

    initTextsAnimation(){
        const tl = gsap.timeline();
        tl.fromTo(this.headers[0], {
            x: '0%',
        }, {
            x: '-55%',
            scrollTrigger: {
                trigger: '.about',
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
                trigger: '.about',
                start: 'top 90%',
                end: '+=120%',
                scrub: 1,
            }
        });
    }

    initSVGAnimation(){
        const tl = gsap.timeline();
        // const ellipse = this.ellipses[0]
        this.ellipses.forEach((ellipse, i) => {
            // if(i % 2 === 0){
                const l = ellipse.getTotalLength();
                gsap.set(ellipse, {
                    strokeDasharray: l,
                    strokeDashoffset: l,
                    stroke: '#ffffff'
                })
                tl.to(ellipse, {
                    keyframes: {
                        strokeDashoffset: [l, l/2, l/4, l/6, l/8],
                    },
                    duration: 3,
                    scrollTrigger: {
                        trigger: ellipse,
                        start: 'top 80%',
                        end: 'top top',
                        scrub: 1,
                    }
                })
            // }
        })
        // var path = document.querySelector('path');
        // var l = path.getTotalLength();

        // TweenMax.set(path, {strokeDasharray:l});
        // TweenMax.fromTo(path, 3, {strokeDashoffset:l}, {strokeDashoffset:0});
        
        // tl.fromTo(this.ellipses, {
        //     str
        // }, {
        //     x: '-55%',
        //     scrollTrigger: {
        //         trigger: '.about',
        //         start: 'top 90%',
        //         end: '+=120%',
        //         scrub: 1,
        //     }
        // })
    }
}