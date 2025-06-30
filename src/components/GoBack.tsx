import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
function GoBack() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <Link href="/login">
        <motion.div
          className="flex items-center gap-1 rounded-md px-3 py-1 font-medium text-[#02C189] transition-colors duration-200 hover:bg-green-50"
          whileHover={{
            scale: 1.05,
            x: -5,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            العودة
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            whileHover={{ x: -2 }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default GoBack;
