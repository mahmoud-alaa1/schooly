"use client";

import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/store/auth";
import { UserRound } from "lucide-react";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import loginHeader from "../../../../public/login-header.webp";
export default function LoginPage() {
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  useEffect(() => {
    logout();
    queryClient.clear();
  }, [logout, queryClient]);
  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <div className="bg-primary/50 relative w-[clamp(300px,21vw,500px)] rounded-lg p-4">
        <Image
          src={loginHeader}
          alt="Description of the image"
          placeholder="blur"
          className="relative z-10 size-80 translate-y-21"
        />
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <p className="absolute top-15 text-8xl font-bold">سكولي</p>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="w-[clamp(300px,21vw,500px)] rounded-lg border border-neutral-300 bg-white shadow-lg"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-2 border-b p-4"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.2 },
            }}
          >
            <UserRound />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="font-bold text-gray-800"
          >
            سجل دخولك
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <LoginForm />
        </motion.div>
      </motion.div>
    </div>
  );
}
