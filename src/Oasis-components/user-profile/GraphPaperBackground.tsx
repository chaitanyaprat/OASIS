import { motion } from "framer-motion";

const GraphPaperBackground = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.5, delay: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="absolute inset-0 z-102 h-full w-full text-muted-foreground/50"
    >
      <defs>
        <pattern
          id="graph-paper"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#graph-paper)" />
    </motion.svg>
  );
};

//add more svg page backgrounds
const ProjectPageBackground = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.5, delay: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="absolute inset-0 z-102 h-full w-full text-muted-foreground/50"
    >
      <defs>
        <pattern
          id="graph-paper"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#graph-paper)" />
    </motion.svg>
  );
};

export { ProjectPageBackground };
export default GraphPaperBackground;
