/* eslint-disable */
// @ts-nocheck
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import { generateScrollHandler } from "./locomotive-handler";

gsap.registerPlugin(ScrollTrigger);

const fakeSections = document.querySelectorAll('.js-scroll-section');

const locoScroll = new LocomotiveScroll(
  {
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    getDirection: true,
    direction: "vertical",
    multiplier: 1,
    firefoxMultiplier: 50,
    touchMultiplier: 1,
    smartphone: {
      smooth: true,
      direction: "vertical",
    },
  }
);

window.addEventListener("resize", handleResize);

const abs = Array.prototype.slice.call(document.querySelectorAll('.js-abs'));

let sf = (Array.prototype.slice.call(fakeSections)).slice(0, 11);
sf.push(...abs);

const scrollHandler = generateScrollHandler(sf, locoScroll);
const finalFrame = fakeSections[fakeSections.length - 1];

const scrollEvent = () => {
  locoScroll.on("scroll", (event) => {
  if (scrollHandler.getIsAnimating()) return scrollHandler.handleTimer();

  const finalFrameTopPos = finalFrame.getBoundingClientRect().top;
  
  if (finalFrameTopPos < 0) {
    // then we are past the hero banner
    return;
  } else {
    const scrollDir = event.direction;
    const currentIndex = scrollHandler.getCurrentIndex();
    if (scrollDir === "up" && currentIndex === 0) return;
    else {
      scrollHandler.setIsAnimating(true);
      scrollHandler.scrollDirFunc(scrollDir);
      const idx = scrollHandler.getCurrentIndex();
      locoScroll.scrollTo(fakeSections[idx]);
      ScrollTrigger.refresh();
    }
  }
});
}

ScrollTrigger.scrollerProxy("body", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
});


function handleResize () {
  ScrollTrigger.refresh();
}

scrollEvent();
export { locoScroll };