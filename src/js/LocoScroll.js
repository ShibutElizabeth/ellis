import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { scaleCursor } from "./lib/utils";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export function initScroll(){
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
    })
    locoScroll.on("scroll", () => {
        scaleCursor(false);
        ScrollTrigger.update();
    });
    ScrollTrigger.scrollerProxy("body", {
        scrollTop(value) {
          return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
              left: 0,
              top: 0,
              width: window.innerWidth,
              height: window.innerHeight
            };
        },
        pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}
