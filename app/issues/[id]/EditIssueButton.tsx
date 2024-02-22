import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { PiNotePencilDuotone } from "react-icons/pi";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      <Button className="min-w-full">
        <PiNotePencilDuotone />
        Edit Issue
      </Button>
    </Link>
  );
};

export default EditIssueButton;
