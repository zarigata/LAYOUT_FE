// CODEX: FeverEducation Landing Page - Android-inspired UI
import React from 'react';
import { useTranslation } from '../i18n';
import AnimatedButton from '../components/AnimatedButton';
import { Box, Typography, Container, Grid, Paper, Fade, Select, MenuItem } from '@mui/material';
import { useState } from 'react';

export default function Home() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || 'en');

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
            <img src="/mascot-welcome.svg" alt="Mascot" style={{ width: 120, marginBottom: 18, filter: 'drop-shadow(0 2px 8px #ffb3c6)' }} />
            <Typography variant="h2" fontWeight={800} color="#dd2476" mb={1}>
              {t('welcome')}
            </Typography>
            <Typography variant="h5" color="text.secondary" mb={2}>
              {t('subtitle')}
            </Typography>
            <AnimatedButton size="large" href="/login" sx={{ mt: 2 }}>{t('get_started')}</AnimatedButton>
            <Typography variant="body2" color="#ff512f" mt={3}>
              {t('fun_fact')}
            </Typography>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 3, borderRadius: 4, minHeight: 180, background: 'rgba(255,255,255,0.85)' }}>
                <Typography variant="h5" fontWeight={700} color="#dd2476" mb={1}>{t('features')}</Typography>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li>🎮 Gamified learning experience</li>
                  <li>📊 Real-time analytics for teachers</li>
                  <li>🔒 Secure authentication and privacy</li>
                  <li>👨‍🏫 Dedicated portals for teachers, students, and admins</li>
                </ul>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 3, borderRadius: 4, minHeight: 180, background: 'rgba(255,255,255,0.85)' }}>
                <Typography variant="h5" fontWeight={700} color="#ff512f" mb={1}>{t('how_it_works')}</Typography>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li>1️⃣ Choose your portal and login</li>
                  <li>2️⃣ Explore interactive lessons</li>
                  <li>3️⃣ Track progress and earn rewards</li>
                  <li>4️⃣ Have fun while learning!</li>
                </ul>
              </Paper>
            </Grid>
          </Grid>
          <Box mt={8} textAlign="center">
            <AnimatedButton href="/teacher" sx={{ mx: 2 }}>{t('teacher_portal')}</AnimatedButton>
            <AnimatedButton href="/student" sx={{ mx: 2 }}>{t('student_portal')}</AnimatedButton>
            <AnimatedButton href="/admin-login" sx={{ mx: 2 }}>{t('admin_portal')}</AnimatedButton>
          </Box>
        </Container>
      </Box>
    </Fade>
  );
}
