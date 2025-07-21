import { motion } from "framer-motion";

export function PageTransissionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%", transition: { duration: 0.5 } }}
        exit={{ x: window.innerWidth, transition: { duration: 0 } }}
      >
        {children}
      </motion.div>
    </>
  );
}

export function PageOpenWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ y: -window.innerHeight }}
        animate={{ y: 0, transition: { duration: 0.3 } }}
        exit={{ y: -window.innerHeight, transition: { duration: 0.3 } }}
      >
        {children}
      </motion.div>
    </>
  );
}
