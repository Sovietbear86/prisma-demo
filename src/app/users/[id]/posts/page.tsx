import { prisma } from "../../../../lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function UserPostsPage({ params }: Props) {
  const { id } = await params;
  const userId = Number(id);

  if (!Number.isInteger(userId)) return <main className="container">Invalid id: {id}</main>;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      posts: { orderBy: { id: "desc" } },
    },
  });

  if (!user) return <main className="container">User not found (id={userId})</main>;

  return (
    <main className="container">
      <div className="stack">
        <h1>Посты пользователя</h1>

        <div className="card">
          <div>
            <div className="muted">Пользователь</div>
            <div style={{ fontWeight: 600 }}>
              <a href={`/users/${user.id}`}>{user.email}</a>
              {user.name ? ` — ${user.name}` : ""}
            </div>
          </div>

          <div className="row" style={{ marginTop: 12, gap: 8 }}>
            <a className="btn" href={`/users/${user.id}`}>
              Назад к профилю
            </a>
            <a className="btn" href="/posts">
              Все посты
            </a>
            <a className="btn btnPrimary" href="/posts/new">
              Создать пост
            </a>
          </div>
        </div>

        {user.posts.length === 0 ? (
          <p className="muted">У пользователя пока нет постов.</p>
        ) : (
          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Заголовок</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {user.posts.map((p) => (
                  <tr key={p.id}>
                    <td className="muted">#{p.id}</td>
                    <td>
                      <a href={`/posts/${p.id}`}>{p.title}</a>
                    </td>
                    <td>
                      <div className="row" style={{ gap: 8 }}>
                        <a className="btn" href={`/posts/${p.id}`}>
                          Открыть
                        </a>
                        <a className="btn" href={`/posts/${p.id}/edit`}>
                          Редактировать
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

