// @codex
// QuizCard component: link to quiz page with basic info
import React from 'react';
import { Link } from 'react-router-dom';

export default function QuizCard({ quiz }) {
  return (
    <Link to={`/quiz/${quiz.id}`} className="block bg-white shadow-md rounded-lg p-4 hover:shadow-lg">
      <h3 className="font-bold">Quiz #{quiz.id}</h3>
      <p>Difficulty: {quiz.difficulty}</p>
    </Link>
  );
}
