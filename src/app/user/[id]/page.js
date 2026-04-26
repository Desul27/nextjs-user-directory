import Link from "next/link";
export default async function UserDetail({ params }) {
  const { id } = await params;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await res.json();

  return (
    <div style={{ padding: 20 }}>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Company: {user.company.name}</p>
      <Link href="/">Go to Home</Link>
    </div>
  );
}