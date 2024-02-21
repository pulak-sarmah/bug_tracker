"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React from "react";
import { toolbarOptions } from "@/constants/simpleMdeOptions";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title*" />
      </TextField.Root>
      <SimpleMDE
        options={{
          placeholder: "Add a description of the bug...",
          toolbar: toolbarOptions,
        }}
      />

      <Button>Submit new Issue</Button>
    </div>
  );
};

export default NewIssuePage;
