import prisma from "@/prisma/db";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkleton from "@/app/issues/_components/IssueFormSkleton";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkleton />,
});
interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
