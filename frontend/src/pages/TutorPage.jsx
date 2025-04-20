// @codex
// Tutor page: chat interface for AI tutor
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

export default function TutorPage() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const containerRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const question = input;
    setMessages(msgs => [...msgs, { role: 'student', text: question }]);
    setInput('');
    try {
      const res = await api.post('/tutor', { question });
      const replyText = res.data.choices?.[0]?.text || res.data;
      setMessages(msgs => [...msgs, { role: 'tutor', text: replyText }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { role: 'tutor', text: t('error') }]);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col bg-white shadow-sm rounded p-4 h-full">
      <h2 className="text-2xl font-bold mb-4">{t('tutor')}</h2>
      <div ref={containerRef} className="flex-1 overflow-auto mb-4 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={`p-2 rounded ${m.role === 'student' ? 'bg-primary text-white self-end' : 'bg-gray-100 text-gray-800 self-start'}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder={t('message')}
          className="flex-1 border rounded p-2"
        />
        <button onClick={sendMessage} className="bg-primary hover:bg-blue-700 text-white rounded p-2">{t('send')}</button>
      </div>
    </div>
  );
}
