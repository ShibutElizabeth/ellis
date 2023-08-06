import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { ContactSphere } from "../Stories/ContactSphere";
import { isMobileDevice, linkOnMouseClick, setItemHover } from "../lib/utils";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export class Contact{
    constructor(){
        this.isMobile = isMobileDevice();
        this.section = document.querySelector('.js-contact');
        this.links = document.querySelectorAll('.js-contact-link');
        this.linksInside = document.querySelectorAll('.js-contact-inside');
        this.cv = document.querySelector('.js-contact-cv');
        this.initContactTimeline();
        this.linksOnMouseHover();
        this.contactSphere = new ContactSphere();
    }

    linksOnMouseHover(){
        const refs = [
            'https://www.linkedin.com/in/elizabeth-shibut-46a924213/',
            'https://github.com/ShibutElizabeth/',
            'mailto:ellis.shybut@gmail.com',
            'https://wa.me/48796789201',
            '../../../Elizabeth_Shibut_CV.pdf'
        ];

        this.links.forEach((link, i) => {
            if(!this.isMobile) link.addEventListener('mouseenter', () => setItemHover(link, true));
            link.addEventListener('click', (e) => linkOnMouseClick(e, refs[i]));
        });

        if(!this.isMobile) this.cv.addEventListener('mouseenter', () => setItemHover(this.cv, true));
        this.cv.addEventListener('click', (e) => linkOnMouseClick(e, refs[4]));
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
                transform: 'translateY(110%)',
            }, {
                transform: 'translateY(0%)',
                stagger: 0.4,
                duration: 0.5,
                ease: 'power1.ease',
            });
        };
        
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
        });
        gsap.to(document.body, {
            onStart: links,
            scrollTrigger: {
                trigger: this.section,
                start: this.isMobile ? 'top 40%' :'top 30%',
                once: true,
            }
        });
    } 
}