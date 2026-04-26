"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
type Note = {
  id: number;
  title: string;
};
export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");

  // ambil data dari API
  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);
// Tambah  data ke  API
    const handleAdd = async () => {
    if (!title) return;
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    const newNote = await res.json();

    setNotes((prev) => [...prev, newNote]);
    setTitle("");
  };

    return (
     <div className={styles.container}>
    <div className={styles.card}>
      <h1 className={styles.title}>Notes App</h1>

      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tulis note..."
        />

        <button className={styles.button} onClick={handleAdd}>
          Tambah
        </button>
      </div>

      <ul className={styles.list}>
        {notes.map((note) => (
          <li key={note.id} className={styles.item}>
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
}