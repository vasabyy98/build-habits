import { gsap } from "gsap";

export const fadeOutPageTransition = function (domElement, navigateFunc) {
  gsap.to(domElement, {
    opacity: 0,
    duration: 0.33,
    onComplete: () => navigateFunc(),
  });
};

export const fadeInPageTransition = function (domElement, delay) {
  gsap.fromTo(
    domElement,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.33,
      delay: 0.3,
    }
  );
};

export const fadeOutTransition = function (domElement) {
  gsap.to(domElement, {
    opacity: 0,
    duration: 0.33,
  });
};

export const fadeInTransition = function (domElement, delay) {
  gsap.fromTo(
    domElement,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.33,
      delay: delay ? delay : 0.3,
    }
  );
};
