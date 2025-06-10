"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Sheet, Video } from "lucide-react";
import AnimatedTabsContent from "@/components/AnimatedTabsContent";
import CreatePost from "./CreatePost";
import { motion } from "framer-motion";
import CreateSession from "./CreateSession";
import CreateHomework from "./CreateHomework";

const tabs = [
  { value: "homework", icon: Sheet, label: "واجب" },
  { value: "session", icon: Video, label: "جلسة" },
  { value: "post", icon: MessageCircle, label: "منشور" },
];

export default function CreateNew() {
  const [selectedTab, setSelectedTab] = useState("post");

  return (
    <motion.div layout className="rounded-xl border-2 border-b-0 bg-white">
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <motion.div className="px-5 py-2.5">
          <AnimatedTabsContent value="homework" selectedValue={selectedTab}>
            <CreateHomework />
          </AnimatedTabsContent>

          <AnimatedTabsContent value="session" selectedValue={selectedTab}>
            <CreateSession />
          </AnimatedTabsContent>

          <AnimatedTabsContent value="post" selectedValue={selectedTab}>
            <CreatePost />
          </AnimatedTabsContent>
        </motion.div>

        <TabsList className="flex w-full justify-between rounded-b-lg border-b-0 p-0">
          {tabs.map((tab, index) => (
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
