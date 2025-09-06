import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Button, Paper, Dialog, DialogTitle, DialogContent, Tooltip, Avatar } from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Blockchain = () => {
  const [resumen, setResumen] = useState([]);
  const [blockchain, setBlockchain] = useState([]);
  const [open, setOpen] = useState(false);
  const [totalVotos, setTotalVotos] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/blockchain")
      .then(res => res.json())
      .then(data => setBlockchain(data));
    fetch("http://localhost:3000/api/elecciones")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const idEleccion = data[0].idEleccion;
          fetch(`http://localhost:3000/api/resultados/${idEleccion}`)
            .then(res2 => res2.json())
            .then(r => setResumen(r));
          fetch(`http://localhost:3000/api/total-votos/${idEleccion}`)
            .then(res3 => res3.json())
            .then(d => setTotalVotos(d.total));
        }
      });
  }, []);

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
      p: { xs: 2, md: 4 },
      overflowY: 'auto',
      zIndex: 0
    }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700, color: '#3f72af' }}>
        <BarChartIcon fontSize="large" sx={{ verticalAlign: 'middle', mr: 1 }} /> Resumen Blockchain Electoral
        <Tooltip title="Visualiza el resumen de votos y blockchain de la elección" placement="right">
          <InfoOutlinedIcon sx={{ color: '#3f72af', ml: 1, fontSize: 28, verticalAlign: 'middle' }} />
        </Tooltip>
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        <Grid item xs={6} sm={4} md={2}>
          <Card sx={{ borderRadius: 3, boxShadow: 2, textAlign: 'center', py: 1.5, minWidth: 120, maxWidth: 180, mx: 'auto', background: '#f8fafc' }}>
            <CardContent sx={{ p: 1 }}>
              <HowToVoteIcon fontSize="medium" sx={{ color: '#3f72af' }} />
              <Typography variant="subtitle1" sx={{ color: '#3f72af', mt: 0.5 }}>Total Votos</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{totalVotos}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Card sx={{ borderRadius: 3, boxShadow: 2, textAlign: 'center', py: 1.5, minWidth: 120, maxWidth: 180, mx: 'auto', background: '#f8fafc' }}>
            <CardContent sx={{ p: 1 }}>
              <PeopleIcon fontSize="medium" sx={{ color: '#3f72af' }} />
              <Typography variant="subtitle1" sx={{ color: '#3f72af', mt: 0.5 }}>Total Candidatos</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{resumen.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="h5" align="center" sx={{ fontWeight: 600, color: '#2d3a4b', mb: 2, mt: 3 }}>Resultados por candidato</Typography>
      <Grid container spacing={1} justifyContent="center">
        {resumen.map((item) => {
          const votosTotales = totalVotos || 1;
          const porcentaje = ((item.votos / votosTotales) * 100).toFixed(1);
          return (
            <Grid item key={item.idCandidato} xs={12} sm={6} md={2}>
              <Card sx={{ borderRadius: 3, boxShadow: 1, textAlign: 'center', py: 1, minWidth: 120, maxWidth: 160, mx: 'auto', background: '#fff' }}>
                <CardContent sx={{ p: 1 }}>
                  <Avatar sx={{ bgcolor: '#3f72af', mx: 'auto', mb: 1 }}>{item.nombre[0]}</Avatar>
                  <Typography variant="subtitle2" sx={{ color: '#3f72af', mt: 0.5, fontSize: '0.95rem', fontWeight: 600 }}>{item.nombre}</Typography>
                  <Typography variant="body2" sx={{ color: '#2d3a4b', fontSize: '0.85rem', mb: 0.5 }}>ID: {item.idCandidato}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.votos} <HowToVoteIcon sx={{ fontSize: 18, color: '#3f72af', ml: 0.5, verticalAlign: 'middle' }} /></Typography>
                  <Typography variant="body2" sx={{ color: '#2d3a4b', fontSize: '0.85rem' }}>Porcentaje: {porcentaje}%</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button variant="contained" color="primary" size="large" startIcon={<VisibilityIcon />} sx={{ borderRadius: 2, fontWeight: 600 }} onClick={() => setOpen(true)}>
          Ver Blockchain
        </Button>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Blockchain Electoral</DialogTitle>
        <DialogContent>
          {blockchain.length === 0 ? (
            <Typography>No hay bloques registrados.</Typography>
          ) : (
            blockchain.map((block, idx) => (
              <Paper key={idx} sx={{ p: 2, mb: 2, borderRadius: 2, background: '#f3f6fa' }}>
                <Typography variant="body2"><b>Bloque #{block.index}</b></Typography>
                <Typography variant="body2">Hash: {block.hash}</Typography>
                <Typography variant="body2">PrevHash: {block.prevHash}</Typography>
                <Typography variant="body2">Voto: {JSON.stringify(block.voto)}</Typography>
                <Typography variant="body2">Fecha: {block.timestamp}</Typography>
              </Paper>
            ))
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Blockchain;
