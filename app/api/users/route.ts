import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

  return NextResponse.json(users, { status: 200 });
}
