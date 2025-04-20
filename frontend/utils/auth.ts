// CODEX: FeverEducation Auth API Utility (JWT, HTTP-only cookies)
export async function login(username: string, password: string, role: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, role }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Usuário ou senha inválidos.');
  return await res.json();
}

export async function register(username: string, password: string, role: string) {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, role }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Falha ao registrar.');
  return await res.json();
}

export async function forgotPassword(username: string, code: string, newPassword: string) {
  const res = await fetch('/api/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, code, newPassword }),
  });
  if (!res.ok) throw new Error('Falha na redefinição.');
  return await res.json();
}

export async function checkSession() {
  const res = await fetch('/api/auth/session', { credentials: 'include' });
  return res.ok;
}

export async function logout() {
  await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
}
