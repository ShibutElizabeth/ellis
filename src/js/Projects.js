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
        this.project = document.querySelector('.projects');
        this.names = document.querySelectorAll('.js-project-name');
        this.projects = document.querySelectorAll('.project');
        this.selected = document.querySelector('.js-project-selected');
        this.image = document.querySelector('.js-project-image');
        this.img = document.querySelector('.js-project-img');
        this.lines = document.querySelectorAll('.js-project-line');
        this.initFirstTimeline();
    }

    initFirstTimeline(){
        const firstTl = gsap.timeline();

        const playProjects = () => {
            this.lines.forEach((line, i) => {
                firstTl.fromTo(line, {
                    transform: 'scaleX(0)',
                }, {
                    transform: 'scaleX(1)',
                    duration: 0.3,
                    delay: 0.2,
                    ease: 'power1.easeOut',
                }).fromTo(this.names[i], {
                    opacity: 0,
                    y: 60,
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power1.easeOut',
                })
            })
        };
        gsap.to(this.projects, {
            onStart: () => { playProjects(); this.initMaskHover()},
            // onComplete: () => this.initMaskHover(),
            scrollTrigger: {
                trigger: '.projects',
                start: 'top 80%',
                scrub: 1,
                toggleActions: 'play complete complete complete'
            }
        })
    }

    initMaskHover(){
        console.log('here')
        const self = [this.selected, this.image];
        console.log(self)
        let hover = false;
        let enteredIndex = 0;
        const mouse = {
            x: 0,
            y: 0,
        }

        const onHover = (x, y) => {
            gsap.to([this.selected, this.image], {
                x: x,
                y: y,
                // scale: 0.9,
                duration: 0.2,
                ease: 'power2.easeOut',
            });
        }

        const onLeave = () => {
            gsap.to([this.selected, this.image], {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: 'elastic.easeOut.config(1.2, 0.4)',
            });
        }
        
        const onMouseMove = (e) => {
            // cursor
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            if(hover){
                onHover();
            }
        }

        const onMouseEnter = (e) => {
            this.projects.forEach((p, i) => {
                if(p.innerHTML === e.target.innerHTML){
                    enteredIndex = i;
                }
            });
            this.img.src = this.sources[enteredIndex];
            hover = true;
        }

        const onMouseLeave = () => {
            hover = false;
        }

        this.projects.forEach((p) => {
            p.addEventListener('mouseenter', onMouseEnter);
            p.addEventListener('mouseleave', onMouseLeave);
        });
        window.addEventListener('mousemove', onMouseMove);
    };
  
}