import { Button } from "@components/ui/button";
import moonSvg from "@/assets/moon.svg";
import sunSvg from "@/assets/sun.svg";
import calmSvg from "@/assets/calm.svg";
import darkSvg from "@/assets/dark.svg";
import homeSvg from "@/assets/home.svg";
import { Command, CommandInput } from "@/components/ui/command";
import { Pallete, ThemeContext } from "../theme-provider/theme-provider";
import { useContext } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

function NavBar() {
  const themeContext = useContext(ThemeContext);
  const handlePaletteSwitch = (palette: Pallete) => {
    themeContext.switchPallate(palette);
    console.log(`Switched to ${palette} palette`);
    // Logic to switch the palette can be added here
  };
  const hanldeThemeChange = (coords?: { x: number; y: number }) => {
    themeContext.toggleTheme(coords);
    console.log(`Theme toggled at coordinates: x=${coords?.x}, y=${coords?.y}`);
  };
  return (
    <div>
      <div className="flex justify-between ali bg-transparent p-2  rounded-md mt-1 mb-5 shadow-xl/30">
        <Button
          className="inline-block relative h-auto bg-transparent shadow-xl border-[#ff0000] border-3"
          onClick={() => handlePaletteSwitch("sun")}
        >
          <img src={homeSvg} alt="" className=" pb-2 " />
          Home
        </Button>
        <Button
          className="inline-block relative h-auto bg-transparent shadow-xl/10"
          onClick={() => handlePaletteSwitch("retro")}
        >
          <img src={moonSvg} alt="" className=" pb-2 " /> Moon
        </Button>
        <Button
          className="inline-block relative h-auto bg-transparent shadow-xl/20"
          onClick={() => handlePaletteSwitch("sun")}
        >
          <img src={darkSvg} alt="" className=" pb-2  " /> Night
        </Button>
        <Button
          className="inline-block relative h-auto bg-transparent shadow-xl/30"
          onClick={() => handlePaletteSwitch("nature")}
        >
          <img src={sunSvg} alt="" className=" pb-2 " /> Day
        </Button>
        <Button
          className="inline-block relative h-auto bg-transparent shadow-xl/40"
          onClick={() => handlePaletteSwitch("sun")}
        >
          <img src={calmSvg} alt="" className=" pb-2  " /> Calm
        </Button>
      </div>
      {/* add search icon on footer and that troigger this command? */}
      <Command className="shadow-xl/30 ">
        <CommandInput></CommandInput>
      </Command>
      <div className="flex items-center space-x-2">
        <Switch
          id="airplane-mode"
          checked={themeContext.theme === "dark"}
          onCheckedChange={() => hanldeThemeChange()}
        />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    </div>
  );
}
export default NavBar;
