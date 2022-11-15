import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// css
import layout from "../css/layout.module.css";
import header from "../css/header.module.css";
import form from "../css/form.module.css";
import btns from "../css/btns.module.css";
import nav from "../css/nav.module.css";
import select from "../css/select.module.css";
// assets
import SignOut from "../assets/signout.svg";
import Home from "../assets/home.svg";
import Hamburger from "../assets/hamburger.svg";
import Close from "../assets/close.svg";
// misc
import {
  fadeInPageTransition,
  fadeOutPageTransition,
  fadeOutTransition,
  fadeInTransition,
} from "../utils/animations/pageTransition";
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
// date component props
const dialogProps = {
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
      transition: ".3s ease-out",
    },
    "& .MuiPickersDay-dayWithMargin:hover": {
      background: "var(--accent-color)",
      color: "var(--bg-color)",
    },
    "& .MuiPickersDay-today": {
      borderColor: "var(--text-secondary-color) !important",
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
    "& .MuiDialogActions-root > :not(:first-of-type)": {
      margin: 0,
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
      transition: "scale .3s ease-out",
    },
    "& .MuiButton-root:hover": {
      backgroundColor: "var(--nav-item-bg-color)",
    },
    "& .MuiButton-root:active": {
      scale: "0.95",
    },
    "& .MuiTouchRipple-root": {
      display: "none",
    },
  },
};
const inputProps = {
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
};

