import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { ContactSphere } from "./Stories/ContactSphere";
import debounce from "./lib/debounce";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export class Contact{
    constructor(){
        this.section = document.querySelector('.contact');
        this.links = document.querySelectorAll('.js-contact-link');
        this.linksInside = document.querySelectorAll('.js-contact-inside');
        this.spans = this.section.querySelectorAll('span');
        this.initContactTimeline();
        this.linksOnMouseHover();
        this.contactSphere = new ContactSphere();
    }

    linksOnMouseHover(){
        const refs = [
            'https://www.linkedin.com/in/elizabeth-shibut-46a924213/',
            'https://github.com/ShibutElizabeth/',
            'mailto:ellis.shybut@gmail.com',
            'https://wa.me/48796789201'
        ]
        const onMouseEnter = (i) => {
            const tl = gsap.timeline();
            tl.fromTo(this.spans[i], {
                transform: 'scaleX(0)',
                transformOrigin: 'left center',
            }, {
                transform: 'scaleX(1)',
                duration: 0.2,
            }).fromTo(this.spans[i], {
                transform: 'scaleX(1)',
                transformOrigin: 'right center',
            }, {
                transform: 'scaleX(0)',
                duration: 0.2,
            });
        }
        const onMouseClick = (e, i) => {
            e.preventDefault();
            window.open(refs[i], "_blank");
        }
        this.links.forEach((link, i) => {
            link.addEventListener('mouseenter', () => this.setItemHover(link));
            link.addEventListener('click', (e) => onMouseClick(e, i));
        })
    }

    initContactTimeline(){
        const white = () => {
            gsap.fromTo(document.body, {
                backgroundColor: '#141414',
            }, {
                backgroundColor: '#dedede',
                duration: 0.2,
                ease: 'power1.ease',
            });
        };
        const black = () => {
            gsap.fromTo(document.body, {
                backgroundColor: '#dedede',
            }, {
                backgroundColor: '#141414',
                duration: 0.2,
                ease: 'power1.ease',
            });
        };
        const links = () => {
            gsap.fromTo(this.linksInside, {
                transform: 'translateY(102%)',
            }, {
                transform: 'translateY(0%)',
                duration: 0.3,
                ease: 'power1.ease',
            });
        }
        const tl = gsap.timeline();
        tl.to(document.body, {
            scrollTrigger: {
                trigger: this.section,
                start: 'top 50%',
                scrub: 1,
                onEnter: white,
                onLeave: black,
                onEnterBack: white,
                onLeaveBack: black
            }
        })
        .to(document.body, {
            scrollTrigger: {
                trigger: this.section,
                start: 'top 30%',
                scrub: 1,
                onEnter: links,
            }
        });
    } 

    setItemHover(self) {
        let hover = false;
    
        const onHover = (x, y) => {
          gsap.to(self, {
            x: x * 0.15,
            y: y * 0.15,
            scaleX: 1.4,
            scaleY: 1.2,
            duration: 1,
            ease: 'power1.easeIn',
          });
        };
    
        const onLeave = () => {
          gsap.to(self, {
            x: 0,
            y: 0,
            scaleX: 1.3,
            scaleY: 1,
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
}