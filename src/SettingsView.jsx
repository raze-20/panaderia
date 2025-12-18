import React from 'react';
import { Box, Typography, TextField, InputAdornment } from '@mui/material';

function SettingsView({ products, setProducts }) {
  const handlePriceChange = (id, newPrice) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, price: parseFloat(newPrice) || 0 } : p
    ));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h2" gutterBottom>
        Ajustes de Precios
      </Typography>
      <Box sx={{ mt: 3, width: '100%', maxWidth: 'sm' }}>
        {products.map(product => (
          <Box key={product.id} sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ mr: 2, userSelect: 'none' }}>{product.icon}</Typography>
            <TextField
              label={product.name}
              type="number"
              variant="filled"
              value={product.price}
              onChange={(e) => handlePriceChange(product.id, e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default SettingsView;
