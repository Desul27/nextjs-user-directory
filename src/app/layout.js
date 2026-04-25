import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";
import Script from "next/script";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
   <html lang="en" suppressHydrationWarning>
       <head>
  <Script
  id="theme-init"
  strategy="beforeInteractive"
>
  {`
    (function() {
      try {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
          document.documentElement.classList.add("dark");
        }
      } catch(e) {}
    })();
  `}
</Script>
  </head>
      <body>
        <nav style={{ 
           padding: 20, 
           borderBottom: "1px solid #ddd",
           display: "flex",
           gap: 12
            }}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
           <ThemeToggle />
        </nav>

        {children}
      </body>
    </html>
  );
}
