import React, { useRef, useState, useLayoutEffect, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
// css
import layout from "../css/layout.module.css";
import header from "../css/header.module.css";
import form from "../css/form.module.css";
import btns from "../css/btns.module.css";
import nav from "../css/nav.module.css";
// assets
import SignOut from "../assets/signout.svg";
import Home from "../assets/home.svg";
import Hamburger from "../assets/hamburger.svg";
import Close from "../assets/close.svg";
// misc
import { fadeInPageTransition, fadeOutPageTransition } from "../animations/pageTransition";
// auth
import { logout } from "../firebase";
// firebase crud
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
// dates
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

function CreateHabit() {
  // date test
  const [value, setValue] = useState(dayjs(new Date()));
  // date test end
  const navigate = useNavigate();

  const [habitName, setHabitName] = useState("");
  const [weekdays, setWeekdays] = useState([
    { day: "Monday", domText: "m" },
    { day: "Tuesday", domText: "t" },
    { day: "Wednesday", domText: "w" },
    { day: "Thursday", domText: "t" },
    { day: "Friday", domText: "f" },
    { day: "Saturday", domText: "s" },
    { day: "Sunday", domText: "s" },
  ]);
  const [frequency, setFrequency] = useState([]);

  const habitsCollectionRef = collection(db, `users/${auth.currentUser.uid}/habits`);

  const [switchState, setSwitchState] = useState(false);

  const navSwitch = useRef();
  const navSwitchWrapper = useRef();
  const navbar = useRef();
  const content = useRef();
  const spacerTop = useRef();
  const spacerBottom = useRef();

  useLayoutEffect(() => {
    fadeInPageTransition(content.current);
    spacerTop.current.style.height = navbar.current.clientHeight / 2 + "px";
    spacerBottom.current.style.height = navbar.current.clientHeight + "px";
  }, []);

  const createHabit = async () => {
    await addDoc(habitsCollectionRef, {
      habitName,
    }).then(() => {
      navigate("/home");
    });
  };

  const checkboxHandler = (e) => {
    if (e.target.checked === true) {
      setFrequency([...frequency, e.target.value]);
    } else {
      setFrequency([...frequency.filter((exercise) => exercise !== e.target.value)]);
    }
  };

  const onLogout = (url) => {
    const navigateFunc = () => {
      navigate(url);
      logout();
    };
    fadeOutPageTransition(content.current, navigateFunc);
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

  const navigateOut = (url) => {
    const navigateFunc = () => {
      navigate(url);
    };
    fadeOutPageTransition(content.current, navigateFunc);
  };

  const muiSelected = `& .MuiPickersDay-dayWithMargin[aria-selected=${"yes"}]`;
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
        <div onClick={() => navigateOut("/home")} className={nav.nav__btn}>
          <Home className={nav.nav__svg} />
        </div>
      </nav>
      <div className={`${layout.flex__col__layout} content`}>
        <div className="spacerTop" ref={spacerTop}></div>
        <div className={`${layout.flex__col__inner__large}`}>
          <header className={layout.flex__col__inner__small}>
            <span className={header.header__large}>Create habit</span>
          </header>
          <div className={`${layout.flex__col__inner__medium}`}>
            <header className={header.header__medium}>Habit name</header>
            <input
              type="text"
              className={form.form__input}
              name="habit"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder="type habit name here"
            />
          </div>
          <div className={`${layout.flex__col__inner__medium}`}>
            <header>
              <span className={header.header__medium}>Frequency</span>
              <p className={header.subheading}>How many days per week?</p>
            </header>
            <div className={form.checkbox__wrapper}>
              {weekdays.map((day) => (
                <div key={day.day} className={form.checkbox__item}>
                  <input
                    type="checkbox"
                    name="frequency"
                    value={day.day}
                    className={form.checkbox__input}
                    onClick={checkboxHandler}
                  />
                  <span className={form.checkbox__name}>{day.domText}</span>
                </div>
              ))}
            </div>
          </div>
          {/* date test */}
          <div className={`${layout.flex__col__inner__medium}`}>
            <header>
              <span className={header.header__medium}>Start date</span>
            </header>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                className={btns.date__input__btn}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                inputFormat="dddd MM, YYYY"
                DialogProps={{
                  sx: {
                    "& .MuiBackdrop-root": {
                      backdropFilter: "blur(1rem)",
                      transition: ".3s ease-out !important",
                    },
                    "& .MuiPaper-root": {
                      borderRadius: "1rem",
                      width: "100%",
                      margin: "5vw",
                      height: "auto",
                      background: "var(--bg-color)",
                      color: "var(--text-primary-color)",
                    },
                    "& .MuiPickersToolbar-root": {
                      // padding: "1.25rem",
                    },
                    "& .MuiCalendarOrClockPicker-root": {
                      padding: "1.25rem",
                      gap: "1rem",
                    },
                    "& .MuiPickersToolbar-root": {
                      padding: 0,
                    },
                    "& .MuiTypography-overline": {
                      display: "none",
                    },
                    "& .MuiTypography-h4": {
                      fontFamily: "inherit",
                      fontSize: "1.5rem",
                      fontFamily: "PPPangramSansRounded-Semibold",
                    },
                    "& .MuiPickersToolbar-penIconButton": {
                      display: "none",
                    },
                    "& .css-epd502": {
                      margin: "unset",
                      width: "100%",
                    },
                    "& .MuiCalendarPicker-root": {
                      margin: "unset",
                      width: "100%",
                      gap: "1rem",
                      height: "auto",
                      overflow: "hidden",
                    },
                    "& .MuiPickersCalendarHeader-labelContainer": {
                      fontFamily: "inherit",
                    },
                    "& .MuiPickersCalendarHeader-switchViewButton": {
                      display: "none",
                    },
                    "& .MuiPickersArrowSwitcher-button": {
                      color: "var(--text-primary-color)",
                    },
                    "& .MuiPickersCalendarHeader-root": {
                      margin: 0,
                      padding: 0,
                    },
                    "& .MuiDayPicker-header": {
                      justifyContent: "space-between",
                    },
                    "& .MuiDayPicker-weekDayLabel": {
                      // width: "auto",
                      // height: "auto",
                      fontFamily: "inherit",
                      flexGrow: 1,
                      color: "var(--text-secondary-color)",
                    },
                    "& .PrivatePickersSlideTransition-root": {
                      height: "100%",
                      minHeight: "200px",
                      overflowY: "hidden",
                    },
                    "& .MuiPickersDay-dayWithMargin": {
                      flexGrow: 1,
                      borderRadius: ".75rem",
                      fontFamily: "inherit",
                      background: "var(--bg-color)",
                      color: "var(--text-primary-color)",
                    },
                    "& .MuiPickersDay-dayWithMargin:hover": {
                      background: "var(--accent-color)",
                      color: "var(--bg-color)",
                    },
                    muiSelected: {
                      background: "var(--accent-color)",
                      color: "var(--bg-color)",
                    },
                    "& .Mui-selected": {
                      background: "var(--accent-color)",
                      color: "var(--bg-color)",
                    },
                    "& .MuiDialogActions-root": {
                      padding: 0,
                      margin: "0 5vw 5vw",
                      gap: "1rem",
                      justifyContent: "spaceAround",
                    },
                    "& .MuiButton-root": {
                      color: "var(--text-primary-color)",
                      background: "var(--nav-item-bg-color)",
                      fontSize: "1rem",
                      fontFamily: "inherit",
                      textTransform: "capitalize",
                      padding: "1.25rem 0",
                      flex: 1,
                      lineHeight: "normal",
                      borderRadius: "1rem",
                      margin: 0,
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    "& .MuiInputBase-input": {
                      padding: 0,
                      height: "unset",
                      lineHeight: "normal",
                      color: "var(--text-primary-color)",
                      fontFamily: "PPPangramSansRounded-Medium",
                    },
                    "& .MuiOutlinedInput-notchedOutline": { border: "none", cursor: "pointer" },
                    "& .MuiFormLabel-root": { display: "none" },
                  },
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          {/* date test end */}
          <div className={`${layout.flex__col__inner__medium}`}>
            <button
              onClick={(e) => {
                e.preventDefault();
                createHabit();
              }}
              className={btns.primary__btn}
            >
              Create habit
            </button>
          </div>
        </div>
        <div className="spacerBottom" ref={spacerBottom}></div>
      </div>
    </div>
  );
}

export default CreateHabit;
