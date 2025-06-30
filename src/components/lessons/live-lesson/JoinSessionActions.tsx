"use client";
import { Button } from "@/components/ui/button";
import { MESSAGES } from "@/lib/constants";

interface JoinSessionActionsProps {
  onJoinSession: () => void;
}

const JoinSessionActions = ({ onJoinSession }: JoinSessionActionsProps) => (
  <div className="flex flex-wrap items-center justify-between gap-3">
    <Button className="flex-1" onClick={onJoinSession} size="lg">
      {MESSAGES.JOIN_SESSION}
    </Button>
  </div>
);

export default JoinSessionActions;
