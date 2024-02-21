import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/db";
import { createIssueSchema } from "../../validationSchemas";

type inferred = z.infer<typeof createIssueSchema>;

export async function POST(request: NextRequest) {
  const body: inferred = await request.json();
  const validated = createIssueSchema.safeParse(body);

  if (!validated.success) {
    return NextResponse.json(validated.error.format(), { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: {
      title: validated.data.title,
      description: validated.data.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
