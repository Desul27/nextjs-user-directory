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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); 
  useEffect(() => {
  setMounted(true);
}, []);

useEffect(() => {
  fetch("/api/notes")
    .then((res) => res.json())
    .then((data) => setNotes(data));
}, []);   

useEffect(() => {
  if (mounted && isLoaded) {
    localStorage.setItem("notes", JSON.stringify(notes));
  }
}, [notes, mounted, isLoaded]);

if (!mounted) return <p>Loading...</p>;
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
  //hapus data berdasar id
    const handleDelete = async (id: number) => {
    await fetch("/api/notes", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
    });
    setNotes((prev) => prev.filter((note) => note.id !== id));
    };
      /** Edit */
      const handleEdit = (note: Note) => {
       setEditingId(note.id);     // tandai note yang diedit
       setEditText(note.title);   // isi input dengan value lama
    };
    // simpan data yang telah diedit
    const handleSave = async (id: number) => {
      await fetch("/api/notes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, title: editText }),
      });
       setNotes((prev) =>
        prev.map((note) =>
          note.id === id ? { ...note, title: editText } : note
        )
      );
      setEditingId(null);
      setEditText("");
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
        {editingId === note.id ? (
       <>
        <input
        className={styles.editInput}
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        />
      <button onClick={() => handleSave(note.id)}>💾</button>
       </>
  ) : (
    <>
      <span>{note.title}</span>
      <div>
        <button className={styles.actionBtn} onClick={() => handleEdit(note)}>✏️</button>
        <button  className={styles.deleteBtn} onClick={() => handleDelete(note.id)}>❌</button>
      </div>
    </>
  )}
</li>
        ))}
      </ul>
    </div>
  </div>
  );
}