function CreateHabit() {
  const habitsCollectionRef = collection(db, `users/${auth.currentUser.uid}/habits`);

  const content = useRef();
  const spacerTop = useRef();
  const spacerBottom = useRef();

  useLayoutEffect(() => {
    fadeInPageTransition(content.current);
    spacerTop.current.style.height = navbar.current.clientHeight / 2 + "px";
    spacerBottom.current.style.height = navbar.current.clientHeight + "px";
  }, []);

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

  const checkboxHandler = (e) => {
    if (e.target.checked === true) {
      setFrequency([...frequency, e.target.value]);
    } else {
      setFrequency([...frequency.filter((exercise) => exercise !== e.target.value)]);
    }
  };

  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [noneBtnIsActive, setNoneBtnIsActive] = useState(true);
  const noneBtnRef = useRef();

  const noneBtnHandler = () => {
    setNoneBtnIsActive(true);
  };

  useEffect(() => {
    if (noneBtnIsActive === true) {
      noneBtnRef.current.classList.add(btns.none__btn__active);
    } else {
      noneBtnRef.current.classList.remove(btns.none__btn__active);
    }
  }, [noneBtnIsActive]);

  const trackTimeNoneBtnRef = useRef();
  const [trackType, setTrackType] = useState({ value: "none", dom: null });

  const trackTimeInputHandler = (e) => {
    setTrackType((prev) => ({
      ...prev,
      value: e.target.value,
      dom: e.target,
    }));
    setTrackType(e.target.value);
  };

  useEffect(() => {
    trackTimeNoneBtnRef.current.checked = true;
  }, []);

  const [trackTime, setTrackTime] = useState({ time: "Press to set duration", metric: "" });
  const selectDialog = useRef();
  const timeTrackRef = useRef();

  const handleSetTrackTime = (e) => {
    setTimeout(() => {
      selectDialog.current.classList.remove(select.show);
    }, 300);

    setTrackTime((prev) => ({
      ...prev,
      time: e.target.value,
    }));
  };

  useEffect(() => {
    if (trackType === "time") {
      fadeOutTransition(customTrackRef.current);
      fadeInTransition(timeTrackRef.current);
    }
    if (trackType === "custom") {
      fadeOutTransition(timeTrackRef.current);
      fadeInTransition(customTrackRef.current);
    }
  }, [trackType]);

  const [customTrack, setCustomTrack] = useState({ customAmount: "", customMetric: "" });
  const customTrackRef = useRef();

  const handleSetCustomTrack = (e) => {
    setCustomTrack((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const navSwitch = useRef();
  const navSwitchWrapper = useRef();
  const navbar = useRef();
  const [switchState, setSwitchState] = useState(false);

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

  const createHabit = async () => {
    await addDoc(habitsCollectionRef, {
      habitName,
    }).then(() => {
      navigateOut("/home");
    });
  };

  const onLogout = (url) => {
    const navigateFunc = () => {
      navigate(url);
      logout();
    };
    fadeOutPageTransition(content.current, navigateFunc);
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
        <div onClick={() => navigateOut("/home")} className={nav.nav__btn}>
          <Home className={nav.nav__svg} />
        </div>
      </nav>
      <div className={`${layout.flex__col__layout} content`}>
        <div className="spacerTop" ref={spacerTop}></div>
        <div className={`${layout.flex__col__inner__large}`}>
          <header className={layout.flex__col__inner__small}>
            <span className={header.header__large}>Create habit</span>
            <p className={header.subheading}>Fill up the form below.</p>
          </header>
          {/* habit name */}
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
          {/* frquency */}
          <div className={`${layout.flex__col__inner__medium}`}>
            <header className={layout.flex__col__inner__small}>
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
          {/* start date */}
          <div className={`${layout.flex__col__inner__medium}`}>
            <header>
              <span className={header.header__medium}>Start date</span>
            </header>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                className={btns.date__input__btn}
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                inputFormat="DD MMMM, YYYY"
                DialogProps={dialogProps}
                InputProps={inputProps}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          {/* end date */}
          <div className={`${layout.flex__col__inner__medium}`}>
            <header>
              <span className={header.header__medium}>End date</span>
            </header>
            <div className={layout.grid__row__layout}>
              <button ref={noneBtnRef} onClick={noneBtnHandler} className={btns.none__btn}>
                None
              </button>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  className={btns.date__input__btn}
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue);

                    setNoneBtnIsActive(false);
                    noneBtnRef.current.classList.remove(btns.none__btn__active);
                  }}
                  inputFormat="DD MMMM, YYYY"
                  DialogProps={dialogProps}
                  InputProps={inputProps}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>
          {/* track habit */}
          <div className={`${layout.flex__col__inner__medium}`}>
            <header className={layout.flex__col__inner__small}>
              <span className={header.header__medium}>Track habit</span>
              <p className={header.subheading}>Choose preferred method of tracking habit</p>
            </header>
            <div className={form.checkbox__wrapper}>
              <div className={form.checkbox__item}>
                <input
                  ref={trackTimeNoneBtnRef}
                  type="radio"
                  name="trackType"
                  value="none"
                  className={form.checkbox__input}
                  onClick={trackTimeInputHandler}
                />
                <span className={form.checkbox__name}>None</span>
              </div>
              <div className={form.checkbox__item}>
                <input
                  type="radio"
                  name="trackType"
                  value="time"
                  className={form.checkbox__input}
                  onClick={trackTimeInputHandler}
                />
                <span className={form.checkbox__name}>Time</span>
              </div>
              <div className={form.checkbox__item}>
                <input
                  type="radio"
                  name="trackType"
                  value="custom"
                  className={form.checkbox__input}
                  onClick={trackTimeInputHandler}
                />
                <span className={form.checkbox__name}>Custom</span>
              </div>
            </div>
          </div>
          {/* track time */}
          {trackType === "time" && (
            <div ref={timeTrackRef} className={`${layout.flex__col__inner__medium}`}>
              <header className={layout.flex__col__inner__small}>
                <span className={header.header__medium}>Time goal</span>
                <p className={header.subheading}>
                  For how long do you want to practice your habit?
                </p>
              </header>
              <div className={layout.flex__col__inner__small}>
                <div ref={selectDialog} className={select.select__wrapper}>
                  <div className={select.select__inner}>
                    <div className={layout.flex__col__inner__small}>
                      {(() => {
                        let btns = [];
                        for (let i = 1; i <= 4; i++) {
                          btns.push(
                            <div className={form.checkbox__item}>
                              <input
                                type="radio"
                                name="time"
                                value={i}
                                className={form.checkbox__input}
                                onClick={handleSetTrackTime}
                              />
                              <span className={form.checkbox__name}>{i}</span>
                            </div>
                          );
                        }
                        return btns;
                      })()}
                    </div>
                    <div className={layout.flex__col__inner__small}>
                      {(() => {
                        let btns = [];
                        for (let i = 5; i <= 20; i += 5) {
                          btns.push(
                            <div className={form.checkbox__item}>
                              <input
                                type="radio"
                                name="time"
                                value={i}
                                className={form.checkbox__input}
                                onClick={handleSetTrackTime}
                              />
                              <span className={form.checkbox__name}>{i}</span>
                            </div>
                          );
                        }
                        return btns;
                      })()}
                    </div>
                    <div className={layout.flex__col__inner__small}>
                      {(() => {
                        let btns = [];
                        for (let i = 25; i <= 40; i += 5) {
                          btns.push(
                            <div className={form.checkbox__item}>
                              <input
                                type="radio"
                                name="time"
                                value={i}
                                className={form.checkbox__input}
                                onClick={handleSetTrackTime}
                              />
                              <span className={form.checkbox__name}>{i}</span>
                            </div>
                          );
                        }
                        return btns;
                      })()}
                    </div>
                    <div className={layout.flex__col__inner__small}>
                      {(() => {
                        let btns = [];
                        for (let i = 45; i <= 60; i += 5) {
                          btns.push(
                            <div className={form.checkbox__item}>
                              <input
                                type="radio"
                                name="time"
                                value={i}
                                className={form.checkbox__input}
                                onClick={handleSetTrackTime}
                              />
                              <span className={form.checkbox__name}>{i}</span>
                            </div>
                          );
                        }
                        return btns;
                      })()}
                    </div>
                  </div>
                </div>
                <div className={`${layout.flex__col__inner__medium}`}>
                  <button
                    onClick={() => {
                      selectDialog.current.classList.add(select.show);
                    }}
                    className={btns.date__input__btn}
                  >
                    {trackTime.time}
                  </button>
                </div>
                <div className={form.checkbox__wrapper}>
                  <div className={form.checkbox__item}>
                    <input
                      type="radio"
                      name="timeMetric"
                      value="sec"
                      className={form.checkbox__input}
                      onClick={(e) => {
                        setTrackTime((prev) => ({
                          ...prev,
                          metric: e.target.value,
                        }));
                      }}
                    />
                    <span className={form.checkbox__name}>Sec</span>
                  </div>
                  <div className={form.checkbox__item}>
                    <input
                      type="radio"
                      name="timeMetric"
                      value="min"
                      className={form.checkbox__input}
                      onClick={(e) => {
                        setTrackTime((prev) => ({
                          ...prev,
                          metric: e.target.value,
                        }));
                      }}
                    />
                    <span className={form.checkbox__name}>Min</span>
                  </div>
                  <div className={form.checkbox__item}>
                    <input
                      type="radio"
                      name="timeMetric"
                      value="hrs"
                      className={form.checkbox__input}
                      onClick={(e) => {
                        setTrackTime((prev) => ({
                          ...prev,
                          metric: e.target.value,
                        }));
                      }}
                    />
                    <span className={form.checkbox__name}>Hrs</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {trackType === "custom" && (
            <div ref={customTrackRef} className={`${layout.flex__col__inner__medium}`}>
              <header className={layout.flex__col__inner__small}>
                <span className={header.header__medium}>Custom metric</span>
                <p className={header.subheading}>For example 30 pages, 10 cups, 100 push ups.</p>
              </header>
              <div className={layout.grid__row__layout}>
                <input
                  type="number"
                  className={form.form__input}
                  name="customAmount"
                  value={customTrack.customAmount}
                  onChange={handleSetCustomTrack}
                  placeholder="amount"
                />
                <input
                  type="text"
                  className={form.form__input}
                  name="customMetric"
                  value={customTrack.customMetric}
                  onChange={handleSetCustomTrack}
                  placeholder="metric"
                />
              </div>
            </div>
          )}
          {/* submit btn */}
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
