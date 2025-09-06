import PersonIcon from '@mui/icons-material/Person';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Election from './pages/election';
import Login from './pages/login';
import Register from './pages/register';
import Blockchain from './pages/blockchain';
import { AuthProvider, useAuth } from './context/AuthContext';
import LogoutButton from './components/LogoutButton';
import './App.css';

import DashboardIcon from '@mui/icons-material/Dashboard';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, Box } from '@mui/material';

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Votar', icon: <HowToVoteIcon />, path: '/election' },
  { text: 'Blockchain', icon: <BarChartIcon />, path: '/blockchain' },
  { text: 'Registro', icon: <PersonIcon />, path: '/register' },
];

function Navbar() {
  const { user } = useAuth();

  return (
    <Box sx={{ display: 'flex' }}>
             <Drawer
         variant="permanent"
         sx={{
           width: 220,
           flexShrink: 0,
           [`& .MuiDrawer-paper`]: {
             width: 220,
             boxSizing: 'border-box',
             background: 'linear-gradient(180deg, #232f3e 0%, #1a2233 100%)',
             color: '#fff',
             borderRight: 'none',
             overflow: 'hidden',
             '&::-webkit-scrollbar': {
               display: 'none'
             },
             '& *::-webkit-scrollbar': {
               display: 'none'
             }
           },
         }}
       >
        {/* Título grande y estilizado en la parte superior del Navbar */}
        <Box sx={{ width: '100%', py: 1.5, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(90deg, #3f72af 0%, #232f3e 100%)', boxShadow: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              letterSpacing: 1,
              color: '#fff',
              textShadow: '0 2px 8px #1a2233',
              fontFamily: 'Montserrat, Arial, sans-serif',
              textTransform: 'uppercase',
              fontSize: '1.25rem',
              m: 0,
            }}
          >
            Sistema Electoral
          </Typography>
        </Box>
        {/* Eliminado Toolbar para quitar el espacio entre el título y las rutas */}
        <Box sx={{ 
          overflow: 'hidden', 
          mt: 2,
          width: '100%',
          '&::-webkit-scrollbar': { display: 'none' },
          '& *::-webkit-scrollbar': { display: 'none' }
        }}>
          <List sx={{ 
            width: '100%',
            '&::-webkit-scrollbar': { display: 'none' }
          }}>
            {navItems.map((item) => (
              <ListItem 
                button 
                key={item.text} 
                component={Link} 
                to={item.path} 
                sx={{ 
                  mb: 1, 
                  borderRadius: 2, 
                  width: '100%',
                  '&:hover': { background: '#3f72af' },
                  '&::-webkit-scrollbar': { display: 'none' }
                }}
              >
                <ListItemIcon sx={{ color: '#fff', minWidth: 'auto', mr: 2 }}>{item.icon}</ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    '& .MuiTypography-root': { 
                      fontSize: '0.9rem',
                      whiteSpace: 'nowrap'
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
          {/* Botón de logout en el sidebar */}
          <Box sx={{ 
            mt: 4, 
            px: 2,
            width: '100%',
            '&::-webkit-scrollbar': { display: 'none' }
          }}>
            <LogoutButton fullWidth />
          </Box>
        </Box>
      </Drawer>
  {/* AppBar eliminado para quitar la barra superior de todas las vistas */}
    </Box>
  );
}

function AppRoutes() {
  const location = useLocation();
  const navigate = window.location.pathname !== '/login' ? null : undefined;
  const showNavbar = ["/dashboard", "/election", "/blockchain", "/register"].includes(location.pathname);

  React.useEffect(() => {
    if (location.pathname !== '/login') {
      window.history.replaceState(null, '', '/login');
    }
  }, []);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/election" element={<Election />} />
        <Route path="/blockchain" element={<Blockchain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Redirección automática a /login si la ruta no coincide */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
