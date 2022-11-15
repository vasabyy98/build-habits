const root = document.documentElement;
let isDark = true;

const darkThemeColors = {
  "--bg-color": "#0d0d0d",
  "--text-primary-color": "#f4f4f4",
  "--text-secondary-color": "#999999",
  "--accent-color": "#d4c951",
  "--completed-color": "#51d466",
  "--container-primary-color": "#1a1c1e",
  "--container-secondary-color": "#131416",
  "--selected-input-shadow-color": "#d4c95180",
  /* nav colors */
  "--nav-container-bg-color": "#0d0d0d99",
  "--nav-item-bg-color": "#2b2d31",
};

const lightThemeColors = {
  "--bg-color": "#E7E7E7",
  "--text-primary-color": "#0D0D0D",
  "--text-secondary-color": "#5B5B5B",
  "--accent-color": "#202BA3",
  "--completed-color": "#20A35C",
  "--container-primary-color": "#DAD8D6",
  "--container-secondary-color": "#E1E0DE",
  "--selected-input-shadow-color": "#202ba280",
  /* nav colors */
  "--nav-container-bg-color": "#e8e8e899",
  "--nav-item-bg-color": "#CBCAC8",
};

export const switchTheme = () => {
  let theme;

  if (isDark) {
    theme = lightThemeColors;
  } else {
    theme = darkThemeColors;
  }

  isDark = !isDark;

  for (const key in theme) {
    root.style.setProperty(key, theme[key]);
  }
};
