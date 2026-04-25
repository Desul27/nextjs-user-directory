"use client";
import Link from "next/link";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
    <br/>
     <Link href="/">Go to Home</Link>
    </>
  );
}