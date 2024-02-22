"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import error from "next/error";

import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const handleDelete = async () => {
    try {
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description size="2">
            This action will permanently delete your Issue, Are you sure?
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={handleDelete}>
                Delete
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

export default DeleteIssueButton;
