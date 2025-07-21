import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

function UserProfile({
  open,
  onCloseProfile,
}: {
  open: boolean;
  onCloseProfile: () => void;
}) {
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
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0, transition: { duration: 0.4 } }}
            exit={{ y: "-100%", transition: { duration: 0.5 } }}
            key="profile"
            className="fixed inset-0 w-screen z-100 h-screen bg-accent-foreground"
          >
            <Button onClick={onCloseProfile}>close</Button>
            <h1>User Profile</h1>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default UserProfile;
