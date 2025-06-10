"use client";

import { useAuth } from "@/store/auth";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { EROLES } from "@/types/enums";

function SideNavButton() {
  const user = useAuth((state) => state.user);
  if (user?.role === EROLES.STUDENT) return null; //
  return (
    <Button>
      جلسة جديدة <Plus />{" "}
    </Button>
  );
}

export default SideNavButton;
