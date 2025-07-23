import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
} from "@/components/ui/resizable-navbar";
import { useContext } from "react";
import {
  Pallete,
  PalleteList,
  ThemeContext,
} from "../theme-provider/theme-provider";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/auth";
import { LogOutSpinner } from "../spinners/page-load";
import UserProfile from "../user-profile/user-profile";
import { NavOptions } from "./nav-options";

export function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [signOutSpinner, setSignOutSpinner] = useState(false);
  const themeContext = useContext(ThemeContext);
  const { signOut } = useAuth();
  const palleteList = PalleteList;
  const handlePaletteSwitch = (palette: string) => {
    themeContext.switchPallate(palette as Pallete);
    // Logic to switch the palette can be added here
  };
  const hanldeThemeChange = (coords?: { x: number; y: number }) => {
    themeContext.toggleTheme(coords);
  };
  const navigate = useNavigate();
  const handleUserSignOut = async () => {
    try {
      setSignOutSpinner(true);
      await signOut();
      setSignOutSpinner(false);
    } catch (err) {
      setSignOutSpinner(false);
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
      {signOutSpinner && <LogOutSpinner />}
    </>
  );
}
