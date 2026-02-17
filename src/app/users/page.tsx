import { prisma } from "../../lib/prisma";
import { DeleteUserButton } from "./_components/DeleteUserButton";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users = await prisma.user.findMany({ orderBy: { id: "desc" } });

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Users</h1>

      <p>
        <a href="/users/new">Create user</a>
      </p>

      {users.length === 0 ? (
        <p>No users yet</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              #{u.id} — {u.email} {u.name ? `(${u.name})` : ""}
              <DeleteUserButton id={u.id} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
