import React from "react";
import { Box, BoxBody } from "../Box";
import { Badge } from "../ui/badge";
import { Calendar, Clock } from "lucide-react";
import Users from "../Users";

export default function LiveRoomHeader() {
  return (
    <Box className="grid grid-cols-1 items-center md:grid-cols-[auto_1fr] mb-3">
      <BoxBody className="sm:border-e sm:p-6!">
        <div>
          <Badge className="rounded-full py-1">حل الواجب</Badge>
        </div>
      </BoxBody>
      <BoxBody className="sm:p-6!">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm sm:text-base">
            <h1 className="mb-2">
              الوحدة الرابعة - الدرس الثاني + كويز من خمس أسئلة
            </h1>
            <div className="flex gap-6 text-neutral-500">
              <div className="flex items-center gap-2">
                <Calendar size={24} />
                <span>٢٣ يناير ٢٠٢٥</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={24} />
                <span> ١٠:٠٠ صباحًا</span>
              </div>
            </div>
          </div>
          <Users />
        </div>
      </BoxBody>
    </Box>
  );
}
