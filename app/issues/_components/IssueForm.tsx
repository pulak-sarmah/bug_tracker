"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchemas";
import { toolbarOptions } from "@/constants/simpleMdeOptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  let description = issue?.description;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      description: issue?.description,
    },
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const descriptionRef = useRef(description);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      setLoading(true);
      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      console.error(error);
      setErr("An unexpected error has occured.");
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="max-w-xl space-y-3">
      {err && (
        <Callout.Root color="red">
          <Callout.Text>{err}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title*"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <SimpleMDE
          value={descriptionRef.current}
          onChange={(value) => {
            descriptionRef.current = value;
            setValue("description", value);
          }}
          options={{
            placeholder: "Add a description of the bug...",
            toolbar: toolbarOptions || undefined,
          }}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={loading}>
          {loading ? <Spinner /> : issue ? "Update Issue" : "Submit new Issue"}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
