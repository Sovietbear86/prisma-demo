import { prisma } from "../../../../lib/prisma";
import { updateUserAction } from "../../_actions/userActions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditUserPage({ params }: Props) {
  const { id } = await params;
  const userId = Number(id);

  if (!Number.isInteger(userId)) {
    return <main style={{ padding: 24 }}>Invalid id: {id}</main>;
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return <main style={{ padding: 24 }}>Not found (id={userId})</main>;
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Edit user #{user.id}</h1>

      <form action={updateUserAction} style={{ display: "grid", gap: 12, maxWidth: 420 }}>
        <input type="hidden" name="id" value={user.id} />

        <label>
          Email
          <input
            name="email"
            defaultValue={user.email}
            style={{ display: "block", width: "100%", padding: 8 }}
            required
          />
        </label>

        <label>
          Name
          <input
            name="name"
            defaultValue={user.name ?? ""}
            style={{ display: "block", width: "100%", padding: 8 }}
          />
        </label>

        <button type="submit">Save</button>
      </form>

      <p>
        <a href={`/users/${user.id}`}>Cancel</a>
      </p>
    </main>
  );
}
