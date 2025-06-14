"use client";
import { MESSAGES } from "@/lib/constants";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";

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
    <Button
      variant="outline"
      onClick={onCancel}
      className="border-2"
      disabled={isPending}
    >
      {MESSAGES.CANCEL}
    </Button>
    <Button
      type="submit"
      onClick={onSubmit}
      disabled={isSubmitDisabled}
      className="border-2"
    >
      {isPending ? MESSAGES.SUBMITTING : MESSAGES.SUBMIT}
    </Button>
  </DialogFooter>
);

export default VerificationActions;
