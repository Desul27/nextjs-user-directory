"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // ambil dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved === "dark";

    setDark(isDark);

    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // apply ke DOM
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button onClick={() => setDark(prev => !prev)}>
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}