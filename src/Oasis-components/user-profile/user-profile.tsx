"use client";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, Variants } from "framer-motion";
import {
  Edit3,
  History,
  LogOut,
  Palette,
  Settings,
  User as UserIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../Auth/auth";
import { LogOutSpinner } from "../spinners/page-load";
import GraphPaperBackground from "./GraphPaperBackground";

// Text for the emerging effect
const userBio = `
  Welcome to your personal Oasis. Here, you can customize your dashboard, 
  manage your widgets, and tailor the experience to fit your workflow perfectly.
`;

const words = userBio.split(" ");

const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: i * 0.04 + 0.8 },
  }),
};

const textChildVariants: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 12, stiffness: 100 },
  },
  hidden: {
    opacity: 0,
    y: 20,
  },
};

function UserProfile({
  open,
  onCloseProfile,
}: {
  open: boolean;
  onCloseProfile: () => void;
}) {
  const { signOut } = useAuth();
  const [signOutSpinner, setSignOutSpinner] = useState(false);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSignOut = async () => {
    setSignOutSpinner(true);
    await signOut();
    setSignOutSpinner(false);
    onCloseProfile();
  };

  const menuItems = [
    { icon: Edit3, text: "Edit Profile" },
    { icon: Settings, text: "Settings" },
    { icon: Palette, text: "Customizations" },
  ];

  const recentActivities = [
    "Updated the 'Project Phoenix' to-do list.",
    "Added a new 'Weather' widget for London.",
    "Completed 3 tasks from the 'Q3 Goals' list.",
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="user-profile-overlay"
          initial={{ y: "-100%" }}
          animate={{ y: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          exit={{
            y: "-100%",
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background p-8"
        >
          <GraphPaperBackground />
          <div className="absolute inset-0 z-102 bg-gradient-to-t from-background via-transparent to-background" />

          <Button
            variant="ghost"
            size="icon"
            onClick={onCloseProfile}
            className="absolute top-6 right-6 z-102 shadow"
          >
            <XIcon className="h-6 w-6" />
          </Button>

          <div className="z-102 grid w-full max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-2 ">
            {/* Left Side: User Card & Activity */}
            <div className="flex flex-col gap-8 ">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: 0.4, duration: 0.5 },
                }}
                className="flex flex-col items-center justify-center space-y-6 rounded-2xl border-4 border-white/10 bg-background/50 p-8  shadow-2xl backdrop-blur-lg "
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <div className="flex h-40 w-40 items-center justify-center rounded-full bg-muted ring-4 ring-primary/30">
                    <UserIcon className="h-24 w-24 text-muted-foreground" />
                  </div>
                </motion.div>
                <motion.div
                  variants={textContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-center text-lg text-muted-foreground"
                >
                  {words.map((word, index) => (
                    <motion.span
                      variants={textChildVariants}
                      key={index}
                      className="inline-block pr-1.5"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.8,
                    duration: 0.5,
                    type: "spring",
                    damping: 12,
                    stiffness: 100,
                  },
                }}
                className="rounded-2xl border border-white/10 bg-background/50 p-6 shadow-2xl backdrop-blur-lg"
              >
                <h3 className="mb-4 flex items-center text-lg font-semibold">
                  <History className="mr-2 h-5 w-5" /> Recent Activity
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {recentActivities.map((activity, index) => (
                    <li key={index} className="text-sm">
                      - {activity}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Right Side: Title & Floating Buttons */}
            <div className="flex flex-col items-center space-y-8">
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
                  },
                }}
                className="text-8xl font-black border-4 rounded-2xl shadow-2xl bg-accent-foreground"
              >
                {"OASIS".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="inline-block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent shadow-2xl"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.5 },
                  },
                }}
                className="flex flex-col items-start space-y-4"
              >
                {menuItems.map((item) => (
                  <motion.button
                    key={item.text}
                    variants={{
                      hidden: { opacity: 0, x: 100 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    whileHover={{ scale: 1.05, x: 0 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex w-72 items-center ps-2 space-x-4 rounded-lg border border-white/10 bg-background/50 p-4 text-left text-2xl font-bold shadow-lg backdrop-blur-lg"
                  >
                    <item.icon className="h-8 w-8 text-primary" />
                    <span>{item.text}</span>
                  </motion.button>
                ))}
                <motion.button
                  variants={{
                    hidden: { opacity: 0, x: 100 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  whileHover={{ scale: 1.05, x: 0 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSignOut}
                  className="flex w-72 items-center space-x-4 rounded-lg border border-destructive/20 bg-background/50 p-4 text-left text-2xl font-bold text-destructive shadow-lg backdrop-blur-lg"
                >
                  <LogOut className="h-8 w-8" />
                  <span>Sign Out</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
      {signOutSpinner && <LogOutSpinner />}
    </AnimatePresence>
  );
}

export default UserProfile;
