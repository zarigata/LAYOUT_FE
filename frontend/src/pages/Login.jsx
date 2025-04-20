// @codex
// Login page for user authentication
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await login(email, password);
      // Redirect based on role
      if (user.role === 'ADMIN') return navigate('/admin');
      if (user.role === 'TEACHER') return navigate('/teacher');
      if (user.role === 'STUDENT') return navigate('/student');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  }

  return (
    <div className="flex items-center justify-center h-full">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">{t('login')}</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
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
        <label className="block mb-4">
          <span className="text-gray-700">{t('password')}</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
        </label>
        <button type="submit" className="bg-primary text-white w-full p-2 rounded">
          {t('submit')}
        </button>
      </form>
    </div>
  );
}
