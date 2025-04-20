// @codex
// LessonCard component: display lesson summary
import React from 'react';

export default function LessonCard({ lesson }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg">
      <h3 className="font-bold mb-2">Lesson #{lesson.id}</h3>
      <p>{lesson.content}</p>
    </div>
  );
}
