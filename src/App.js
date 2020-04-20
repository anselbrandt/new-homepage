import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Map from "./Map";
import ColorPicker from "./ColorPicker";
import Contributions from "./Contributions";
import getContributions from "./getContributions";
import useFetchContributions from "./useFetchContributions";
import useGetViewport from "./useGetViewport";

function App() {
  const [query, setQuery] = useState(getContributions);
  const [variables, setVariables] = useState();
  const [time, setTime] = useState(0);
  const [viewState, setViewState] = useState();
  const [theme, setTheme] = useState("grey");
  const [themeIndex, setThemeIndex] = useState("0");
  const [darkMode, setDarkMode] = useState(false);

  const { results } = useFetchContributions(query, variables);
  const { width } = useGetViewport();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const loopLength = 86400;
      const animationSpeed = 480;
      const timestamp = Date.now() / 1000;
      const loopTime = loopLength / animationSpeed;
      setTime(((timestamp % loopTime) / loopTime) * loopLength);
    });
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [time]);

  const handleViewStateChange = (event) => {
    setViewState(event.viewState);
  };

  const handleChangeTheme = (event) => {
    const value = event.target.value;
    setThemeIndex(value);
    switch (value) {
      case "0":
        setTheme("grey");
        break;
      case "1":
        setTheme("red");
        break;
      case "2":
        setTheme("orange");
        break;
      case "3":
        setTheme("yellow");
        break;
      case "4":
        setTheme("green");
        break;
      case "5":
        setTheme("cyan");
        break;
      case "6":
        setTheme("blue");
        break;
      case "7":
        setTheme("violet");
        break;
      case "8":
        setTheme("purple");
        break;
      case "9":
        setTheme("pink");
        break;
      default:
        setTheme("grey");
    }
  };

  const handleDarkMode = () => setDarkMode((prevState) => !prevState);

  return (
    <div className={styles.app}>
      <div className={styles[darkMode ? "dark" : theme]}>
        <Map
          time={time}
          handleViewStateChange={handleViewStateChange}
          darkMode={darkMode}
          themeIndex={themeIndex}
        />
        <div className={styles.menuContainer}>
          <div className={styles.menu}>Menu</div>
        </div>
        <div className={styles.overlayContainer}>
          <Contributions
            results={results}
            width={width}
            theme={theme}
            darkMode={darkMode}
          />
        </div>
      </div>
      <ColorPicker
        darkMode={darkMode}
        handleDarkMode={handleDarkMode}
        handleChangeTheme={handleChangeTheme}
      />
      <div>
        {viewState
          ? Object.keys(viewState).map((key, index) => (
              <div key={index}>{`${key}: ${
                Object.values(viewState)[index]
              }`}</div>
            ))
          : null}
      </div>
    </div>
  );
}

export default App;
