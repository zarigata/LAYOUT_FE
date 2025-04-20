// @codex
// Registration page for new user signup
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await register(name, email, password, role);
      if (user.role === 'ADMIN') navigate('/admin');
      if (user.role === 'TEACHER') navigate('/teacher');
      if (user.role === 'STUDENT') navigate('/student');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  }

  return (
    <div className="flex items-center justify-center h-full">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">{t('register')}</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <label className="block mb-2">
          <span className="text-gray-700">{t('name')}</span>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">{t('email')}</span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">{t('password')}</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">{t('role')}</span>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="TEACHER">{t('teacher')}</option>
            <option value="STUDENT">{t('student')}</option>
          </select>
        </label>
        <button type="submit" className="bg-primary text-white w-full p-2 rounded">
          {t('submit')}
        </button>
      </form>
    </div>
  );
}
