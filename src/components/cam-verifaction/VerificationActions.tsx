"use client";
import { MESSAGES } from "@/lib/constants";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { motion } from "framer-motion";

interface VerificationActionsProps {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
  isPending: boolean;
}

const VerificationActions = ({
  onCancel,
  onSubmit,
  isSubmitDisabled,
  isPending,
}: VerificationActionsProps) => (
  <DialogFooter className="flex justify-end gap-2 border-t-2 p-4">
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      <Button
        variant="outline"
        onClick={onCancel}
        className="border-2"
        disabled={isPending}
      >
        {MESSAGES.CANCEL}
      </Button>
    </motion.div>

    <motion.div
      whileHover={!isSubmitDisabled ? { scale: 1.02 } : {}}
      whileTap={!isSubmitDisabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.1 }}
      animate={
        isPending
          ? {
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
            }
          : {}
      }
    >
      <Button
        type="submit"
        onClick={onSubmit}
        disabled={isSubmitDisabled}
        className="border-2"
      >
        <motion.span
          animate={isPending ? { opacity: [1, 0.6, 1] } : { opacity: 1 }}
          transition={
            isPending
              ? {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : {}
          }
        >
          {isPending ? MESSAGES.SUBMITTING : MESSAGES.SUBMIT}
        </motion.span>
      </Button>
    </motion.div>
  </DialogFooter>
);

export default VerificationActions;
