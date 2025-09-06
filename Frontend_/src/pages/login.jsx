import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, InputAdornment, Avatar } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [matricula, setMatricula] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matricula, password })
      });
      const data = await res.json();
      if (data.success) {
        // Usar el contexto para guardar el usuario
        login(data.user);
        setSuccess(true);
        window.location.href = "/dashboard";
      } else {
        setError(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error de conexión");
    }
    setLoading(false);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2eafc 100%)',
      zIndex: 0
    }}>
      <Paper elevation={8} sx={{ p: 4, borderRadius: 4, width: 350, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#3f72af', width: 56, height: 56 }}>
            <LockIcon fontSize="large" />
          </Avatar>
        </Box>
        <Typography variant="h5" align="center" sx={{ fontWeight: 700, color: '#3f72af', mb: 2 }}>Iniciar Sesión</Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {error && <Typography color="error" align="center">{error}</Typography>}
          {success && <Typography color="primary" align="center">Login exitoso</Typography>}
          <TextField
            label="Matrícula"
            variant="outlined"
            value={matricula}
            onChange={e => setMatricula(e.target.value)}
            required
            InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment> }}
          />
          <Button type="submit" variant="contained" color="primary" size="large" sx={{ borderRadius: 2, fontWeight: 600 }} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
