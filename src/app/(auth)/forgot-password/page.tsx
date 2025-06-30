"use client";
import ForgetPasswordForm from "@/components/ForgetPasswordForm";
import { RectangleEllipsis } from "lucide-react";
import { motion } from "framer-motion";
import GoBack from "@/components/GoBack";

const ForgetPassword = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="w-[clamp(300px,21vw,360px)] rounded-lg border border-neutral-300 bg-white shadow-lg"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex items-center justify-between gap-2 border-b p-4"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center gap-2"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.4,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 10,
              transition: { duration: 0.2 },
            }}
          >
            <RectangleEllipsis className="text-orange-600" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="font-bold text-gray-800"
          >
            تغيير كلمة السر
          </motion.span>
        </motion.div>
        <GoBack />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <ForgetPasswordForm />
      </motion.div>
    </motion.div>
  );
};

export default ForgetPassword;
