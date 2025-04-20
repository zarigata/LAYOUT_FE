// CODEX: LanguageSwitcher component for selecting app language
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' }
];

export default function LanguageSwitcher() {
  const { switchLanguage } = useLanguage();
  return (
    <div style={{ marginBottom: 16 }}>
      <label htmlFor="language-select" style={{ marginRight: 8 }}>🌐 Language:</label>
      <select id="language-select" onChange={e => switchLanguage(e.target.value)}>
        {LANGUAGES.map(lang => (
          <option key={lang.code} value={lang.code}>{lang.label}</option>
        ))}
      </select>
    </div>
  );
}
