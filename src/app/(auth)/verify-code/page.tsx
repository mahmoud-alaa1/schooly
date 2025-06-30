"use client";
import VerifyCodeForm from "@/components/VerifyCodeForm";
import { RectangleEllipsis } from "lucide-react";
import { Suspense } from "react";
import { motion } from "framer-motion";
import GoBack from "@/components/GoBack";

const VerifyCode = () => {
  return (
    <motion.div
      className="w-[clamp(300px,21vw,360px)] rounded-lg border border-neutral-300 bg-white"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <motion.div
        className="flex items-center justify-between gap-2 border-b p-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <motion.div
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <RectangleEllipsis />
          </motion.div>
          <motion.span
            className="font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            رمز التحقق
          </motion.span>
        </motion.div>
        <GoBack />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Suspense>
          <VerifyCodeForm />
        </Suspense>
      </motion.div>
    </motion.div>
  );
};

export default VerifyCode;
