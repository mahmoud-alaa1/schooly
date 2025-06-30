"use client";
import { Badge } from "@/components/ui/badge";
import { MESSAGES } from "@/lib/constants";
import { motion } from "framer-motion";

const LiveBadge = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.3,
      delay: 0.6,
      type: "spring",
      stiffness: 200,
    }}
    whileHover={{ scale: 1.05 }}
  >
    <Badge
      variant="destructive"
      className="h-fit w-fit rounded-full border-none bg-red-500 text-white"
    >
      <motion.span
        className="px-2 py-1 text-sm"
        animate={{
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {MESSAGES.LIVE_BADGE}
      </motion.span>
    </Badge>
  </motion.div>
);

export default LiveBadge;
