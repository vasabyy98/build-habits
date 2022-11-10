import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// css
import layout from "../css/layout.module.css";
import header from "../css/header.module.css";
import form from "../css/form.module.css";
import btns from "../css/btns.module.css";
import nav from "../css/nav.module.css";
import home from "../css/home.module.css";
// assets
import SignOut from "../assets/signout.svg";
import Hamburger from "../assets/hamburger.svg";
import Close from "../assets/close.svg";
// misc
import { fadeInPageTransition, fadeOutPageTransition } from "../animations/pageTransition";
// auth
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { logout } from "../firebase";

function Home() {
  document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
  });
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  const [switchState, setSwitchState] = useState(false);

  const navSwitch = useRef();
  const navSwitchWrapper = useRef();
  const navbar = useRef();
  const content = useRef();
  const spacerTop = useRef();
  const spacerBottom = useRef();

  const homeNavWrapper = useRef();
  const habitsLink = useRef();
  const dailyLink = useRef();
  const todoLink = useRef();
  const [selectedLink, setSelectedLink] = useState({ dom: dailyLink.current, id: "dailyLink" });

  useEffect(() => {
    setSelectedLink({ dom: dailyLink.current, id: "dailyLink" });
  }, [dailyLink]);

  const activeCircle = useRef();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/");

    //
    homeNavWrapper.current.style.height = homeNavWrapper.current.clientHeight + "px";
    let offsetLeft = dailyLink.current.offsetLeft;
    let width = dailyLink.current.offsetWidth / 2;
    let circleWidth = activeCircle.current.offsetWidth / 2;

    activeCircle.current.style.left = offsetLeft + width - circleWidth + "px";
  }, [user, loading]);

  useEffect(() => {
    if (selectedLink.dom !== undefined) {
      selectedLink.dom.classList.add(home.nav__item__active);
      let offsetLeft = selectedLink.dom.offsetLeft;
      let width = selectedLink.dom.offsetWidth / 2;
      let circleWidth = activeCircle.current.offsetWidth / 2;

      activeCircle.current.style.left = offsetLeft + width - circleWidth + "px";
    }
  }, [selectedLink]);

  useLayoutEffect(() => {
    fadeInPageTransition(content.current);
    spacerTop.current.style.height = navbar.current.clientHeight / 2 + "px";
    spacerBottom.current.style.height = navbar.current.clientHeight + "px";
  }, []);

  const handleLink = (e) => {
    selectedLink.dom.classList.remove(home.nav__item__active);

    setSelectedLink((prevState) => ({
      ...prevState,
      dom: e.target.parentNode,
      id: e.target.value,
    }));
  };

  const navSwitchHandler = () => {
    if (!switchState) {
      setSwitchState(true);
      navSwitchWrapper.current.classList.add(nav.hideSwitch);
      navSwitch.current.children[0].style.opacity = 0;
      navSwitch.current.children[1].style.opacity = 1;

      navbar.current.classList.add(nav.showNavbar);
    } else {
      setSwitchState(false);
      navSwitchWrapper.current.classList.remove(nav.hideSwitch);
      navSwitch.current.children[0].style.opacity = 1;
      navSwitch.current.children[1].style.opacity = 0;

      navbar.current.classList.remove(nav.showNavbar);
    }
  };

  const onLogout = (url) => {
    const navigateFunc = () => {
      navigate(url);
      logout();
    };
    fadeOutPageTransition(content.current, navigateFunc);
  };

  return (
    <div ref={content} className="container">
      <div onClick={navSwitchHandler} ref={navSwitchWrapper} className={nav.nav__switch__wrapper}>
        <div ref={navSwitch} className={nav.nav__switch}>
          <Hamburger className={nav.nav__svg} />
          <Close className={`${nav.nav__svg} ${nav.nav__svg__close}`} />
        </div>
      </div>
      <nav ref={navbar} className={nav.fixed__nav}>
        <div onClick={() => onLogout("/")} className={nav.nav__btn}>
          <SignOut className={nav.nav__svg} />
        </div>
      </nav>
      <div className="content">
        <div className="spacerTop" ref={spacerTop}></div>
        <div className={home.home__ui}>
          <header>
            <p className={header.subheading}>Good day,</p>{" "}
            <span className={header.header__large}>{user.displayName}</span>
          </header>
          <div ref={homeNavWrapper} className={home.home__nav}>
            <span ref={activeCircle} className={home.nav__item__active__circle}>
              ●
            </span>
            <div ref={habitsLink} id="habitsLink" className={home.nav__item}>
              <span className={home.nav__item__circle}>●</span>
              <input
                onClick={handleLink}
                id="habits"
                type="radio"
                value="habitsLink"
                name="nav"
                className={home.nav__item__radio}
              />
              <label className={home.nav__item__label} htmlFor="habits">
                Habits
              </label>
            </div>
            <div
              ref={dailyLink}
              id="dailyLink"
              className={`${home.nav__item} ${home.nav__item__active}`}
            >
              <span className={home.nav__item__circle}>●</span>
              <input
                onClick={handleLink}
                id="daily"
                type="radio"
                value="dailyLink"
                name="nav"
                className={home.nav__item__radio}
              />
              <label className={home.nav__item__label} htmlFor="daily">
                Daily
              </label>
            </div>
            <div ref={todoLink} id="todoLink" className={home.nav__item}>
              <span className={home.nav__item__circle}>●</span>
              <input
                onClick={handleLink}
                id="todo"
                type="radio"
                value="todoLink"
                name="nav"
                className={home.nav__item__radio}
              />
              <label className={home.nav__item__label} htmlFor="todo">
                Single tasks
              </label>
            </div>
          </div>
        </div>
        <div className="spacerBottom" ref={spacerBottom}></div>
      </div>
    </div>
  );
}

export default Home;
