import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, InputAdornment, Avatar } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import LockIcon from '@mui/icons-material/Lock';

const Register = () => {
  const [nombre, setNombre] = useState("");
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
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, matricula, password })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setNombre("");
        setMatricula("");
        setPassword("");
      } else {
        setError(data.error || "Error al registrar");
      }
    } catch (err) {
      setError("Error de conexión");
    }
    setLoading(false);
  };
  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <Paper elevation={8} sx={{ p: 4, borderRadius: 4, width: 350, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#3f72af', width: 56, height: 56 }}>
            <PersonAddIcon fontSize="large" />
          </Avatar>
        </Box>
        <Typography variant="h5" align="center" sx={{ fontWeight: 700, color: '#3f72af', mb: 2 }}>Registro de Estudiante</Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {error && <Typography color="error" align="center">{error}</Typography>}
          {success && <Typography color="primary" align="center">Registro exitoso</Typography>}
          <TextField
            label="Nombre"
            variant="outlined"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
            InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
          />
          <TextField
            label="Matrícula"
            variant="outlined"
            value={matricula}
            onChange={e => setMatricula(e.target.value)}
            required
            InputProps={{ startAdornment: <InputAdornment position="start"><BadgeIcon /></InputAdornment> }}
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
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
