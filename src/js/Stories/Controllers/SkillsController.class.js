import gsap from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import RayCaster from '../../SceneUtils/RayCaster.class';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default class SkillsController
{
    constructor(_story)
    {

        // Setup
        this.story = _story;
        this.camera = this.story.camera;
        this.config = this.story.config;
        this.skillName = document.querySelector('.js-skill-name');
        this.skillExperience = document.querySelector('.js-skill-experience');
        this.skillDescr = document.querySelector('.js-skill-descr');
        this.skillLine = document.querySelector('.js-skill-line');
        this.prevIndex = -1;
        this.cameraTransition();
        this.sceneTransition();
        this.initDecoration();
        this.setDescription();

        this.skillsDescriptions = [
            { name: 'GSAP', experience: '3+ years', descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus sunt, earum nemo veritatis blanditiis fugiat vel, labore cumque mollitia impedit quam accusamus cupiditate nisi, perferendis architecto ut sit quis culpa!'}, 
            { name: 'Typescript', experience: '3+ years', descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus sunt, earum nemo veritatis blanditiis fugiat vel, labore cumque mollitia impedit quam accusamus cupiditate nisi, perferendis architecto ut sit quis culpa!'}, 
            { name: 'React', experience: '2 years', descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus sunt, earum nemo veritatis blanditiis fugiat vel, labore cumque mollitia impedit quam accusamus cupiditate nisi, perferendis architecto ut sit quis culpa!'}, 
            { name: 'CSS', experience: '5 years', descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus sunt, earum nemo veritatis blanditiis fugiat vel, labore cumque mollitia impedit quam accusamus cupiditate nisi, perferendis architecto ut sit quis culpa!'}, 
            { name: 'Node.js', experience: '3+ years', descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus sunt, earum nemo veritatis blanditiis fugiat vel, labore cumque mollitia impedit quam accusamus cupiditate nisi, perferendis architecto ut sit quis culpa!'}, 
            { name: 'Git', experience: '5 years', descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus sunt, earum nemo veritatis blanditiis fugiat vel, labore cumque mollitia impedit quam accusamus cupiditate nisi, perferendis architecto ut sit quis culpa!'}, 
            { name: 'Javascript', experience: '4 years', descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus sunt, earum nemo veritatis blanditiis fugiat vel, labore cumque mollitia impedit quam accusamus cupiditate nisi, perferendis architecto ut sit quis culpa!'}, 
            { name: 'Three.js', experience: '2+ years', descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus sunt, earum nemo veritatis blanditiis fugiat vel, labore cumque mollitia impedit quam accusamus cupiditate nisi, perferendis architecto ut sit quis culpa!'}, 
            { name: 'Vue.js', experience: '1 year', descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus sunt, earum nemo veritatis blanditiis fugiat vel, labore cumque mollitia impedit quam accusamus cupiditate nisi, perferendis architecto ut sit quis culpa!'}
        ];

        gsap.set([this.skillDescr, this.skillExperience], {
            opacity: 0,
        });
        // gsap.set(this.skillName, {
        //     transform: 'translateY(0%)'
        // });
        // gsap.set(this.skillLine, {
        //     transform: 'scaleX(1)'
        // })
    }

    setRaycaster(){
        this.raycaster = new RayCaster(this.story);
    }

    sceneTransition(){
        const sceneTL = gsap.timeline();
        sceneTL.fromTo('#canvas-container-skills', {
            y: 0,
        }, {
            y: '60vh',
            scrollTrigger: {
                trigger: '#skills-container',
                start: 'top 90%',
                end: 'top 50%',
                scrub: 1
            }
        });
    }

    setDescription(){
        const element = document.querySelector('.js-description');
        const tl = gsap.timeline();
        tl.fromTo(element, {
            opacity: 0,
        }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '#skills-container',
                start: 'top 50%',
                end: 'top 30%',
                scrub: 1
            }
        })
    }

    cameraTransition(){
        const camTL = gsap.timeline();
        camTL.fromTo(this.camera.instance.position, {
            x: 6,
            y: 6,
            z: 15,
        }, {
            x: 9.6,
            y: 6.5,
            z: 1,
            scrollTrigger: {
                trigger: '#skills-container',
                start: 'top 90%',
                end: 'top 30%',
                scrub: 1
            }
        }).fromTo(this.camera.controls.target, {
            x: -5,
            y: 1,
            z: 1,
        }, {
            x: -1.15,
            y: 0.6,
            z: 0.18,
            scrollTrigger: {
                trigger: '#skills-container',
                start: 'top 90%',
                end: 'top 30%',
                scrub: 1,
            },
        })
    }

    show = () => gsap.timeline().fromTo(this.skillName, {
        transform: 'translateY(102%)',
    }, {
        transform: 'translateY(0%)',
        duration: 0.3,
        ease: 'power1.easeOut',
    })
    .fromTo(this.skillLine, {
        transform: 'scaleX(0)',
    },{
        transform: 'scaleX(1)',
        duration: 0.3,
        delay: 0.1,
    })
    .fromTo([this.skillExperience, this.skillDescr], { 
        opacity: 0,
    },{
        opacity: 1,
        delay: 0.1,
        duration: 0.3,
        ease: 'power1.easeOut',
    });

    hide = (index) => gsap.timeline().to([this.skillExperience, this.skillDescr], {
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        ease: 'power1.easeOut',
        // onComplete: () => changeDescription(),
    })
    .to(this.skillLine, {
        transform: 'scaleX(0)',
        duration: 0.3,
        delay: 0.1,
    })
    .to(this.skillName, {
    //     transform: 'translateY(0%)',
    // },{
        transform: 'translateY(102%)',
        duration: 0.3,
        delay: 0.1,
        ease: 'power1.easeOut',
        onComplete: () => this.changeDescription(index),
    });

    changeDescription = (index) => {
        this.skillName.innerHTML = this.skillsDescriptions[index].name;
        this.skillExperience.innerHTML = this.skillsDescriptions[index].experience;
        this.skillDescr.innerHTML = this.skillsDescriptions[index].descr;
        this.show();
    }

    initDecoration(){
        const header = document.querySelector('.js-skills-header');
        const mark = document.querySelector('.js-skills-mark');

        const tl = gsap.timeline();
        tl.fromTo(header, {
            transform: 'translateX(-102%)',
        }, {
            transform: 'translateX(0%)',
            duration: 0.6,
            ease: 'power1.easeOut',
            scrollTrigger: {
                trigger: '#skills-container',
                start: 'top 60%',
                end: 'top 30%',
                scrub: 1
            }
        }).fromTo(mark, {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 0.2,
            delay: 0.1,
            ease: 'power1.easeOut',
            scrollTrigger: {
                trigger: '#skills-container',
                start: 'top 40%',
                end: 'top 30%',
                scrub: 1
            }
        });
    }

    sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}