"use client";
import dynamic from "next/dynamic";
import { Button, Callout, TextField } from "@radix-ui/themes";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import React, { useRef, useState } from "react";
import { toolbarOptions } from "@/constants/simpleMdeOptions";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  let description = "";
  const router = useRouter();
  const { register, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState("");

  const descriptionRef = useRef(description);

  const onSubmit = handleSubmit(async (data) => {
    data.description = descriptionRef.current;
    try {
      console.log(data);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      console.error(error);
      setError("An unexpected error has occured.");
    }
  });

  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input placeholder="Title*" {...register("title")} />
        </TextField.Root>

        <SimpleMDE
          value={description}
          onChange={(value) => {
            descriptionRef.current = value;
          }}
          options={{
            placeholder: "Add a description of the bug...",
            toolbar: toolbarOptions || undefined,
          }}
        />

        <Button>Submit new Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
