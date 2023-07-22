import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { Skills } from "./Stories/Skills.class";
import debounce from "./lib/debounce";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export class Animations{
    constructor(){
        this.names = document.querySelectorAll('.js-name');
        this.heroMask = document.querySelector('.hero_mask');
        this.mouse = document.querySelector('.mouse');
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
            onComplete: () => this.initSkills(),
        })
        .fromTo(this.mouse, {
            opacity: 0,
        }, {
            opacity: 1,
            delay: 1.5,
            duration: 0.8,
            onComplete: () => this.initMouseScrollAnim(),
        })
    }

    initMouseScrollAnim(){
        const paths = this.mouse.querySelectorAll('path');
        gsap.fromTo([paths[1], paths[2]], {
            y: 0,
        }, {
            y: 4,
            duration: 0.6,
            yoyo: true,
            repeat: -1,
        })
    }
    
    hideMouse(){
        const tl = gsap.timeline();
        tl.fromTo(this.mouse, {
            opacity: 1,
        }, {
            opacity: 0,
            duration: 0.2,
        })
    }

    removeMaskHover() {
        window.removeEventListener('mousemove', this.maskMouseMove);
    }

    initMaskTransition(){
        const sceneTL = gsap.timeline();
        sceneTL
        .fromTo(this.heroMask, {
            right: '10vw',
            top: '25vh',
            width: '65vw',
            height: '65vh',
        }, {
            right: '5vw',
            top: '80vh',
            width: '90vw',
            height: '90vh',
            onStart: () => this.hideMouse(),
            scrollTrigger: {
                trigger: '#skills-container',
                start: 'top 90%',
                end: 'top 30%',
                scrub: 1
            }
        });
    }

    initMaskHover(){
        const self = this.heroMask;
        let hover = false;

        const onHover = (x, y) => {
            gsap.to(self, {
                x: x * 0.15,
                y: y * 0.15,
                // scale: 0.9,
                duration: 0.4,
                ease: 'power2.easeOut',
            });
        }

        const onLeave = () => {
            gsap.to(self, {
              x: 0,
              y: 0,
            //   scale: 1,
              duration: 0.6,
              ease: 'elastic.easeOut.config(1.2, 0.4)',
            });
        }

        const maskMouseMove = (e) => {
            // cursor
            const mouse = {
                x: e.clientX,
                y: e.clientY,
            };
  
            const offset = self.getBoundingClientRect();
            // size
            const {
                width
            } = offset;
            const {
                height
            } = offset;
  
  
            const elPos = {
                x: offset.left + width / 2,
                y: offset.top + height / 2
            };
  
            // comparaison
            const x = mouse.x - elPos.x;
            const y = mouse.y - elPos.y;
  
            // dist
            const dist = Math.sqrt(x * x + y * y);
  
            // mutex hover
            let mutHover = false;
  
            // anim
            if (dist < width*2 && dist < height*2) {
                mutHover = true;
            if (!hover) {
                hover = true;
            }
            debounce(onHover(x, y), 100);

             // reset
            if (!mutHover && hover) {
                console.log('leave')
                debounce(onLeave(), 100);
                hover = false;
            }
        }
      };

      this.maskMouseMove = maskMouseMove;

      window.addEventListener("mousemove", maskMouseMove)


    };
  
}