// @codex
// Responsive navigation bar with role-based links and language selector
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLang = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-xl font-bold text-primary">Feverducation</Link>
        {user && user.role === 'TEACHER' && <Link to="/teacher" className="text-gray-700 hover:text-primary">{t('classes')}</Link>}
        {user && user.role === 'TEACHER' && <Link to="/analytics" className="text-gray-700 hover:text-primary">{t('analytics')}</Link>}
        {user && user.role === 'STUDENT' && <Link to="/student" className="text-gray-700 hover:text-primary">{t('classes')}</Link>}
        {user && user.role === 'STUDENT' && <Link to="/tutor" className="text-gray-700 hover:text-primary">{t('tutor')}</Link>}
        {user && user.role === 'ADMIN' && <Link to="/admin" className="text-gray-700 hover:text-primary">{t('admin')}</Link>}
      </div>
      <div className="flex items-center space-x-4">
        <select value={i18n.language} onChange={changeLang} className="p-1 border rounded">
          <option value="en">{t('english')}</option>
          <option value="es">{t('spanish')}</option>
        </select>
        {user
          ? <button onClick={() => { logout(); navigate('/login'); }} className="bg-primary hover:bg-blue-700 text-white px-3 py-1 rounded">{t('logout')}</button>
          : <Link to="/login" className="text-gray-700 hover:text-primary">{t('login')}</Link>
        }
      </div>
    </nav>
  );
}
