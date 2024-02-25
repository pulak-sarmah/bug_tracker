import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { z } from "zod";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password should be 8 charecter long"),
    name: z.string().max(32, "name should not be longer than 32 words"),
  });

  const body = await request.json();

  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: body.email } });

  if (user) {
    return NextResponse.json({ error: "User already exist" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword,
      name: body.name,
    },
  });

  return NextResponse.json(
    { email: newUser.email, name: newUser.name },
    { status: 201 }
  );
}
