// CODEX: FeverEducation Login Page (Android-inspired, MUI, animated)
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Fade, CircularProgress } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { login } from '../utils/auth';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState<'teacher' | 'student'>('teacher');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login((e.target as any).username.value, (e.target as any).password.value, role);
      if (role === 'teacher') router.push('/teacher');
      else router.push('/student');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fade in timeout={900}>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#181c20">
        <Paper elevation={8} sx={{ p: 5, borderRadius: 4, minWidth: 350, bgcolor: '#23272f' }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <LockOutlined sx={{ fontSize: 48, color: '#2196f3', mb: 1 }} />
            <Typography variant="h5" fontWeight={700} color="primary.main">FeverEducation</Typography>
            <Typography variant="subtitle1" color="text.secondary">Entrar no sistema</Typography>
          </Box>
          <form onSubmit={handleLogin}>
            <TextField label="Usuário" name="username" fullWidth margin="normal" required autoFocus autoComplete="username" />
            <TextField label="Senha" name="password" type="password" fullWidth margin="normal" required autoComplete="current-password" />
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant={role === 'teacher' ? 'contained' : 'outlined'} color="primary" onClick={() => setRole('teacher')}>Professor</Button>
              <Button variant={role === 'student' ? 'contained' : 'outlined'} color="secondary" onClick={() => setRole('student')}>Aluno</Button>
            </Box>
            <Box mt={2} textAlign="right">
              <Button href="/forgot-password" size="small" color="secondary">Esqueceu a senha?</Button>
            </Box>
            {error && <Typography color="error" mt={2}>{error}</Typography>}
            <Box mt={3} position="relative">
              <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading} sx={{ fontWeight: 700, py: 1.2, borderRadius: 2 }}>
                Entrar
              </Button>
              {loading && <CircularProgress size={32} sx={{ position: 'absolute', top: 8, left: '50%', marginLeft: '-16px' }} />}
            </Box>
          </form>
        </Paper>
      </Box>
    </Fade>
  );
};

export default LoginPage;
