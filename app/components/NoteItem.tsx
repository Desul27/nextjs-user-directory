import React from "react";
import styles from "./NoteItem.module.css";
import { useEffect, useRef } from "react";


type Note = {
  id: number;
  title: string;
};

type NoteItemProps = {
  note: Note;
  editingId: number | null;
  editText: string;
  setEditText: (text: string) => void;
  handleEdit: (note: Note) => void;
  handleSave: (id: number) => void;
  handleDelete: (id: number) => void;
};

const NoteItem: React.FC<NoteItemProps> = ({ note, editingId, editText, setEditText, handleEdit, handleSave, handleDelete }) => {
  const editRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editingId === note.id) {
      editRef.current?.focus();
  }
}, [editingId, note.id]);

  return (
    <li className={styles.item}>
      {editingId === note.id ? (
        <>
          <input
          ref={editRef}
            className={styles.editInput}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
           if (e.key === "Enter" && editText.trim()) {
             handleSave(note.id);
  }
}}
         
         />
          <button 
          className={styles.actionBtn} 
          disabled={!editText.trim()}
          onClick={() => handleSave(note.id)}>
            💾
            </button>
        </>
      ) : (
        <>
          <span>{note.title}</span>
          <div>
            <button className={styles.actionBtn} onClick={() => handleEdit(note)}>✏️</button>
            <button className={styles.deleteBtn} onClick={() => handleDelete(note.id)}>❌</button>
          </div>
        </>
      )}
    </li>
  );
};

export default NoteItem;