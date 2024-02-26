"use client";
import { Spinner } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const IssueStatusUpdate = ({ issue }: { issue: Issue }) => {
  const [status, setStatus] = useState(issue.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const updateStatus = (newStatus: Status) => {
    axios
      .patch("/api/issues/" + issue.id, {
        status: newStatus,
      })
      .then(() => {
        setStatus(newStatus);
        router.push("/issues");
        router.refresh();
      })
      .catch(() => {
        toast.error("Status could not be updated.");
      });
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            className="!bg-green-600"
            disabled={status === "CLOSED" || loading === true ? true : false}
          >
            {loading ? <Spinner /> : "Mark as fixed"}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Are you sure?</AlertDialog.Title>
          <AlertDialog.Description size="2">
            No modification can be done further
          </AlertDialog.Description>

          <Flex gap={"3"} mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button className="!bg-slate-300">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                className="!bg-green-600"
                onClick={() => {
                  updateStatus("CLOSED");
                }}
              >
                Fixed
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted
          </AlertDialog.Description>
          <Button variant="soft" mt="2" onClick={() => setError(false)}>
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default IssueStatusUpdate;
