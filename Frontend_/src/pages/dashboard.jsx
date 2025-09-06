import React from "react";
import { Box, Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PeopleIcon from '@mui/icons-material/People';

const resumen = [
  { titulo: "Elecciones activas", valor: 2, icon: <EventAvailableIcon fontSize="large" sx={{ color: '#3f72af' }} /> },
  { titulo: "Elecciones cerradas", valor: 5, icon: <HowToVoteIcon fontSize="large" sx={{ color: '#3f72af' }} /> },
  { titulo: "Participantes", valor: 1200, icon: <PeopleIcon fontSize="large" sx={{ color: '#3f72af' }} /> }
];

const elecciones = [
  { nombre: "Presidencial 2025", estado: "Activa", inicio: "01/08/2025", cierre: "10/08/2025" },
  { nombre: "Universitaria 2025", estado: "Cerrada", inicio: "01/07/2025", cierre: "10/07/2025" }
];

const Dashboard = () => {
  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
      p: { xs: 2, md: 4 },
      overflowY: 'auto',
      zIndex: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Box sx={{ width: '100%', maxWidth: 1100 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700, color: '#3f72af', mt: 2 }}>
          Resumen de Elecciones
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 3, maxWidth: 900, mx: 'auto' }}>
          {resumen.map((item, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={4} lg={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{ borderRadius: 3, boxShadow: 2, textAlign: 'center', py: 2, width: '100%', maxWidth: 220, minWidth: 140, mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardContent sx={{ p: 1, width: '100%' }}>
                  {React.cloneElement(item.icon, { fontSize: 'medium' })}
                  <Typography variant="subtitle1" sx={{ color: '#3f72af', mt: 0.5, fontSize: { xs: '1rem', md: '1.1rem' } }}>{item.titulo}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, fontSize: { xs: '1.3rem', md: '1.7rem' } }}>{item.valor}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ px: { xs: 1, md: 2 }, py: { xs: 1, md: 2 } }}>
          <Card elevation={6} sx={{ borderRadius: 4, p: 3, boxShadow: 4, mt: 2, maxWidth: '100%', minWidth: 280, margin: '0 auto' }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: '#2d3a4b', mb: 2, fontWeight: 700, textAlign: 'center' }}>Listado de Elecciones</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell>Fecha Inicio</TableCell>
                      <TableCell>Fecha Cierre</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {elecciones.map((eleccion, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{eleccion.nombre}</TableCell>
                        <TableCell>{eleccion.estado}</TableCell>
                        <TableCell>{eleccion.inicio}</TableCell>
                        <TableCell>{eleccion.cierre}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
