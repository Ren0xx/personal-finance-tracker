"use client";
import { AnimatePresence, motion } from "framer-motion";

const pageTransition = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

function BasicPageTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export { BasicPageTransition };
