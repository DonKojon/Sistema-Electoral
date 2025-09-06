import React, { useState } from "react";
import { useEffect } from "react";
import { Card, CardContent, CardActions, Button, Typography, Avatar, Grid, Box } from "@mui/material";
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuth } from '../context/AuthContext';



const Election = () => {
  const { user } = useAuth();
  const [elecciones, setElecciones] = useState([]);
  const [voto, setVoto] = useState({ idCandidato: null, idEleccion: null });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/elecciones")
      .then(res => res.json())
      .then(data => setElecciones(data));
  }, []);

  const handleVotar = async (idCandidato, idEleccion) => {
    if (!user) {
      setError("Debes iniciar sesión para votar");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("http://localhost:3000/api/votar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idEstudiante: user.id, idCandidato, idEleccion })
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setVoto({ idCandidato, idEleccion });
        setSuccess(true);
        setError("");
      } else {
        setError(data.error || "Error al votar");
        setSuccess(false);
      }
    } catch (err) {
      console.error('Error al votar:', err);
      setError("Error de conexión con el servidor");
      setSuccess(false);
    }
    setLoading(false);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      position: 'relative',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2eafc 100%)',
      p: { xs: 2, md: 4 },
      overflowY: 'auto',
      zIndex: 0
    }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700, color: '#3f72af' }}>
        <HowToVoteIcon fontSize="large" sx={{ verticalAlign: 'middle', mr: 1 }} /> Votación de Candidatos
      </Typography>
      {user && (
        <Typography variant="body1" align="center" sx={{ color: '#2d3a4b', mb: 2 }}>
          Bienvenido, {user.nombre} (Matrícula: {user.matricula})
        </Typography>
      )}
      {error && <Typography color="error" align="center">{error}</Typography>}
      {success && <Typography color="primary" align="center">¡Voto registrado exitosamente!</Typography>}
      {elecciones.length === 0 ? (
        <Typography align="center" sx={{ mt: 4 }}>No hay elecciones activas.</Typography>
      ) : (
        elecciones.map((eleccion, idx) => {
          // Definir títulos personalizados
          let titulo = '';
          if (idx === 0) titulo = 'Elección de Decano';
          else if (idx === 1) titulo = 'Elección de Director de Carrera';
          else titulo = `Elección #${eleccion.idEleccion}`;

          return (
            <Box key={eleccion.idEleccion} sx={{ mb: 6 }}>
              <Typography variant="h5" align="center" sx={{ fontWeight: 600, color: '#2d3a4b', mb: 2 }}>
                {titulo}
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                {eleccion.candidatos.map((candidato) => (
                  <Grid item key={candidato.id} xs={12} sm={6} md={4}>
                                         <Card sx={{ 
                       borderRadius: 4, 
                       boxShadow: voto.idCandidato === candidato.id ? 8 : 2, 
                       border: voto.idCandidato === candidato.id ? '2px solid #3f72af' : 'none', 
                       transition: '0.2s',
                       maxWidth: '280px',
                       minHeight: '200px'
                     }}>
                       <CardContent sx={{ 
                         display: 'flex', 
                         flexDirection: 'column', 
                         alignItems: 'center',
                         p: 2
                       }}>
                         <Avatar sx={{ width: 60, height: 60, mb: 1.5 }}>{candidato.nombre[0]}</Avatar>
                         <Typography variant="h6" sx={{ 
                           color: '#3f72af', 
                           fontWeight: 600,
                           fontSize: '0.9rem',
                           textAlign: 'center',
                           lineHeight: 1.2,
                           mb: 1
                         }}>
                           {candidato.nombre}
                         </Typography>
                         <Typography variant="body2" sx={{ 
                           color: '#2d3a4b', 
                           fontWeight: 500, 
                           mt: 0.5,
                           fontSize: '0.8rem'
                         }}>
                           Partido: {candidato.partido}
                         </Typography>
                       </CardContent>
                       <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                         <Button
                           variant={voto.idCandidato === candidato.id ? "contained" : "outlined"}
                           color={voto.idCandidato === candidato.id ? "success" : "primary"}
                           startIcon={voto.idCandidato === candidato.id ? <CheckCircleIcon /> : <HowToVoteIcon />}
                           onClick={() => handleVotar(candidato.id, eleccion.idEleccion)}
                           disabled={voto.idCandidato !== null}
                           size="small"
                           sx={{ 
                             borderRadius: 2, 
                             minWidth: 100,
                             fontSize: '0.75rem'
                           }}
                         >
                           {voto.idCandidato === candidato.id ? "Votaste aquí" : "Votar"}
                         </Button>
                       </CardActions>
                     </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default Election;
