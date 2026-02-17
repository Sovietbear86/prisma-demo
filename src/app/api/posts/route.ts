import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { id: "desc" },
    include: { author: true },
  });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  const title = body?.title;
  const content = body?.content;
  const authorId = Number(body?.authorId);

  if (typeof title !== "string" || title.trim().length < 1) {
    return NextResponse.json({ error: "Invalid title" }, { status: 400 });
  }
  if (!Number.isInteger(authorId)) {
    return NextResponse.json({ error: "Invalid authorId" }, { status: 400 });
  }
  if (content != null && typeof content !== "string") {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      title: title.trim(),
      content: typeof content === "string" && content.length ? content : null,
      author: { connect: { id: authorId } },
    },
    include: { author: true },
  });

  return NextResponse.json(post, { status: 201 });
}
