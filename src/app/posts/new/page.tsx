import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  const users = await prisma.user.findMany({ orderBy: { id: "desc" } });

  async function createPostAction(formData: FormData) {
    "use server";

    const title = String(formData.get("title") ?? "").trim();
    const content = String(formData.get("content") ?? "").trim();
    const authorId = Number(formData.get("authorId"));

    if (!title) throw new Error("Title is required");
    if (!Number.isInteger(authorId)) throw new Error("authorId is required");

    const post = await prisma.post.create({
      data: {
        title,
        content: content || null,
        author: { connect: { id: authorId } },
      },
    });

    redirect(`/posts`);
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Create post</h1>

      <form action={createPostAction} style={{ display: "grid", gap: 12, maxWidth: 520 }}>
        <label>
          Title
          <input name="title" style={{ display: "block", width: "100%", padding: 8 }} required />
        </label>

        <label>
          Content
          <textarea name="content" style={{ display: "block", width: "100%", padding: 8 }} rows={6} />
        </label>

        <label>
          Author
          <select name="authorId" style={{ display: "block", width: "100%", padding: 8 }} required>
            <option value="" disabled selected>
              Select user...
            </option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                #{u.id} — {u.email}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Create</button>
      </form>

      <p>
        <a href="/posts">Back</a>
      </p>
    </main>
  );
}
