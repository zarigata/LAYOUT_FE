// CODEX: FeverEducation Student Dashboard - Android-inspired UI
import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Tabs, Tab, IconButton, Avatar, AppBar, Toolbar, Badge } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import QuizIcon from '@mui/icons-material/Quiz';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AITutor from '../components/AITutor';

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
  const [tab, setTab] = React.useState(0);
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Top App Bar */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 2 }}>
        <Toolbar>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>FE</Avatar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            FeverEducation
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            <Button color="inherit">Painel</Button>
            <Button color="inherit">Minhas Aulas</Button>
            <Button color="inherit">Atividades</Button>
            <Button color="inherit">AI Tutor</Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit">
              <Badge badgeContent={1} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Avatar sx={{ ml: 1, bgcolor: 'secondary.main' }}>S</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Dashboard Header */}
      <Box sx={{ px: { xs: 2, md: 6 }, py: 2 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>Painel do Aluno</Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>Bem-vindo(a) de volta</Typography>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {statCards.map((card) => (
            <Grid item xs={12} sm={6} md={3} key={card.label}>
              <Card sx={{ bgcolor: 'background.paper', borderRadius: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {card.icon}
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h5" fontWeight={700}>{card.value}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="subtitle1" fontWeight={600}>{card.label}</Typography>
                  <Typography variant="caption" color="text.secondary">{card.sublabel}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {/* AI Tutor Quick Access */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>AI Tutor</Typography>
                <AITutor />
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Abrir Tutor</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Tabs for Classes, Assignments, Progress */}
        <Box sx={{ mt: 4 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="student dashboard tabs" textColor="primary" indicatorColor="primary">
            <Tab label="Aulas" />
            <Tab label="Atividades" />
            <Tab label="Progresso" />
          </Tabs>
          <Box sx={{ mt: 2 }}>
            {tab === 0 && <Box sx={{ minHeight: 120, bgcolor: 'background.paper', borderRadius: 3, p: 3, color: 'text.secondary' }}>Lista de aulas matriculadas...</Box>}
            {tab === 1 && <Box sx={{ minHeight: 120, bgcolor: 'background.paper', borderRadius: 3, p: 3, color: 'text.secondary' }}>Atividades e quizzes pendentes...</Box>}
            {tab === 2 && <Box sx={{ minHeight: 120, bgcolor: 'background.paper', borderRadius: 3, p: 3, color: 'text.secondary' }}>Gráficos de progresso e desempenho...</Box>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
