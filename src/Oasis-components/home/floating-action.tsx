import { useState } from "react";
import { WidgetData } from "../widget-card/widget.interface";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

export default function FloatingActionButton({
  homeData,
}: {
  homeData: WidgetData[];
}) {
  const [showNavs, setshowNav] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <DropdownMenu open={showNavs} onOpenChange={setshowNav}>
        <DropdownMenuTrigger
          asChild
          onMouseEnter={() => {
            setshowNav(true);
          }}
          onMouseLeave={() => {
            setshowNav(false);
          }}
        >
          <Button variant="outline">+</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 mb-0"
          align="start"
          onMouseEnter={() => setshowNav(true)}
          onMouseLeave={() => setshowNav(false)}
        >
          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            className="flex ps-2 m-2 align-middle justify-center rounded-xl hover:bg-primary hover:text-primary-foreground "
          >
            <Link
              to=""
              smooth={true}
              duration={500}
              offset={-70}
              className="cursor-pointer w-full flex items-center"
              onClick={() => setshowNav(false)}
            >
              Scroll to Bottom
            </Link>
          </motion.div>
          {homeData.map((widgetDate) => {
            return (
              widgetDate.hasPage && (
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex ps-2 m-2 align-middle justify-center rounded-xl hover:bg-accent hover:text-accent-foreground"
                >
                  <Link
                    to={widgetDate.name}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className="cursor-pointer w-full flex items-center "
                    onClick={() => setshowNav(false)}
                  >
                    {widgetDate.name}
                  </Link>
                </motion.div>
              )
            );
          })}
          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            className="flex ps-2 m-2 align-middle justify-center rounded-xl  hover:bg-primary hover:text-primary-foreground"
          >
            <Link
              to=""
              smooth={true}
              duration={500}
              offset={-70}
              className="cursor-pointer w-full flex items-center"
              onClick={() => setshowNav(false)}
            >
              Scroll to Top
            </Link>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
