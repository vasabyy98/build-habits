import React, { useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
// assets
import CircularText from "../assets/circular-text-white.svg";
// css
import layout from "../css/layout.module.css";
// misc
import { fadeInPageTransition, fadeOutPageTransition } from "../utils/animations/pageTransition";

function Index() {
  const navigate = useNavigate();
  const content = useRef();

  useLayoutEffect(() => {
    fadeInPageTransition(content.current);
  }, []);

  const onClick = () => {
    const navigateFunc = function () {
      navigate("/login");
    };

    fadeOutPageTransition(content.current, navigateFunc);
  };
  return (
    <div style={{ overflow: "hidden" }} onClick={onClick} className="container">
      <div ref={content} className={`content ${layout.flex__col__layout}`}>
        <div className="index__svg__wrapper">
          <CircularText className="index__svg" />
        </div>
        <p className="index__subheading">
          A framework for building habits, tracking progress and improving your discipline.
        </p>
        <span className="index__cta">Press anywhere to proceed...</span>
      </div>
    </div>
  );
}

export default Index;
