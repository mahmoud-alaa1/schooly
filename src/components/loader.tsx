"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useTransition } from "react";

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      setIsClient(true);
    });
  }, []);

  if (!isClient || isPending) {
    return (
      <AnimatePresence>
        <motion.div
          key="preloader"
          className="fixed inset-0 flex flex-col items-center justify-center bg-[#1E293B] text-white z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Animated Circles */}
          <motion.div
            className="flex space-x-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="w-4 h-4 bg-blue-400 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            />
            <motion.div
              className="w-4 h-4 bg-green-400 rounded-full"
              animate={{ y: [-10, 0, -10] }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
            <motion.div
              className="w-4 h-4 bg-red-400 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
          </motion.div>

          {/* Animated Text */}
          <motion.div
            className="mt-4 text-lg font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Loading...
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return <>{children}</>;
}
