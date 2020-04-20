import React from "react";
import styles from "./Contributions.module.css";
import { lightPalette, darkPalette, defaults } from "./swatchColors";

export default function Contributions(props) {
  const { results, width, theme, darkMode } = props;

  const hue = (color) => {
    switch (color) {
      case "#ebedf0":
        return 0;
      case "#c6e48b":
        return 1;
      case "#7bc96f":
        return 2;
      case "#239a3b":
        return 3;
      case "#196127":
        return 4;
      default:
        return 0;
    }
  };

  const themeColor = (theme, color) => {
    const palette = darkMode ? darkPalette : lightPalette;
    switch (theme) {
      case "grey":
        return palette[0][hue(color)];
      case "red":
        return palette[1][hue(color)];
      case "orange":
        return palette[2][hue(color)];
      case "yellow":
        return palette[3][hue(color)];
      case "green":
        return palette[4][hue(color)];
      case "cyan":
        return palette[5][hue(color)];
      case "blue":
        return palette[6][hue(color)];
      case "violet":
        return palette[7][hue(color)];
      case "purple":
        return palette[8][hue(color)];
      case "pink":
        return palette[9][hue(color)];
      default:
        return palette[0][hue(color)];
    }
  };
  return (
    <div className={styles[darkMode ? "dark" : theme]}>
      <div className={styles.grid}>
        {results
          ? results.data.user.contributionsCollection.contributionCalendar.weeks
              .filter((week, index) => {
                if (width > 600) {
                  return week;
                } else {
                  if (index > 32) {
                    return week;
                  }
                }
              })
              .map((week, index) => {
                return (
                  <div key={index} className={styles.column}>
                    {week.contributionDays.map((day, index) => {
                      return (
                        <div
                          className={styles.cell}
                          key={index}
                          style={{
                            backgroundColor: `${themeColor(theme, day.color)}`,
                          }}
                        >
                          <span className={styles.tooltip}>
                            {`${day.contributionCount} ${
                              day.contributionCount === 1 ? "commit" : "commits"
                            }`}
                            <br />
                            {day.date}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })
          : null}
      </div>
    </div>
  );
}
