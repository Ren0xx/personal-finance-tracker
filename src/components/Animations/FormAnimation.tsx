import { motion } from "framer-motion";

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

type AnimatedFormOpenProps = {
  children: React.ReactNode;
  className: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function AnimatedFormOpen(props: AnimatedFormOpenProps) {
  const { children, className, onSubmit } = props;
  return (
    <motion.form
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={formVariants}
      className={className}
      onSubmit={onSubmit}
    >
      {children}
    </motion.form>
  );
}
