"use client";
import { X } from "lucide-react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { MESSAGES } from "@/lib/constants";

interface VerificationHeaderProps {
  onClose: () => void;
}

const VerificationHeader = ({ onClose }: VerificationHeaderProps) => (
  <div className="border-b-2">
    <DialogHeader className="p-4">
      <DialogTitle className="text-right">
        {MESSAGES.IDENTITY_VERIFICATION}
      </DialogTitle>
      <button
        onClick={onClose}
        className="absolute top-4 left-4 cursor-pointer hover:opacity-70"
        type="button"
      >
        <X className="h-5 w-5" />
      </button>
    </DialogHeader>
  </div>
);

export default VerificationHeader;
