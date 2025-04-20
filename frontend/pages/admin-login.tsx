// CODEX: FeverEducation Hidden Admin Login Page (MUI, advanced effects)
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Fade, CircularProgress } from '@mui/material';
import { Security } from '@mui/icons-material';
import { useRouter } from 'next/router';

const AdminLoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // TODO: Integrate real admin API call
    setTimeout(() => {
      setLoading(false);
      router.push('/admin');
    }, 1200);
  };

  return (
    <Fade in timeout={1000}>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#10131a">
        <Paper elevation={10} sx={{ p: 5, borderRadius: 4, minWidth: 350, bgcolor: '#23272f', border: '2px solid #00e676' }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Security sx={{ fontSize: 48, color: '#00e676', mb: 1 }} />
            <Typography variant="h5" fontWeight={700} color="secondary.main">Admin Portal</Typography>
            <Typography variant="subtitle1" color="text.secondary">Acesso restrito</Typography>
          </Box>
          <form onSubmit={handleLogin}>
            <TextField label="Usuário" fullWidth margin="normal" required autoFocus autoComplete="username" />
            <TextField label="Senha" type="password" fullWidth margin="normal" required autoComplete="current-password" />
            {error && <Typography color="error" mt={2}>{error}</Typography>}
            <Box mt={3} position="relative">
              <Button type="submit" fullWidth variant="contained" color="secondary" disabled={loading} sx={{ fontWeight: 700, py: 1.2, borderRadius: 2 }}>
                Entrar como Admin
              </Button>
              {loading && <CircularProgress size={32} sx={{ position: 'absolute', top: 8, left: '50%', marginLeft: '-16px' }} />}
            </Box>
          </form>
        </Paper>
      </Box>
    </Fade>
  );
};

export default AdminLoginPage;
