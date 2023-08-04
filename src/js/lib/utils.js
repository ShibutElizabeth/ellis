import gsap from 'gsap';
import debounce from './debounce';

const cursor = document.querySelector('.js-cursor');
const sm = document.querySelectorAll('.js-cursor-sm');

export function isMobileDevice () {
    return ( ( window.innerWidth <= 900 ) && ( window.innerHeight <= 1300 ) );
}

export function scaleCursor(bigger) {
    
    if(bigger){
        gsap.to(cursor, {
            scale: 1.5,
            duration: 0.2,
            ease: 'power1.easeIn',
        });
    } else {
        gsap.to(cursor, {
            scale: 1,
            duration: 0.2,
            ease: 'power1.easeIn',
        });
    }   
}

export function clickCursor() {
    gsap.to(sm, {
        scale: 1.4,
        stagger: 0.1,
        duration: 0.2,
        ease: 'power1.easeIn',
        yoyo: true,
        repeat: 1
    });
}

export function linkOnMouseClick(e, ref) {
    e.preventDefault();
    window.open(ref, "_blank");
};

export function setItemHover(self, scale) {
    let hover = false;

    const onHover = (x, y) => {
      gsap.to(self, {
        x: x * 0.15,
        y: y * 0.15,
        scaleX: scale ? 1.4 : 1,
        scaleY: scale ? 1.2 : 1,
        duration: 1,
        ease: 'power1.easeIn',
      });
      scaleCursor(true);
    };

    const onLeave = () => {
      gsap.to(self, {
        x: 0,
        y: 0,
        scaleX: scale ? 1.3 : 1,
        scaleY: 1,
        duration: 1,
        ease: 'elastic.easeOut.config(1.2, 0.4)',
      });
      scaleCursor(false);
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