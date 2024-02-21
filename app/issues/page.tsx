import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssuePage = () => {
  return (
    <div>
      <Link href="/issues/new">
        <Button>Create New Issue</Button>
      </Link>
    </div>
  );
};

export default IssuePage;
