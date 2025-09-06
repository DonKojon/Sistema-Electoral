import React from 'react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';

const LogoutButton = ({ variant = "outlined", fullWidth = false, sx = {} }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    console.log('Logout button clicked');
    logout();
    window.location.href = '/login';
  };

  return (
    <Button
      variant={variant}
      color="inherit"
      onClick={handleLogout}
      startIcon={<LogoutIcon />}
      fullWidth={fullWidth}
      sx={{
        color: '#fff',
        borderColor: '#fff',
        justifyContent: 'flex-start',
        paddingLeft: '16px',
        paddingRight: '16px',
        '&:hover': {
          borderColor: '#fff',
          backgroundColor: 'rgba(255,255,255,0.1)'
        },
        ...sx
      }}
    >
      Cerrar Sesión
    </Button>
  );
};

export default LogoutButton; 