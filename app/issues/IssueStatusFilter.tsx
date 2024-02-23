"use client";

import { Status } from "@prisma/client";
import { Select, TextFieldInput } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <>
      <Select.Root
        defaultValue={searchParams.get("status") || ""}
        onValueChange={(status) => {
          const params = new URLSearchParams();
          if (status) params.append("status", status);
          if (searchParams.get("orderBy"))
            params.append("orderBy", searchParams.get("orderBy")!);
          const query = params.size ? "?" + params.toString() : "";
          router.push("/issues" + query);
        }}
      >
        <Select.Trigger placeholder="Filter by status..." />
        <Select.Content>
          {statuses.map((status, index) => (
            <Select.Item key={index} value={status.value || " "}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <TextFieldInput
        className="!w-[24rem]"
        placeholder="Search by issue name..."
        onChange={(e) => {
          const params = new URLSearchParams();
          if (e.target.value) params.append("title", e.target.value);
          if (searchParams.get("status"))
            params.append("status", searchParams.get("status")!);
          const query = params.size ? "?" + params.toString() : "";
          router.push("/issues" + query);
        }}
      />
    </>
  );
};

export default IssueStatusFilter;
