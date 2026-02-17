import { prisma } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function UserPage({ params }: Props) {
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
      <h1>User #{user.id}</h1>
      <p>Email: {user.email}</p>
      <p>Name: {user.name ?? "(empty)"}</p>
      <p>Created: {user.createdAt.toISOString()}</p>

      <p>
        <a href={`/users/${user.id}/edit`}>Edit</a> | <a href="/users">Back</a>
        <a className="btn" href={`/users/${user.id}/posts`}>Посты пользователя</a>
      </p>
    </main>
  );
}
