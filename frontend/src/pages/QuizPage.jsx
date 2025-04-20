// @codex
// Quiz page: display quiz questions, allow answer selection, show results
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

export default function QuizPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get(`/quizzes/${id}`).then(res => setQuiz(res.data));
  }, [id]);

  const handleChange = (qId, choice) => {
    setAnswers({ ...answers, [qId]: choice });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correct = quiz.questions.filter(q => answers[q.question] === q.answer).length;
    setResult(`${correct} / ${quiz.questions.length}`);
  };

  if (!quiz) return <div>{t('loading')}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{t('quiz')} #{quiz.id}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {quiz.questions.map((q, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-lg p-4">
            <p className="font-semibold mb-2">{q.question}</p>
            {q.choices.map((c, i) => (
              <label key={i} className="block">
                <input
                  type="radio"
                  name={q.question}
                  value={c}
                  onChange={() => handleChange(q.question, c)}
                  required
                  className="mr-2"
                />
                {c}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">{t('submit')}</button>
      </form>
      {result && <div className="mt-4 text-lg">{t('result')}: {result}</div>}
    </div>
  );
}
