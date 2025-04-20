// CODEX: Landing page for Feverducation
import Link from 'next/link';
export default function Home() {
  return (
    <div>
      <h1>Feverducation Platform</h1>
      <ul>
        <li><Link href="/teacher">Teacher Portal</Link></li>
        <li><Link href="/student">Student Portal</Link></li>
        <li><Link href="/admin">Administrator Dashboard</Link></li>
      </ul>
    </div>
  );
}
