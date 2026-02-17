import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

type Params = { params: Promise<{ id: string }> };

function parseId(id: string) {
  const n = Number(id);
  return Number.isInteger(n) ? n : null;
}

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const userId = parseId(id);
  if (userId == null) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params;
  const userId = parseId(id);
  if (userId == null) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  const email = body?.email;
  const name = body?.name;

  if (email != null && (typeof email !== "string" || email.length < 3)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (name != null && typeof name !== "string") {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(email != null ? { email } : {}),
      ...(name !== undefined ? { name: name || null } : {}),
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  const userId = parseId(id);
  if (userId == null) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  await prisma.user.delete({ where: { id: userId } });
  return NextResponse.json({ ok: true });
}
