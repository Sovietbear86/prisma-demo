import { prisma } from "../../../../lib/prisma";
import { updatePostAction, deletePostAction } from "../../_actions/postActions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const postId = Number(id);

  if (!Number.isInteger(postId)) return <main>Invalid id: {id}</main>;

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) return <main>Not found (id={postId})</main>;

  return (
    <main>
      <h1>Edit post #{post.id}</h1>

      <form action={updatePostAction} style={{ display: "grid", gap: 12, maxWidth: 520 }}>
        <input type="hidden" name="id" value={post.id} />

        <label>
          Title
          <input
            name="title"
            defaultValue={post.title}
            className="input"
            required
          />
        </label>

        <label>
          Content
          <textarea
            name="content"
            defaultValue={post.content ?? ""}
            className="textarea"
            rows={8}
          />
        </label>

        <button className="btn btnPrimary" type="submit">Сохранить</button>
      </form>

      <form action={deletePostAction} style={{ marginTop: 16 }}>
        <input type="hidden" name="id" value={post.id} />
       <button className="btn" type="submit" style={{ borderColor: "rgba(255,0,0,0.35)" }}>Удалить пост
        </button>
      </form>

      <p style={{ marginTop: 16 }}>
        <a href={`/posts/${post.id}`}>Back</a>
      </p>
    </main>
  );
}

