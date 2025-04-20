// CODEX: FeverEducation Landing Page - Android-inspired UI
import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Avatar, AppBar, Toolbar } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Top App Bar */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 4 }}>
        <Toolbar>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>FE</Avatar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            FeverEducation
          </Typography>
          <Button color="inherit" href="/teacher">Professor</Button>
          <Button color="inherit" href="/student">Aluno</Button>
          <Button color="inherit" href="/admin">Admin</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ px: { xs: 2, md: 6 }, py: 6, textAlign: 'center' }}>
        <Typography variant="h2" fontWeight={800} color="primary.main" gutterBottom>
          Bem-vindo ao FeverEducation
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Plataforma educacional com IA e design Android moderno
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: 'background.paper', borderRadius: 3 }}>
              <CardContent>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mb: 2 }}>
                  <PersonIcon fontSize="large" />
                </Avatar>
                <Typography variant="h6" fontWeight={700}>Sou Professor</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Gerencie aulas, alunos e gere conteúdo com IA.
                </Typography>
                <Button variant="contained" color="primary" href="/teacher" fullWidth>Acessar Painel</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: 'background.paper', borderRadius: 3 }}>
              <CardContent>
                <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56, mb: 2 }}>
                  <SchoolIcon fontSize="large" />
                </Avatar>
                <Typography variant="h6" fontWeight={700}>Sou Aluno</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Acesse aulas, atividades e seu progresso.
                </Typography>
                <Button variant="contained" color="secondary" href="/student" fullWidth>Acessar Painel</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Card sx={{ bgcolor: 'background.paper', borderRadius: 3 }}>
              <CardContent>
                <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56, mb: 2 }}>
                  <SecurityIcon fontSize="large" />
                </Avatar>
                <Typography variant="h6" fontWeight={700}>Sou Admin</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Gerencie usuários, aulas e configurações da plataforma.
                </Typography>
                <Button variant="outlined" color="success" href="/admin" fullWidth>Acessar Painel</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
