// @codex
// Admin portal: manage all users (localhost-only)
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useTranslation } from 'react-i18next';

export default function AdminPortal() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await api.get('/admin/users');
    setUsers(res.data);
  }

  async function handleDelete(id) {
    if (window.confirm('Are you sure?')) {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Portal</h2>
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="p-2 border">{u.id}</td>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border">
                <button onClick={() => handleDelete(u.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
