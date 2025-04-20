// CODEX: FeverEducation Student Dashboard - Android-inspired UI
import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Tabs, Tab, IconButton, Avatar, AppBar, Toolbar, Badge } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import QuizIcon from '@mui/icons-material/Quiz';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AITutor from '../components/AITutor';
import { useTranslation } from '../i18n';
import AnimatedButton from '../components/AnimatedButton';
import { useState } from 'react';

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  sublabel: string;
  color: string;
}

const statCards: StatCard[] = [
  {
    icon: <SchoolIcon fontSize="large" color="primary" />, label: 'Aulas Matriculadas', value: 5, sublabel: 'Ativas', color: '#2196f3'
  },
  {
    icon: <AssignmentTurnedInIcon fontSize="large" color="secondary" />, label: 'Atividades Concluídas', value: 18, sublabel: 'Este mês', color: '#00e676'
  },
  {
    icon: <TrendingUpIcon fontSize="large" sx={{ color: '#ab47bc' }} />, label: 'Progresso', value: '82%', sublabel: 'Média geral', color: '#ab47bc'
  },
  {
    icon: <QuizIcon fontSize="large" sx={{ color: '#29b6f6' }} />, label: 'Quizzes Pendentes', value: 2, sublabel: 'Esta semana', color: '#29b6f6'
  },
];

export default function StudentPortal() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || 'en');
  const [tab, setTab] = React.useState(0);
  const handleLangChange = (e: any) => {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Fade in timeout={800}>
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #ffe3ec 100%)', py: 6 }}>
        <Container maxWidth="md">
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Select value={lang} onChange={handleLangChange} size="small" sx={{ bgcolor: '#fff', borderRadius: 2 }}>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="pt">Português</MenuItem>
            </Select>
          </Box>
          <Box textAlign="center" mb={6}>
            <img src="/mascot-welcome.svg" alt="Mascot" style={{ width: 100, marginBottom: 14, filter: 'drop-shadow(0 2px 8px #ffb3c6)' }} />
            <Typography variant="h3" fontWeight={800} color="#dd2476" mb={1}>
              {t('student_portal')}
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={2}>
              {t('student_welcome')}
            </Typography>
            <AnimatedButton size="large" href="/student/dashboard" sx={{ mt: 2 }}>{t('go_to_dashboard')}</AnimatedButton>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 3, borderRadius: 4, minHeight: 150, background: 'rgba(255,255,255,0.85)' }}>
                <Typography variant="h6" fontWeight={700} color="#dd2476" mb={1}>{t('student_features')}</Typography>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li>📚 {t('access_lessons')}</li>
                  <li>📝 {t('complete_activities')}</li>
                  <li>🏆 {t('track_progress')}</li>
                  <li>🎲 {t('enjoy_gamification')}</li>
                </ul>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 3, borderRadius: 4, minHeight: 150, background: 'rgba(255,255,255,0.85)' }}>
                <Typography variant="h6" fontWeight={700} color="#ff512f" mb={1}>{t('how_it_works')}</Typography>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li>1️⃣ {t('choose_lesson')}</li>
                  <li>2️⃣ {t('participate_activities')}</li>
                  <li>3️⃣ {t('earn_rewards')}</li>
                  <li>4️⃣ {t('have_fun')}</li>
                </ul>
              </Paper>
            </Grid>
          </Grid>
          <Box mt={8} textAlign="center">
            <AnimatedButton href="/">{t('back_to_home')}</AnimatedButton>
          </Box>
        </Container>
      </Box>
    </Fade>
  );
}
