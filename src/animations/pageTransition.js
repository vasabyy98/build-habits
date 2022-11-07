import { gsap } from "gsap";

export const fadeOutPageTransition = function (domElement, navigateFunc) {
  gsap.to(domElement, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => navigateFunc(),
  });
};
