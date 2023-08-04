import gsap from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import RayCaster from '../../SceneUtils/RayCaster.class';
import { isMobileDevice } from '../../lib/utils';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default class SkillsController
{
    constructor(_story)
    {
        // Setup
        this.isMobile = isMobileDevice();
        this.story = _story;
        this.camera = this.story.camera;
        this.config = this.story.config;
        this.container = document.querySelector('#skills-container')
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
            { 
                name: 'GSAP', 
                experience: '3+ years', 
                descr: `I believe it's my favorite skill, because GSAP is a powerful tool for creating smooth, visually appealing and interactive user experiences.
                I'm really good at easing and timelines, transformations and transitions, scroll, SVG, path, motion and staggered animations (I'm craving to become a Club GSAP member). 
                I'm able to develop trigger animations based on user interactions such as clicks, hovers or other custom events.
                I integrate GSAP seamlessly with front-end frameworks like React, Vue.js, adapt animations to different screen sizes and orientations for a consistent experience
                and combine timelines and scroll-triggered effects to build complex interactive components.
                `}, 
            { 
                name: 'Typescript', 
                experience: '3+ years',
                descr: `I have a strong proficiency in TypeScript, since I worked on React.ts and Angular.ts projects. 
                I know basic syntax and types, interfaces, type declarations and annotations, OOP concepts, enums, type guards and assertions. I understand concepts of namespaces and their usage.
                I'm experienced with error handling, JavaScript to TypeScript migration, linting and tooling.`
            }, 
            { 
                name: 'React', 
                experience: '2 years', 
                descr: `I have a strong grasp of React and know how to build efficient, scalable, and interactive user interfaces. 
                I'm proficient in components creation and their reusability, props and state, component lifecycle, hooks, 
                event handling, conditional rendering, lists, forms, routing and navigation, context API, HTTP requests and data fetching,
                styling and CSS-in-JS. Also I have a good understanding of server-side rendering (worked with C# backend).`
            }, 
            { 
                name: 'CSS', 
                experience: '4+ years', 
                descr: `I have a deep and comprehensive understanding of CSS and create visually appealing, responsive and well-structured web interfaces that work consistently across different browsers. 
                I know how to develop a modular and scalable CSS architecture for large projects.
                I'm familiar with CSS methodologies, preprocessors, styling and effects, CSS-in-JS and styling libraries.`
            }, 
            { 
                name: 'Soft skills', 
                experience: '22+ years', 
                descr: `I'm attentive and responsive when others are speaking, ensuring a thorough understanding of requirements and concerns in both work and private life. 
                I have the ability to articulate ideas, ask questions and explain technical concepts clearly to team members, stakeholders and non-technical individuals.
                I'm capable to analyze complex problems, identify root causes and devise innovative solutions 
                and always open to new ideas and approaches, willing to adjust strategies based on changing requirements or feedback.
                My best features are proactive attitude toward acquiring new skills 
                and taking responsibility for my work and actions, acknowledging mistakes and seeking solutions.
                And also my friends and collegues say I have a good sense of humor :)
                `
            }, 
            { 
                name: 'Git', 
                experience: '5 years', 
                descr: `I understand the fundamental concepts of version control, including repositories, commits, branches and merges.
                I'm familiar with repository setup, collaboration with other developers by resolving merge conflicts.
                I know how to do cherry-pick commits from one branch and apply them to another and undo changes.
                I have experience with graphical user interfaces, large repositories and such platforms as GitHub, GitLab and Bitbucket.`
            }, 
            { 
                name: 'Javascript', 
                experience: '4+ years', 
                descr: 
                    `I'm familiar with core JavaScript concepts, OOP, asynchronous programming, ES6+ features, functional programming, DOM manipulation, cross-browser compatibility. 
                    I work with APIs (browser, axios). I'm one of the best error handlers and debuggers :) Had experience with performance optimization, tooling and build processes. 
                    I always stay up-to-date with the latest features, trends and best practices.`
            }, 
            { 
                name: 'Three.js', 
                experience: '2+ years', 
                descr: 
                    `I'm able to accomplish a wide range of tasks related to 3D graphics and interactive web development, such as scene creation and management, geometry and mesh manipulation, materials and shaders, animations (keyframe, morph target and skeletal), 
                    scene interactivity, physics simulation, importing external assets. I have experience with optimization, post-processing effects, plain WebGL and shader programming. 
                    Also I've started learning VR and AR integration and three-fiber. `
            }, 
            { 
                name: 'Vue.js', 
                experience: '1 year', 
                descr: 
                `I was working on two projects with Vue.js framework. My contribution was mostly about transitions and animations, 
                but during the process I also learnt Vue.js instance, templates and directives, computed properties and watchers, routing, state management,
                forms and user input, event handling, single file components and their reusability and composition.`}
        ];

        gsap.set([this.skillDescr, this.skillExperience], {
            opacity: 0,
        });
    }

    setRaycaster(){
        this.raycaster = new RayCaster(this.story);
    }

    sceneTransition(){
        const sceneTL = gsap.timeline();
        sceneTL.fromTo('#canvas-container-skills', {
            y: 0,
            x: 0,
        }, {
            x: this.isMobile ? '0' : '-5vw',
            y: this.isMobile ? '75vh' :'70vh',
            scrollTrigger: {
                trigger: this.container,
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
                trigger: this.container,
                start: 'top 50%',
                end: 'top 30%',
                scrub: 1
            }
        });
    }

    cameraTransition(){
        let position = {
            x: 5, 
            y: 4,
            z: 12,
            x2: 8.4,
            y2: 6,
            z2: 0.7
        };
        let controlsPos = {
            x: -5,
            y: 0.5,
            z: 0,
            x2: -1.15,
            y2: -1.25,
            z2: 0.18
        }
        if(this.isMobile){
            position = {
                x: 0, 
                y: 5,
                z: 10,
                x2: 5,
                y2: 12,
                z2: 1
            };
            controlsPos = {
                x: 1,
                y: 1,
                z: 1,
                x2: -2,
                y2: -3,
                z2: 0
            }
        };
        const camTL = gsap.timeline();
        camTL
        .fromTo(this.camera.instance.position, {
            x: position.x,
            y: position.y,
            z: position.z,
        }, {
            x: position.x2,
            y: position.y2,
            z: position.z2,
            scrollTrigger: {
                trigger: this.container,
                start: 'top 90%',
                end: 'top 30%',
                scrub: 1
            }
        })
        .fromTo(this.camera.controls.target, {
            x: controlsPos.x,
            y: controlsPos.y,
            z: controlsPos.z,
        }, {
            x: controlsPos.x2,
            y: controlsPos.y2,
            z: controlsPos.z2,
            scrollTrigger: {
                trigger: this.container,
                start: 'top 90%',
                end: 'top 30%',
                scrub: 1,
            },
        })
    }

    show = () => 
    gsap.timeline()
    .fromTo(this.skillName, {
        transform: 'translateY(110%)',
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

    hide = (index) => 
    gsap.timeline()
    .to([this.skillExperience, this.skillDescr], {
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        ease: 'power1.easeOut',
    })
    .to(this.skillLine, {
        transform: 'scaleX(0)',
        duration: 0.3,
        delay: 0.1,
    })
    .to(this.skillName, {
        transform: 'translateY(102%)',
        duration: 0.3,
        delay: 0.1,
        ease: 'power1.easeOut',
        onComplete: () => this.changeDescription(index),
    });

    changeDescription = (index) => {
        if(index != -1){
            this.skillName.innerHTML = this.skillsDescriptions[index].name;
            this.skillExperience.innerHTML = this.skillsDescriptions[index].experience;
            this.skillDescr.innerHTML = this.skillsDescriptions[index].descr;
            this.show();
        }
    }

    initDecoration(){
        const header = document.querySelector('.js-skills-header');
        const mark = document.querySelector('.js-skills-mark');

        const tl = gsap.timeline();
        tl
        .fromTo(header, {
            transform: 'translateX(-102%)',
        }, {
            transform: 'translateX(0%)',
            duration: 0.6,
            ease: 'power1.easeOut',
            scrollTrigger: {
                trigger: this.container,
                start: 'top 60%',
                end: 'top 30%',
                scrub: 1
            }
        })
        .fromTo(mark, {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 0.2,
            delay: 0.1,
            ease: 'power1.easeOut',
            scrollTrigger: {
                trigger: this.container,
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