// CODEX: FeverEducation Admin Dashboard - Android-inspired UI
import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Tabs, Tab, IconButton, Avatar, AppBar, Toolbar, Badge } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SchoolIcon from '@mui/icons-material/School';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTranslation } from '../i18n';
import AnimatedButton from '../components/AnimatedButton';
import { Container, Paper, Fade, Select, MenuItem } from '@mui/material';
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
    icon: <PeopleAltIcon fontSize="large" color="primary" />, label: 'Usuários', value: 312, sublabel: 'Ativos', color: '#2196f3'
  },
  {
    icon: <SchoolIcon fontSize="large" color="secondary" />, label: 'Aulas', value: 42, sublabel: 'Registradas', color: '#00e676'
  },
  {
    icon: <AssessmentIcon fontSize="large" sx={{ color: '#ab47bc' }} />, label: 'Relatórios', value: 12, sublabel: 'Este mês', color: '#ab47bc'
  },
  {
    icon: <SecurityIcon fontSize="large" sx={{ color: '#29b6f6' }} />, label: 'Alertas', value: 1, sublabel: 'Segurança', color: '#29b6f6'
  },
];

export default function AdminPortal() {
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
              {t('admin_portal')}
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={2}>
              {t('admin_welcome')}
            </Typography>
            <AnimatedButton size="large" href="/admin/dashboard" sx={{ mt: 2 }}>{t('go_to_dashboard')}</AnimatedButton>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 3, borderRadius: 4, minHeight: 150, background: 'rgba(255,255,255,0.85)' }}>
                <Typography variant="h6" fontWeight={700} color="#dd2476" mb={1}>{t('admin_features')}</Typography>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li>🧑‍💼 {t('manage_users')}</li>
                  <li>🏫 {t('manage_classes')}</li>
                  <li>📈 {t('view_analytics')}</li>
                  <li>⚙️ {t('platform_settings')}</li>
                </ul>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 3, borderRadius: 4, minHeight: 150, background: 'rgba(255,255,255,0.85)' }}>
                <Typography variant="h6" fontWeight={700} color="#ff512f" mb={1}>{t('how_it_works')}</Typography>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li>1️⃣ {t('access_dashboard')}</li>
                  <li>2️⃣ {t('configure_platform')}</li>
                  <li>3️⃣ {t('analyze_data')}</li>
                  <li>4️⃣ {t('support_users')}</li>
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
