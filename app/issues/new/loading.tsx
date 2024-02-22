import { Box, Skeleton } from "@radix-ui/themes";

const LoadingCreateNewIssuePage = () => {
  return (
    <Box className="max-w-xl space-y-3">
      <Skeleton />
      <Skeleton className="h-96" />
    </Box>
  );
};

export default LoadingCreateNewIssuePage;
