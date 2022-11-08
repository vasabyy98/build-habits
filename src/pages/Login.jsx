import React, { useRef, useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
// css
import layout from "../css/layout.module.css";
import header from "../css/header.module.css";
import form from "../css/form.module.css";
import btns from "../css/btns.module.css";
import nav from "../css/nav.module.css";
// assets
import BackArrow from "../assets/backArrow.svg";
import Google from "../assets/google.svg";
import Hamburger from "../assets/hamburger.svg";
import Close from "../assets/close.svg";
import Apple from "../assets/apple.svg";
// misc
import { fadeInPageTransition, fadeOutPageTransition } from "../animations/pageTransition";

function Login() {
  const navigate = useNavigate();
  const [switchState, setSwitchState] = useState(false);

  const navSwitch = useRef();
  const navSwitchWrapper = useRef();
  const navbar = useRef();
  const content = useRef();
  const spacer = useRef();

  useLayoutEffect(() => {
    fadeInPageTransition(content.current);
    spacer.current.style.height = navbar.current.clientHeight + "px";
  }, []);

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

  const navigateBack = () => {
    const navigateFunc = function () {
      navigate("/");
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
        <div onClick={navigateBack} className={nav.nav__btn}>
          <BackArrow className={nav.nav__svg} />
        </div>
        <div onClick={navigateBack} className={nav.nav__btn}>
          <Google className={nav.nav__svg} />
        </div>
        <div onClick={navigateBack} className={nav.nav__btn}>
          <Apple className={nav.nav__svg} />
        </div>
      </nav>
      <div className={`${layout.flex__col__layout} content`}>
        <form className={`${form.form} ${layout.flex__col__inner__large}`}>
          <header className={layout.flex__col__inner__small}>
            <span className={header.header__large}>Let's sign you in</span>
            <p className={header.subheading}>Make use of other sign in options by pressing menu.</p>
          </header>
          <div className={`${layout.flex__col__inner__medium}`}>
            <header className={header.header__medium}>Your email</header>
            <input
              type="email"
              className={form.form__input}
              id="email"
              name="email"
              // value={email}
              // onChange={onChange}
              placeholder="type email here"
            />
          </div>
          <div className={`${layout.flex__col__inner__medium}`}>
            <header className={header.header__medium}>Your password</header>
            <input
              type="email"
              className={form.form__input}
              id="email"
              name="email"
              // value={email}
              // onChange={onChange}
              placeholder="type password here"
            />
          </div>
          <div className={`${layout.flex__col__inner__medium}`}>
            <button className={btns.primary__btn}>Login</button>
            <button className={btns.secondary__btn}>Create account</button>
          </div>
        </form>
        <div className="spacer" ref={spacer}></div>
      </div>
    </div>
  );
}

export default Login;
