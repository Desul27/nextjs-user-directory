"use client";
import Link from "next/link";
export default function Error({ error, reset }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Terjadi kesalahan 😢</h2>
      <p>{error.message}</p>

      <button onClick={() => reset()}>
        Coba lagi
      </button>
      <br/>
       <Link href="/">Go to Home</Link>
    </div>
  );
}