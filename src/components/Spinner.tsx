import { LoaderCircle } from "lucide-react";
import React from "react";

export default function Spinner() {
  return <LoaderCircle strokeWidth={2} className="size-6 animate-spin" />;
}
