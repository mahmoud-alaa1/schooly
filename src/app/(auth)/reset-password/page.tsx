"use client";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import { RectangleEllipsis } from "lucide-react";
import React, { Suspense } from "react";
import { motion } from "framer-motion";
import GoBack from "@/components/GoBack";

function ResetPassword() {
  return (
    <motion.div
      className="w-[clamp(320px,21vw,360px)] rounded-lg border border-neutral-300 bg-white"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <motion.div
        className="flex items-center justify-between gap-2 border-b p-4"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.div
            initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.6,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            <RectangleEllipsis className="text-[#02C189]" />
          </motion.div>
          <motion.span
            className="font-bold"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            إعادة تعيين كلمة السر
          </motion.span>
        </motion.div>

        <GoBack />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Suspense
          fallback={
            <motion.div
              className="flex justify-center px-4 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#02C189]"></div>
            </motion.div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </motion.div>
    </motion.div>
  );
}

export default ResetPassword;
