"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";

export async function updatePostAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!Number.isInteger(id)) throw new Error("Invalid id");
  if (!title) throw new Error("Title is required");

  await prisma.post.update({
    where: { id },
    data: { title, content: content || null },
  });

  redirect(`/posts/${id}`);
}

export async function deletePostAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) throw new Error("Invalid id");

  await prisma.post.delete({ where: { id } });
  redirect(`/posts`);
}
