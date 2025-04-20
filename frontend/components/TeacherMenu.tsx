// CODEX: FeverEducation Teacher Menu with Sliders and Analytics Prep
import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Slider, Box, Typography, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import SchoolIcon from '@mui/icons-material/School';

const TeacherMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <>
      <IconButton onClick={() => setOpen(true)} sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1201, bgcolor: '#23272f', color: '#fff', boxShadow: 3 }}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 270, bgcolor: '#23272f', height: '100%', color: '#fff' }}>
          <Box p={2} display="flex" alignItems="center" gap={1}>
            <SchoolIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>Professor</Typography>
          </Box>
          <Divider sx={{ bgcolor: '#444' }} />
          <List>
            <ListItem>
              <ListItemIcon><BarChartIcon sx={{ color: '#2196f3' }} /></ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
            <ListItem>
              <ListItemIcon><SettingsIcon sx={{ color: '#00e676' }} /></ListItemIcon>
              <ListItemText primary="Configurações" />
            </ListItem>
            <ListItem>
              <Typography variant="subtitle2" mt={2}>Ajuste de Dificuldade</Typography>
              <Slider value={sliderValue} onChange={(_, v) => setSliderValue(v as number)} min={0} max={100} sx={{ ml: 2, width: 120 }} />
            </ListItem>
          </List>
          <Divider sx={{ bgcolor: '#444', mt: 2 }} />
          <Box p={2}>
            <Typography variant="body2" color="text.secondary">Área reservada para gráficos e estatísticas.</Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default TeacherMenu;
