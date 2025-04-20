// CODEX: Landing page for Feverducation with Google-inspired Material UI, LanguageSwitcher, and ThemeSwitcher
import Link from 'next/link';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { translations } = useLanguage();
  return (
    <div className="main-container">
      <ThemeSwitcher />
      <LanguageSwitcher />
      <h1 className="title">{translations.greeting} - Feverducation Platform</h1>
      <div className="card">
        <ul className="list">
          <li className="list-item"><Link href="/teacher" className="link">{translations.teacher_portal?.title || 'Teacher Portal'}</Link></li>
          <li className="list-item"><Link href="/student" className="link">{translations.student_portal?.title || 'Student Portal'}</Link></li>
          <li className="list-item"><Link href="/admin" className="link">{translations.admin_dashboard?.title || 'Administrator Dashboard'}</Link></li>
        </ul>
      </div>
    </div>
  );
}
