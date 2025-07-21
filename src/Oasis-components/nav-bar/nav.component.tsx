import {
  Pallete,
  ThemeContext,
  PalleteList,
} from "../theme-provider/theme-provider";
import { useContext } from "react";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

import { useState } from "react";
import { NavOptions } from "./nav-options";
import { useAuth } from "../Auth/auth";
import { useNavigate } from "react-router-dom";
import UserProfile from "../user-profile/user-profile";

export function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const themeContext = useContext(ThemeContext);
  const { signOut } = useAuth();
  const palleteList = PalleteList;
  const handlePaletteSwitch = (palette: string) => {
    themeContext.switchPallate(palette as Pallete);
    console.log(`Switched to ${palette} palette`);
    // Logic to switch the palette can be added here
  };
  const hanldeThemeChange = (coords?: { x: number; y: number }) => {
    themeContext.toggleTheme(coords);
    console.log(`Theme toggled at coordinates: x=${coords?.x}, y=${coords?.y}`);
  };
  const navigate = useNavigate();
  const handleUserSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.log("sign out error" + err);
    }
  };

  return (
    <>
      <UserProfile
        onCloseProfile={() => {
          setOpenProfile(false);
        }}
        open={openProfile}
      />
      <Navbar className="top-0 pt-4 bg-primary dark:bg-secondary">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo
            handleClick={() => {
              navigate("/home");
            }}
          />
          {/* add a new button on hover should expand to this*/}
          {/* <NavItems  /> */}
          {/* <NavigationMenuDemo></NavigationMenuDemo> */}
          <NavOptions
            palleteList={palleteList}
            onItemClick={handlePaletteSwitch}
            onSingOutClick={handleUserSignOut}
          ></NavOptions>
          <div className="flex gap-1">
            <NavbarButton
              variant="primary"
              onClick={(e: React.MouseEvent) =>
                hanldeThemeChange({ x: e.clientX, y: e.clientY })
              }
            >
              O
            </NavbarButton>
            <NavbarButton
              variant="primary"
              onClick={() => setOpenProfile(true)}
            >
              |||
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            {/* <NavbarLogo /> */}

            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {/* {navItems.map((item, idx) => (
           <a
             key={`mobile-link-${idx}`}
             href={item.link}
             onClick={() => {
               setIsMobileMenuOpen(false);
               handlePaletteSwitch(item.name);
             }}
             className="relative text-neutral-600 dark:text-neutral-300"
           >
             <span className="block">{item.name}</span>
           </a>
         ))} */}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                variant="primary"
                onClick={() => hanldeThemeChange()}
              >
                switch
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </>
  );
}
