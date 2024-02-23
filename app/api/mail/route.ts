import nodemailer from "nodemailer";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const user = await prisma.user.findUnique({ where: { id: body.userId } });
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(body.issueId) },
  });

  if (!user || !issue) {
    return NextResponse.json(
      { error: "Invalid user or issue ID" },
      { status: 400 }
    );
  }

  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  let htmlTemplate = fs.readFileSync(
    path.resolve(process.cwd(), "./app/api/mail/issueAssigned.html"),
    "utf8"
  );

  let info = await transporter.sendMail({
    from: `"Issue Tracker" <${process.env.EMAIL_USERNAME}>`,
    to: user.email!,
    subject: "New Issue Assigned",
    html: htmlTemplate
      .replace("[User's Name]", user.name || "user")
      .replace("[Issue Title]", issue.title)
      .replace("[Issue Description]", issue.description),
  });

  return NextResponse.json({ message: "Email sent" }, { status: 200 });
}
