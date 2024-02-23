import prisma from "@/prisma/db";
import { Status } from "@prisma/client";
import { Box, Flex, Heading } from "@radix-ui/themes";
import Pagination from "../components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";

interface Props {
  searchParams: IssueQuery;
}

const IssuePage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const title = searchParams.title || undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      AND: [{ status }, { title: { contains: title } }],
    },
    orderBy,

    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: { status },
  });

  return (
    <Flex direction={"column"} gap="4">
      <IssueActions />

      {issues.length === 0 ? (
        <Box>
          <Heading className=" text-center"> No issue Found....</Heading>
        </Box>
      ) : (
        <>
          <IssueTable searchParams={searchParams} issues={issues} />

          <Pagination
            pageSize={pageSize}
            currentPage={page}
            itemCount={issueCount}
          />
        </>
      )}
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuePage;
