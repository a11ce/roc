import { Color } from "pixi.js";

export interface ColorController {
  getDark(): Color;
  getLight(): Color;
  setDark(color: string): void;
  setLight(color: string): void;
}

export const createColorController = (): ColorController => {
  const styles = getComputedStyle(document.documentElement);
  let dark = new Color(styles.getPropertyValue("--dark").trim());
  let light = new Color(styles.getPropertyValue("--light").trim());

  const getDark = () => dark;

  const getLight = () => light;

  const setDark = (color: string) => {
    document.documentElement.style.setProperty("--dark", color);
    dark = new Color(color);
  };

  const setLight = (color: string) => {
    document.documentElement.style.setProperty("--light", color);
    light = new Color(color);
  };

  return {
    getDark,
    getLight,
    setDark,
    setLight,
  };
};
