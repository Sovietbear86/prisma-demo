import { prisma } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const postId = Number(id);

  if (!Number.isInteger(postId)) return <main>Invalid id: {id}</main>;

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { author: true },
  });

  if (!post) return <main>Not found (id={postId})</main>;

  return (
    <main>
      <h1>{post.title}</h1>
      <p style={{ color: "#666" }}>
        by <a href={`/users/${post.authorId}`}>{post.author.email}</a>
      </p>

      <div style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>
        {post.content ?? "(no content)"}
      </div>

      <p style={{ marginTop: 16 }}>
        <a href={`/posts/${post.id}/edit`}>
        <button type="button">Редактировать</button>
        </a> | <a href="/posts">Back</a>
      </p>
    </main>
  );
}
