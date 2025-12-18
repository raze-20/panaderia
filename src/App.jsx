import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, AppBar, Tabs, Tab, Box, Switch, Toolbar, Typography } from '@mui/material';
import { WbSunny, Brightness2 } from '@mui/icons-material';
import BakeryView from './BakeryView';
import SettingsView from './SettingsView';
import { lightTheme, darkTheme } from './theme';

function App() {
  const [view, setView] = useState(0); // 0 for 'bakery', 1 for 'settings'
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: 'Bolillo', price: 1.0, quantity: 0, icon: '🥖' },
    { id: 2, name: 'Pan Dulce', price: 1.5, quantity: 0, icon: '🥐' },
    { id: 3, name: 'Cocoles', price: 2.0, quantity: 0, icon: '🍞' }
  ]);

  const handleTabChange = (event, newValue) => {
    setView(newValue);
  };

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  const activeTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Panaderia
          </Typography>
          <Switch
            checked={isDarkMode}
            onChange={handleThemeChange}
            icon={<WbSunny />}
            checkedIcon={<Brightness2 />}
          />
        </Toolbar>
        <Tabs value={view} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Principal" />
          <Tab label="Ajustes" />
        </Tabs>
      </AppBar>
      <Box p={3}>
        {view === 0 && <BakeryView products={products} setProducts={setProducts} />}
        {view === 1 && <SettingsView products={products} setProducts={setProducts} />}
      </Box>
    </ThemeProvider>
  );
}

export default App;
