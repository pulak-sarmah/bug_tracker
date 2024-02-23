import prisma from "@/prisma/db";
import { Box, Heading, Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "../components";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import Link from "next/link";
import { BiArrowToTop } from "react-icons/bi";

interface Props {
  searchParams: { status: Status; title: string; orderBy: keyof Issue };
}

const IssuePage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const title = searchParams.title || undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      AND: [{ status }, { title: { contains: title } }],
    },
    orderBy,
  });

  return (
    <div>
      <IssueActions />

      {issues.length === 0 ? (
        <Box>
          <Heading className=" text-center"> No issue Found....</Heading>
        </Box>
      ) : (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column.className}
                >
                  <Link
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: column.value,
                      },
                    }}
                  >
                    {column.label}
                  </Link>
                  {column.value === searchParams.orderBy && (
                    <BiArrowToTop className="inline" />
                  )}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default IssuePage;
