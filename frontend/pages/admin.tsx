// CODEX: FeverEducation Admin Dashboard - Android-inspired UI
import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Tabs, Tab, IconButton, Avatar, AppBar, Toolbar, Badge } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SchoolIcon from '@mui/icons-material/School';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';

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
            <Button color="inherit">Usuários</Button>
            <Button color="inherit">Aulas</Button>
            <Button color="inherit">Relatórios</Button>
            <Button color="inherit">Configurações</Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit">
              <Badge badgeContent={1} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Avatar sx={{ ml: 1, bgcolor: 'secondary.main' }}>A</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Dashboard Header */}
      <Box sx={{ px: { xs: 2, md: 6 }, py: 2 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>Painel do Admin</Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>Gerencie a plataforma</Typography>
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
          {/* Quick Actions */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>Ações Rápidas</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                  <Button variant="contained" color="primary" fullWidth>Criar Usuário</Button>
                  <Button variant="outlined" color="secondary" fullWidth>Nova Aula</Button>
                  <Button variant="outlined" color="inherit" fullWidth>Gerar Relatório</Button>
                  <Button variant="outlined" color="inherit" fullWidth>Ver Alertas</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Tabs for Users, Classes, Reports, Settings */}
        <Box sx={{ mt: 4 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="admin dashboard tabs" textColor="primary" indicatorColor="primary">
            <Tab label="Usuários" />
            <Tab label="Aulas" />
            <Tab label="Relatórios" />
            <Tab label="Configurações" />
          </Tabs>
          <Box sx={{ mt: 2 }}>
            {tab === 0 && <Box sx={{ minHeight: 120, bgcolor: 'background.paper', borderRadius: 3, p: 3, color: 'text.secondary' }}>Gestão de usuários...</Box>}
            {tab === 1 && <Box sx={{ minHeight: 120, bgcolor: 'background.paper', borderRadius: 3, p: 3, color: 'text.secondary' }}>Gestão de aulas...</Box>}
            {tab === 2 && <Box sx={{ minHeight: 120, bgcolor: 'background.paper', borderRadius: 3, p: 3, color: 'text.secondary' }}>Relatórios e estatísticas...</Box>}
            {tab === 3 && <Box sx={{ minHeight: 120, bgcolor: 'background.paper', borderRadius: 3, p: 3, color: 'text.secondary' }}>Configurações da plataforma...</Box>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
