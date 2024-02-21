import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingCreateNewIssuePage = async () => {
  return (
    <Box className="max-w-xl space-y-3">
      <Skeleton width={"20rem"} />
      <Skeleton height={"20rem"} />
    </Box>
  );
};

export default LoadingCreateNewIssuePage;
