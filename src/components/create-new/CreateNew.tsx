"use client";

import { ComponentType, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Sheet, Video } from "lucide-react";
import AnimatedTabsContent from "@/components/AnimatedTabsContent";
import CreatePost from "./CreatePost";
import { motion } from "framer-motion";
import CreateSession from "./CreateSession";
import CreateHomework from "./CreateHomework";
import RoleGuard from "../RoleGuard";
import { useAuth } from "@/store/auth";
import { EROLES } from "@/types/enums";

interface TabConfig {
  value: string;
  icon: ComponentType<any>;
  label: string;
  visibleTo: EROLES[];
}

const tabs: TabConfig[] = [
  {
    value: "homework",
    icon: Sheet,
    label: "واجب",
    visibleTo: [EROLES.TEACHER, EROLES.STUDENT, EROLES.OWNER],
  },
  {
    value: "session",
    icon: Video,
    label: "جلسة",
    visibleTo: [EROLES.TEACHER],
  },
  {
    value: "post",
    icon: MessageCircle,
    label: "منشور",
    visibleTo: [EROLES.TEACHER, EROLES.STUDENT, EROLES.OWNER],
  },
];
function getVisibleTabs(userRole: EROLES) {
  return tabs.filter((tab) => tab.visibleTo.includes(userRole));
}

export default function CreateNew() {
  const [selectedTab, setSelectedTab] = useState("post");
  const userRole = useAuth((s) => s.user?.role) ?? EROLES.STUDENT;

  return (
    <motion.div layout className="rounded-xl border-2 border-b-0 bg-white">
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <motion.div className="px-5 py-2.5">
          <AnimatedTabsContent value="homework" selectedValue={selectedTab}>
            <CreateHomework />
          </AnimatedTabsContent>

          <RoleGuard role="TEACHER">
            <AnimatedTabsContent value="session" selectedValue={selectedTab}>
              <CreateSession />
            </AnimatedTabsContent>
          </RoleGuard>

          <AnimatedTabsContent value="post" selectedValue={selectedTab}>
            <CreatePost />
          </AnimatedTabsContent>
        </motion.div>

        <TabsList className="flex w-full justify-between rounded-b-lg border-b-0 p-0">
          {getVisibleTabs(userRole).map((tab, index) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`data-[state=active]:text-primary flex gap-6 rounded-none border-0 p-0 first:rounded-bl-lg last:rounded-br-lg data-[state=active]:border-2! data-[state=active]:bg-white data-[state=inactive]:border-y-2 data-[state=inactive]:text-neutral-600 ${index !== tabs.length - 1 ? "border-r border-neutral-200" : "border-r-0"} `}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </motion.div>
  );
}
