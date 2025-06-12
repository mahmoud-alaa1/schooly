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
    <Button className={`active:scale-95 ${className}`} onClick={onClick}>
      <AnimatePresence mode="wait">
        <motion.div
          key={isActive ? "active" : "inactive"}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ duration: 0.2 }}
        >
          {isActive ? <ActiveIcon /> : <InactiveIcon />}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
};
