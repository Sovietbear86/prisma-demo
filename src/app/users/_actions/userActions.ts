"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";

export async function updateUserAction(formData: FormData) {
  const idRaw = formData.get("id");
  const emailRaw = formData.get("email");
  const nameRaw = formData.get("name");

  const id = Number(idRaw);
  const email = typeof emailRaw === "string" ? emailRaw : "";
  const name = typeof nameRaw === "string" ? nameRaw : "";

  if (!Number.isInteger(id)) {
    throw new Error("Invalid id");
  }
  if (email.length < 3) {
    throw new Error("Invalid email");
  }

  await prisma.user.update({
    where: { id },
    data: { email, name: name || null },
  });

  redirect(`/users/${id}`);
}
