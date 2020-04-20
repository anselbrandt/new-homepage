import React from "react";
import styles from "./ColorPicker.module.css";
import { swatches } from "./swatchColors";

export default function ColorPicker(props) {
  const { darkMode, handleDarkMode, handleChangeTheme } = props;
  return (
    <div className={styles.pickerContainer}>
      <div className={styles.picker}>
        <button
          className={styles.swatch}
          style={{
            backgroundColor: darkMode ? "darkgrey" : "black",
            color: darkMode ? "black" : "white",
            fontWeight: "bolder",
          }}
          onClick={handleDarkMode}
        >
          {darkMode ? "Light" : "Dark"}
        </button>
        {swatches.map((swatch, index) => (
          <button
            key={index}
            className={styles.swatch}
            style={{ backgroundColor: swatch }}
            value={index}
            onClick={handleChangeTheme}
          ></button>
        ))}
      </div>
    </div>
  );
}
