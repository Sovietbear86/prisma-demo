import { prisma } from "../../lib/prisma";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { id: "desc" },
    include: { author: true },
  });

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Posts</h1>

      <p>
        <a href="/posts/new">Create post</a> | <a href="/users">Users</a>
      </p>

      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        <ul>
          {posts.map((p) => (
            <li key={p.id}>
             <a href={`/posts/${p.id}`}>{p.title}</a> — by{" "}
             <a href={`/users/${p.authorId}`}>{p.author.email}</a>{" "}
             <a href={`/posts/${p.id}/edit`} style={{ marginLeft: 12 }}>
             <button type="button">Редактировать</button>
             </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
