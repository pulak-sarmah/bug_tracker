import prisma from "@/prisma/db";
import page from "../page";
import { notFound } from "next/navigation";
interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  if (typeof params.id !== "number") return notFound();
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) return notFound();

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.status}</p>
      <p>{issue.description}</p>
      <p>{issue.createdAt.toDateString()}</p>
      <p>{issue.updatedAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
