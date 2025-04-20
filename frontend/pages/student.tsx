// CODEX: Student Portal page with Material UI, ThemeSwitcher, and LanguageSwitcher
import React from 'react';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { useLanguage } from '../context/LanguageContext';

export default function StudentPortal() {
  const { translations } = useLanguage();
  return (
    <div className="main-container">
      <ThemeSwitcher />
      <LanguageSwitcher />
      <h1>{translations.student_portal?.title || 'Student Portal'}</h1>
      <div className="card">
        <h2>{translations.student_portal?.courses || 'Courses'}</h2>
        {/* CODEX: Add more student dashboard features here, using translations as needed */}
      </div>
    </div>
  );
}
