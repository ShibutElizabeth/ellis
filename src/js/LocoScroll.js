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
    locoScroll.on("scroll", () => scaleCursor(false));
    ScrollTrigger.scrollerProxy("body", {
        scrollTop(value) {
          return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y;
        }
    });
}
