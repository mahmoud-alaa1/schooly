"use client";
import { MESSAGES } from "@/lib/constants";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";

interface RetryButtonProps {
  onRetry: () => void;
  show: boolean;
}

const RetryButton = ({ onRetry, show }: RetryButtonProps) => {
  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
          >
            <Button className="mt-4 w-full" onClick={onRetry} variant="default">
              {MESSAGES.RETRY}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RetryButton;
