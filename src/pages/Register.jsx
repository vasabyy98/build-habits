import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
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
// misc
import { fadeInPageTransition, fadeOutPageTransition } from "../animations/pageTransition";
// auth
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "../firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const register = (e) => {
    e.preventDefault();

    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  const navigate = useNavigate();
  const [switchState, setSwitchState] = useState(false);

  const navSwitch = useRef();
  const navSwitchWrapper = useRef();
  const navbar = useRef();
  const content = useRef();
  const spacerTop = useRef();
  const spacerBottom = useRef();

  useEffect(() => {
    if (loading) return;
    if (user) {
      navigateOut("/home");
    }
  }, [user, loading]);

  useLayoutEffect(() => {
    fadeInPageTransition(content.current);
    spacerTop.current.style.height = navbar.current.clientHeight / 2 + "px";
    spacerBottom.current.style.height = navbar.current.clientHeight + "px";
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

  const navigateOut = (url) => {
    const navigateFunc = () => {
      navigate(url);
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
        <div onClick={() => navigateOut("/login")} className={nav.nav__btn}>
          <BackArrow className={nav.nav__svg} />
        </div>
        <div onClick={signInWithGoogle} className={nav.nav__btn}>
          <Google className={nav.nav__svg} />
        </div>
      </nav>
      <div className={`${layout.flex__col__layout} content`}>
        <div className="spacerTop" ref={spacerTop}></div>
        <form onSubmit={register} className={`${form.form} ${layout.flex__col__inner__large}`}>
          <header className={layout.flex__col__inner__small}>
            <span className={header.header__large}>Let's sign you up</span>
            <p className={header.subheading}>
              <span className={header.mobile}>
                Make use of other sign up options by pressing menu.
              </span>
              <span className={header.desktop}>Make use of other sign up options down below.</span>
            </p>
          </header>
          <div className={`${layout.flex__col__inner__medium}`}>
            <header className={header.header__medium}>Your name</header>
            <input
              type="text"
              className={form.form__input}
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="type name here"
            />
          </div>
          <div className={`${layout.flex__col__inner__medium}`}>
            <header className={header.header__medium}>Your email</header>
            <input
              type="email"
              className={form.form__input}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="type email here"
            />
          </div>
          <div className={`${layout.flex__col__inner__medium}`}>
            <header className={header.header__medium}>Your password</header>
            <input
              type="password"
              className={form.form__input}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="type password here"
            />
          </div>
          <div className={`${layout.flex__col__inner__medium}`}>
            <button type="submit" className={btns.primary__btn}>
              Create account
            </button>
          </div>
        </form>
        <div className="spacerBottom" ref={spacerBottom}></div>
      </div>
    </div>
  );
}

export default Register;
