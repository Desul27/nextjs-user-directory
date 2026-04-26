import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div style={{ padding: 20 }}>
          <ThemeToggle />
        </div>

        {children}
      </body>
    </html>
  );
}