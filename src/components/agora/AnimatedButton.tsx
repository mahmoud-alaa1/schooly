import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AnimatedButtonProps {
  isActive: boolean;
  onClick: () => void;
  activeIcon: LucideIcon;
  inactiveIcon: LucideIcon;
  className?: string;
}

export const AnimatedButton = ({
  isActive,
  onClick,
  activeIcon: ActiveIcon,
  inactiveIcon: InactiveIcon,
  className = "",
}: AnimatedButtonProps) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button className={`active:scale-95 ${className}`} onClick={onClick}>
        <AnimatePresence mode="wait">
          <motion.div
            key={isActive ? "active" : "inactive"}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
              },
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
              transition: {
                duration: 0.15,
              },
            }}
          >
            {isActive ? <ActiveIcon /> : <InactiveIcon />}
          </motion.div>
        </AnimatePresence>
      </Button>
    </motion.div>
  );
};
