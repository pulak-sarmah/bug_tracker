import { Avatar, Box, Card, Flex, Heading, Table } from "@radix-ui/themes";
import React from "react";
import Link from "@/app/components/Link";
import { IssueStatusBadge } from "./components";
import prisma from "@/prisma/db";
const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    where: {
      status: {
        not: "CLOSED",
      },
    },

    orderBy: { createdAt: "desc" },
    take: 6,

    include: {
      assignedToUser: true,
    },
  });
  prisma.issue.findMany({});
  return (
    <>
      {!issues ? (
        <Box>
          <Heading className=" text-center"> No issue Found....</Heading>
        </Box>
      ) : (
        <Card>
          <Heading size="4" mb="5">
            Latest Issues
          </Heading>
          <Table.Root>
            <Table.Body>
              {issues.map((issue) => (
                <Table.Row key={issue.id}>
                  <Table.Cell>
                    <Flex justify="between">
                      <Flex direction="column" align="start" gap="2">
                        <Link
                          className="text-blue-500"
                          href={`/issues/${issue.id}`}
                        >
                          {issue.title}
                        </Link>
                        <Flex gap="2">
                          <IssueStatusBadge status={issue.status} />
                          {issue.createdAt.toDateString()}
                        </Flex>
                      </Flex>
                      {issue.assignedToUser && (
                        <Avatar
                          src={issue.assignedToUser.image!}
                          fallback="?"
                          size="2"
                          radius="full"
                        />
                      )}
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card>
      )}
    </>
  );
};

export default LatestIssues;
