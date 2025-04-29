import { Button } from "@components/ui/button";
import moonSvg from "@/assets/moon.svg";
import sunSvg from "@/assets/sun.svg";
import calmSvg from "@/assets/calm.svg";
import darkSvg from "@/assets/dark.svg";
import homeSvg from "@/assets/home.svg";
import { Command, CommandInput } from "@/components/ui/command";

function NavBar() {
  return (
    <div>
      <div className="flex justify-between ali bg-transparent p-2  rounded-md mt-1 mb-5 shadow-xl/30">
        <Button className="inline-block relative h-auto bg-transparent shadow-xl">
          <img src={homeSvg} alt="" className=" pb-2 " />
          Home
        </Button>
        <Button className="inline-block relative h-auto bg-transparent shadow-xl/10">
          <img src={moonSvg} alt="" className=" pb-2 " /> Moon
        </Button>
        <Button className="inline-block relative h-auto bg-transparent shadow-xl/20">
          <img src={darkSvg} alt="" className=" pb-2  " /> Night
        </Button>
        <Button className="inline-block relative h-auto bg-transparent shadow-xl/30">
          <img src={sunSvg} alt="" className=" pb-2 " /> Day
        </Button>
        <Button className="inline-block relative h-auto bg-transparent shadow-xl/40">
          <img src={calmSvg} alt="" className=" pb-2  " /> Calm
        </Button>
      </div>
      {/* add search icon on footer and that troigger this command? */}
      <Command className="shadow-xl/30 bg-slate-300">
        <CommandInput></CommandInput>
      </Command>
    </div>
  );
}
export default NavBar;
