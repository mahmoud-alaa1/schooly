"use client";
import { Box, BoxHeader } from "@/components/Box";
import { MESSAGES } from "@/lib/constants";

const LiveLessonError = () => (
  <Box>
    <BoxHeader>
      <p className="text-red-500">{MESSAGES.ERROR}</p>
    </BoxHeader>
  </Box>
);

export default LiveLessonError;
