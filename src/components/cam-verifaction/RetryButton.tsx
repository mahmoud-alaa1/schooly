"use client";
import { MESSAGES } from "@/lib/constants";
import { Button } from "../ui/button";

interface RetryButtonProps {
  onRetry: () => void;
  show: boolean;
}

const RetryButton = ({ onRetry, show }: RetryButtonProps) => {
  if (!show) return null;

  return (
    <Button className="mt-4 w-full" onClick={onRetry} variant="default">
      {MESSAGES.RETRY}
    </Button>
  );
};

export default RetryButton;
