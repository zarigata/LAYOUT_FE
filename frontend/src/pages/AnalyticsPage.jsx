// @codex
// Analytics page: display performance metrics via charts
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

export default function AnalyticsPage() {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    api.get('/analytics').then(res => {
      const analytics = res.data;
      const labels = analytics.map(a => `S${a.studentId}`);
      const dataSet = analytics.map(a => Object.values(a.metrics).reduce((sum, v) => sum + (Array.isArray(v) ? v.length : 1), 0));
      setChartData({
        labels,
        datasets: [{ label: t('analytics'), data: dataSet, backgroundColor: 'rgba(26,115,232,0.5)' }]
      });
    });
  }, [t]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{t('analytics')}</h2>
      <Bar data={chartData} />
    </div>
  );
}
