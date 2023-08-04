import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import debounce from "../lib/debounce";
import { isMobileDevice } from "../lib/utils";

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
        if(!this.isMobile) this.setItemHover(); 
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

    setItemHover() {
        const self = this.photo;
        let hover = false;
    
        const onHover = (x, y) => {
          gsap.to(self, {
            x: x * 0.15,
            y: y * 0.15,
            scale: 1.1,
            duration: 1,
            ease: 'power1.easeIn',
          });
        };
    
        const onLeave = () => {
          gsap.to(self, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'elastic.easeOut.config(1.2, 0.4)',
          });
        };
    
        window.addEventListener("mousemove", (e) => {
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
          if (dist < width * 0.65) {
            mutHover = true;
            if (!hover) {
              hover = true;
            }
            debounce(onHover(x, y), 100);
          }
    
          // reset
          if (!mutHover && hover) {
            debounce(onLeave(), 100);
            hover = false;
          }
        });
    };

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