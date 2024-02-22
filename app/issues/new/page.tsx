import dynamic from "next/dynamic";
import IssueFormSkleton from "../_components/IssueFormSkleton";
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
