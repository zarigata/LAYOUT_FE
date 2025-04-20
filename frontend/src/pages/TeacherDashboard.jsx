// @codex
// Teacher dashboard: manage students, quizzes, lessons, analytics
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function TeacherDashboard() {
  const { t } = useTranslation();
  const [tab, setTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    // Fetch data based on active tab
    async function fetchData() {
      try {
        if (tab === 'students') setStudents(await api.get('/students').then(res => res.data));
        if (tab === 'quizzes') setQuizzes(await api.get('/quizzes').then(res => res.data));
        if (tab === 'lessons') setLessons(await api.get('/lessons').then(res => res.data));
        if (tab === 'analytics') setAnalytics(await api.get('/analytics').then(res => res.data));
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [tab]);

  const renderTab = () => {
    switch(tab) {
      case 'students':
        return (
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">ID</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{s.user.name}</td>
                  <td className="p-2 border">{s.user.email}</td>
                  <td className="p-2 border">{s.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'quizzes':
        return (
          <div className="grid grid-cols-3 gap-4">
            {quizzes.map(q => (
              <div key={q.id} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="font-bold">{t('quiz')} #{q.id}</h3>
                <p>Difficulty: {q.difficulty}</p>
              </div>
            ))}
          </div>
        );
      case 'lessons':
        return (
          <div className="space-y-4">
            {lessons.map(l => (
              <div key={l.id} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="font-bold">{t('lesson')} #{l.id}</h3>
                <p>{l.content}</p>
              </div>
            ))}
          </div>
        );
      case 'analytics':
        // Example: students count bar chart
        const data = {
          labels: analytics.map(a => `S${a.studentId}`),
          datasets: [{
            label: 'Metrics',
            data: analytics.map(a => Object.values(a.metrics).length),
            backgroundColor: 'rgba(26,115,232,0.5)'
          }]
        };
        return <Bar data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>
      <div className="flex space-x-4 mb-4">
        {['students','quizzes','lessons','analytics'].map(key => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded ${tab===key?'bg-primary text-white':'bg-gray-100'}`}
          >{t(key)}</button>
        ))}
      </div>
      <div>{renderTab()}</div>
    </div>
  );
}
