// CODEX: FeverEducation Forgot Password Page (no email, security question/reset code)
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Fade, CircularProgress } from '@mui/material';
import { LockReset } from '@mui/icons-material';
import { forgotPassword } from '../utils/auth';

const ForgotPasswordPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // CODEX: Call backend for reset code validation
    setTimeout(() => {
      setLoading(false);
      if (username.length < 3) setError('Usuário inválido.');
      else setStep(2);
    }, 1200);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await forgotPassword(username, resetCode, newPassword);
      setSuccess('Senha redefinida com sucesso!');
      setStep(3);
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
            <LockReset sx={{ fontSize: 48, color: '#00e676', mb: 1 }} />
            <Typography variant="h5" fontWeight={700} color="secondary.main">Redefinir Senha</Typography>
          </Box>
          {step === 1 && (
            <form onSubmit={handleRequestReset}>
              <TextField label="Usuário" fullWidth margin="normal" required value={username} onChange={e => setUsername(e.target.value)} autoFocus autoComplete="username" />
              {error && <Typography color="error" mt={2}>{error}</Typography>}
              <Box mt={3} position="relative">
                <Button type="submit" fullWidth variant="contained" color="secondary" disabled={loading} sx={{ fontWeight: 700, py: 1.2, borderRadius: 2 }}>
                  Solicitar Redefinição
                </Button>
                {loading && <CircularProgress size={32} sx={{ position: 'absolute', top: 8, left: '50%', marginLeft: '-16px' }} />}
              </Box>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleResetPassword}>
              <TextField label="Código de Redefinição" fullWidth margin="normal" required value={resetCode} onChange={e => setResetCode(e.target.value)} autoFocus />
              <TextField label="Nova Senha" type="password" fullWidth margin="normal" required value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              {error && <Typography color="error" mt={2}>{error}</Typography>}
              <Box mt={3} position="relative">
                <Button type="submit" fullWidth variant="contained" color="secondary" disabled={loading} sx={{ fontWeight: 700, py: 1.2, borderRadius: 2 }}>
                  Redefinir Senha
                </Button>
                {loading && <CircularProgress size={32} sx={{ position: 'absolute', top: 8, left: '50%', marginLeft: '-16px' }} />}
              </Box>
            </form>
          )}
          {step === 3 && (
            <Box textAlign="center">
              <Typography color="success.main" fontWeight={700} mb={2}>{success}</Typography>
              <Button variant="outlined" color="primary" href="/login">Voltar ao Login</Button>
            </Box>
          )}
        </Paper>
      </Box>
    </Fade>
  );
};

export default ForgotPasswordPage;
