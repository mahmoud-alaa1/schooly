// components/AnimatedTabsContent.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  value: string;
  selectedValue: string;
}

export default function AnimatedTabsContent({
  children,
  value,
  selectedValue,
}: Props) {
  const isVisible = value === selectedValue;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={value}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{
            opacity: { duration: 0.2 },
            height: { duration: 0.3 },
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
