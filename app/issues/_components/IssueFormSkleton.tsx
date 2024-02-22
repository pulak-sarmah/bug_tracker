import { Box } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components";

const IssueFormSkleton = () => {
  return (
    <Box className="max-w-xl space-y-3">
      <Skeleton height="2rem" />
      <Skeleton className="h-96" />
    </Box>
  );
};

export default IssueFormSkleton;
