"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./SearchUser.module.css";

export default function SearchUser({ users }) {
  const [search, setSearch] = useState("");

  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.input}
      />

      <div className={styles.grid}>
        {filtered.map((user) => (
          <Link
            key={user.id}
            href={`/user/${user.id}`}
            className={styles.card}
          >
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}