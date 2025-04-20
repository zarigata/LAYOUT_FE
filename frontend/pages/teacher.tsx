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
            <Button color="inherit">Alunos</Button>
            <Button color="inherit">Aulas</Button>
            <Button color="inherit">Agenda</Button>
            <Button color="inherit">Gerador de Aulas IA</Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={2} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Avatar sx={{ ml: 1, bgcolor: 'secondary.main' }}>T</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      <TeacherMenu />
      {/* Dashboard Header */}
      <Box sx={{ px: { xs: 2, md: 6 }, py: 2 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>Dashboard</Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>Welcome back</Typography>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {statCards.map((card, idx) => (
            <Grid item xs={12} sm={6} md={3} key={card.label}>
              <Card sx={{ bgcolor: 'background.paper', borderRadius: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {card.icon}
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h5" fontWeight={700}>{card.value}</Typography>
                      <Typography variant="caption" color="success.main" fontWeight={600}>{card.trend}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="subtitle1" fontWeight={600}>{card.label}</Typography>
                  <Typography variant="caption" color="text.secondary">{card.sublabel}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {/* Create Class Quick Action */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>Criar Nova Aula</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                  <Button variant="contained" startIcon={<AddIcon />} color="primary" fullWidth>Criar Aula</Button>
                  <Button variant="outlined" color="secondary" fullWidth>Importar</Button>
                  <Button variant="outlined" color="inherit" fullWidth>Explorar Modelos</Button>
                  <Button variant="outlined" color="inherit" fullWidth>Agendar Aula</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Tabs for Overview, Analytics, Classes */}
        <Box sx={{ mt: 4 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="dashboard tabs" textColor="primary" indicatorColor="primary">
            <Tab label="Overview" />
            <Tab label="Analytics" />
            <Tab label="Classes" />
          </Tabs>
          <Box sx={{ mt: 2 }}>
            {tab === 0 && <Box sx={{ minHeight: 120, bgcolor: 'background.paper', borderRadius: 3, p: 3, color: 'text.secondary' }}>Overview content...</Box>}
            {tab === 1 && <Box sx={{ minHeight: 120, bgcolor: 'background.paper', borderRadius: 3, p: 3, color: 'text.secondary' }}>Analytics charts and stats...</Box>}
            {tab === 2 && <Box sx={{ minHeight: 120, bgcolor: 'background.paper', borderRadius: 3, p: 3, color: 'text.secondary' }}>Class management table...</Box>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
