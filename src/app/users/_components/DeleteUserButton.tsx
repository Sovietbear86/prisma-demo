"use client";

import { useRouter } from "next/navigation";

export function DeleteUserButton({ id }: { id: number }) {
  const router = useRouter();

  async function onDelete() {
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert(await res.text());
      return;
    }
    router.refresh(); // обновит server component список
  }

  return (
    <button onClick={onDelete} style={{ marginLeft: 12 }}>
      Delete
    </button>
  );
}
