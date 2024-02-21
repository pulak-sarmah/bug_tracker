import { Box } from "@radix-ui/themes";
import delay from "delay";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingCreateNewIssuePage = async () => {
  await delay(4000);

  return (
    <Box className="max-w-xl space-y-3">
      <Skeleton width={"20rem"} />
      <Skeleton height={"20rem"} />
    </Box>
  );
};

export default LoadingCreateNewIssuePage;
