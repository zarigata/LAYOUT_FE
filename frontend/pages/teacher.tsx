// CODEX: FeverEducation Teacher Dashboard - Android-inspired UI
import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Tabs, Tab, IconButton, Avatar, AppBar, Toolbar, Badge, InputBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TeacherMenu from '../components/TeacherMenu';
import { useTranslation } from '../i18n';
import AnimatedButton from '../components/AnimatedButton';
import { useState } from 'react';

// Dashboard card data type
interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  sublabel: string;
  color: string;
  trend?: string;
}

const statCards: StatCard[] = [
  {
    icon: <PersonIcon fontSize="large" color="primary" />, label: 'Total de Alunos', value: 128, sublabel: 'Em todas as aulas', color: '#2196f3', trend: '+12%'
  },
  {
    icon: <BookIcon fontSize="large" color="secondary" />, label: 'Aulas Ativas', value: 6, sublabel: 'Atualmente lecionando', color: '#00e676', trend: '0%'
  },
  {
    icon: <AssignmentIcon fontSize="large" sx={{ color: '#ab47bc' }} />, label: 'Tarefas', value: 24, sublabel: '8 precisam de avaliação', color: '#ab47bc', trend: '+5%'
  },
  {
    icon: <AccessTimeIcon fontSize="large" sx={{ color: '#29b6f6' }} />, label: 'Horas de Ensino', value: 18, sublabel: 'Esta semana', color: '#29b6f6', trend: '-3%'
  },
];

export default function TeacherPortal() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || 'en');
  const handleLangChange = (e: any) => {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  const [tab, setTab] = React.useState(0);

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
              {t('teacher_portal')}
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={2}>
              {t('teacher_welcome')}
            </Typography>
            <AnimatedButton size="large" href="/teacher/dashboard" sx={{ mt: 2 }}>{t('go_to_dashboard')}</AnimatedButton>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 3, borderRadius: 4, minHeight: 150, background: 'rgba(255,255,255,0.85)' }}>
                <Typography variant="h6" fontWeight={700} color="#dd2476" mb={1}>{t('teacher_features')}</Typography>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li>📊 {t('manage_classes')}</li>
                  <li>👨‍🎓 {t('monitor_students')}</li>
                  <li>🤖 {t('generate_content_ai')}</li>
                  <li>🔔 {t('receive_notifications')}</li>
                </ul>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 3, borderRadius: 4, minHeight: 150, background: 'rgba(255,255,255,0.85)' }}>
                <Typography variant="h6" fontWeight={700} color="#ff512f" mb={1}>{t('how_it_works')}</Typography>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li>1️⃣ {t('create_class')}</li>
                  <li>2️⃣ {t('add_students')}</li>
                  <li>3️⃣ {t('assign_activities')}</li>
                  <li>4️⃣ {t('analyze_results')}</li>
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
