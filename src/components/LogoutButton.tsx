import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <Button className="active:scale-90" variant="outline" size="icon">
      <LogOut className="size-6 font-bold " />
    </Button>
  );
}
