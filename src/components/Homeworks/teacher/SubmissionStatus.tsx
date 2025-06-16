import React from "react";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface SubmissionStatusProps {
  status: string;
}

export const SubmissionStatusIcon: React.FC<SubmissionStatusProps> = ({
  status,
}) => {
  switch (status) {
    case "submitted":
      return <CheckCircle className="h-4 w-4 text-blue-500" />;
    case "graded":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "pending":
      return <AlertCircle className="h-4 w-4 text-orange-500" />;
    default:
      return <XCircle className="h-4 w-4 text-red-500" />;
  }
};

export const getSubmissionStatusText = (status: string): string => {
  switch (status) {
    case "submitted":
      return "مُرسل";
    case "graded":
      return "مُقيم";
    case "pending":
      return "في الانتظار";
    default:
      return "غير مُرسل";
  }
};
