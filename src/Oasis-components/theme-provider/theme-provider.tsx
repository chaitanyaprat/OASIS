import { createContext, useEffect, useMemo, useState } from "react";
import themes from "../../../themes.json";
import moonSvg from "@/assets/moon.svg";
import sunSvg from "@/assets/sun.svg";
import calmSvg from "@/assets/calm.svg";
import darkSvg from "@/assets/dark.svg";
import homeSvg from "@/assets/home.svg";

type Theme = "dark" | "light";
type Coords = { x: number; y: number };
export type Pallete = "nature" | "sun" | "retro" | "batman" | "bits";
export interface PalleteList {
  name: Pallete;
  icon: string;
}
export const PalleteList: PalleteList[] = [
  { name: "nature", icon: calmSvg },
  { name: "sun", icon: sunSvg },
  { name: "retro", icon: moonSvg },
  { name: "batman", icon: darkSvg },
  { name: "bits", icon: homeSvg },
];

//context can have an object with property as arrow function, the fucntion type is defined by props it gets and return value.
// I can provide any function when I provide this context, and this function will be called anywhere from the app.
//what this fucntion does is the key.

export interface ThemeContextType {
  //provide dark or light modes
  theme: Theme;
  pallete: Pallete;
  //to set a new theme
  switchPallate: (pallete: Pallete) => void;
  //to switch b/w dark and light modes
  toggleTheme: (coords?: Coords) => void;
}

const initialState: ThemeContextType = {
  theme: "light",
  pallete: "nature",
  switchPallate: () => null,
  toggleTheme: () => null,
};

export const ThemeContext = createContext<ThemeContextType>(initialState);

import { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [pallete, setPallete] = useState<Pallete>("sun");

  useEffect(() => {
    const rootEle = document.documentElement;
    const selectedPallete = themes[pallete][theme] || themes.nature;
    Object.entries(selectedPallete).forEach(([Key, value]) => {
      rootEle.style.setProperty(`--${Key}`, value as string);
    });
    //to handle other dark mode styles
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [pallete, theme]);

  const handleThemeToggle = (coords?: Coords) => {
    const root = document.documentElement;
    const newMode = theme === "light" ? "dark" : "light";

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(newMode);
      return;
    }

    if (coords) {
      root.style.setProperty("--x", `${coords.x}px`);
      root.style.setProperty("--y", `${coords.y}px`);
    }

    document.startViewTransition(() => {
      setTheme(newMode);
    });
  };
  const switchPallate = (pallete: Pallete) => {
    setPallete(pallete);
    // Logic to switch the pallete can be added here
  };

  const themeContextValue = useMemo<ThemeContextType>(
    () => ({
      theme: theme,
      pallete: pallete,
      switchPallate: switchPallate,
      toggleTheme: handleThemeToggle,
    }),
    [theme, pallete]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
