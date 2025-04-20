// @codex
// Student dashboard: view classes, quizzes, lessons
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

export default function StudentDashboard() {
  const { t } = useTranslation();
  const [classes, setClasses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setClasses(await api.get('/student/classes').then(res => res.data));
      setQuizzes(await api.get('/student/quizzes').then(res => res.data));
      setLessons(await api.get('/student/lessons').then(res => res.data));
    }
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{t('welcome')}</h2>
      <section>
        <h3 className="text-xl font-semibold mb-2">{t('classes')}</h3>
        <ul className="list-disc ml-5 mb-4">
          {classes.map(c => <li key={c.id}>{c.name}</li>)}
        </ul>
      </section>
      <section>
        <h3 className="text-xl font-semibold mb-2">{t('quizzes')}</h3>
        <ul className="list-disc ml-5 mb-4">
          {quizzes.map(q => <li key={q.id}>{t('quiz')} #{q.id} - {q.difficulty}</li>)}
        </ul>
      </section>
      <section>
        <h3 className="text-xl font-semibold mb-2">{t('lessons')}</h3>
        <ul className="list-disc ml-5">
          {lessons.map(l => <li key={l.id}>{l.content}</li>)}
        </ul>
      </section>
    </div>
  );
}
