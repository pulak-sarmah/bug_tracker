import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/db";

const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title must be at least 1 character long")
    .max(255, "Title must be at most 255 characters long"),
  description: z
    .string()
    .min(1, "Description must be at least 1 character long"),
});

type inferred = z.infer<typeof createIssueSchema>;

export async function POST(request: NextRequest) {
  const body: inferred = await request.json();
  const validated = createIssueSchema.safeParse(body);

  if (!validated.success) {
    return NextResponse.json(validated.error.errors, { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: {
      title: validated.data.title,
      description: validated.data.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
