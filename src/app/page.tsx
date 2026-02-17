import { prisma } from "../lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const users = await prisma.user.findMany({
    orderBy: { id: "desc" },
    take: 10,
    include: { posts: { orderBy: { id: "desc" }, take: 3 } },
  });

  return (
    <main>
      <h1>Dashboard</h1>

      <h2>Latest users</h2>
      {users.length === 0 ? (
        <p>No users yet</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u.id} style={{ marginBottom: 12 }}>
              <div>
                <a href={`/users/${u.id}`}>{u.email}</a>{" "}
                {u.name ? `(${u.name})` : ""}{" "}
                <a href={`/users/${u.id}/edit`} style={{ marginLeft: 8 }}>
                  edit
                </a>
              </div>

              {u.posts.length > 0 ? (
                <ul>
                  {u.posts.map((p) => (
                    <li key={p.id}>
                      {p.title}{" "}
                      {/* если позже сделаем страницу поста, заменим на ссылку */}
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ color: "#666" }}>no posts</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
