import { gsap } from "gsap";

export const fadeOutPageTransition = function (domElement, navigateFunc) {
  gsap.to(domElement, {
    opacity: 0,
    duration: 0.33,
    onComplete: () => navigateFunc(),
  });
};

export const fadeInPageTransition = function (domElement) {
  gsap.fromTo(
    domElement,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.33,
    }
  );
};
