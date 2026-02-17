import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  const email = body?.email;
  const name = body?.name;

  if (typeof email !== "string" || email.length < 3) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (name != null && typeof name !== "string") {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: { email, name: name || null },
  });

  return NextResponse.json(user, { status: 201 });
}
