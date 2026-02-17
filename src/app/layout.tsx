// src/app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body style={{ fontFamily: "system-ui", margin: 0 }}>
        <header style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
          <nav style={{ display: "flex", gap: 12 }}>
            <a href="/">Home</a>
            <a href="/users">Users</a>
            <a href="/users/new">New user</a>
            <a href="/posts">Posts</a>
            <a href="/posts/new">New post</a>
          </nav>
        </header>

        <div style={{ padding: 24 }}>{children}</div>
      </body>
    </html>
  );
}
