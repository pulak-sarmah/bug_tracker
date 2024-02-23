import { Button, Flex, Grid } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = () => {
  return (
    <div className="grid  md:grid-cols-3 gap-4 md:gap-8  mb-5">
      <IssueStatusFilter />
      <Link href="/issues/new">
        <Button>Create New Issue</Button>
      </Link>
    </div>
  );
};

export default IssueActions;
