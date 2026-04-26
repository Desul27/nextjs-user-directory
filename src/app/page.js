import Link from "next/link";
import SearchUser from "./components/SearchUser";
import styles from "./page.module.css";
export default async function Home() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Directory</h1>

      <SearchUser users={users} />
    </div>
  );
}