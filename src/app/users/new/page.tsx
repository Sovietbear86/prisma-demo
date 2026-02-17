"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewUserPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      router.push("/users");
      router.refresh();
    } catch (err: any) {
      setError(err?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Create user</h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 420 }}>
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: "block", width: "100%", padding: 8 }}
            placeholder="alice@example.com"
            required
          />
        </label>

        <label>
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ display: "block", width: "100%", padding: 8 }}
            placeholder="Alice"
          />
        </label>

        <button disabled={loading} type="submit">
          {loading ? "Creating..." : "Create"}
        </button>

        {error && <pre style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{error}</pre>}
      </form>

      <p>
        <a href="/users">Back</a>
      </p>
    </main>
  );
}
