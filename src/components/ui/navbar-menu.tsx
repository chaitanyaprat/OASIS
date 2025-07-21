"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  ...rest
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // allows for additional props
}) => {
  return (
    <div {...rest} onMouseEnter={() => setActive(item)}>
      <motion.div
        layout
        whileHover={{
          opacity: 0.8,
          scale: 1.1,
        }}
        transition={{ type: "spring", stiffness: 100 }}
        className="cursor-pointer p-2 rounded hover:bg-accent hover:shadow"
      >
        {item}
      </motion.div>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_0.1rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                whileHover={{}}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-secondary backdrop-blur-sm rounded-2xl overflow-hidden border/[0.2]"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <div
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative flex justify-center w-auto h-max"
    >
      {children}
    </div>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a href={href} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </a>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HoveredLink = ({ children, type, ...rest }: any) => {
  if (type === "nav") {
    return (
      <Link
        {...rest}
        className="text-neutral-700 dark:text-neutral-200 hover:text-black "
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </a>
  );
};
