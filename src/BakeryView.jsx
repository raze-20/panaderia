import React from 'react';
import { Typography, Grid, Box, IconButton, Paper, useTheme, useMediaQuery } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const ProductCard = ({ product, handleQuantityChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid item xs={4}>
      <Paper 
        elevation={0}
        sx={{
          borderRadius: '20px',
          padding: isMobile ? 1 : 2,
          boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
          border: '1px solid rgba(0,0,0,0.05)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <IconButton onClick={() => handleQuantityChange(product.id, 1)} color="primary" aria-label="add">
            <Add />
          </IconButton>
          <Typography 
            align="center" 
            sx={{ 
              my: 1, 
              userSelect: 'none',
              fontSize: isMobile ? '2.5rem' : '4rem' // Smaller icon on mobile
            }}
          >
            {product.icon}
          </Typography>
          <Typography 
            variant={isMobile ? 'body2' : 'h6'} 
            component="div" 
            align="center" 
            sx={{userSelect: 'none'}}
          >
            {product.name}
          </Typography>
          <Typography 
            variant="caption"
            color="text.secondary" 
            align="center" 
            sx={{userSelect: 'none'}}
          >
            ${product.price.toFixed(2)}
          </Typography>
          <Typography 
            variant={isMobile ? 'body1' : 'h6'} 
            sx={{ my: 1, userSelect: 'none', fontWeight: 'bold' }}
          >
            {product.quantity}
          </Typography>
          <IconButton onClick={() => handleQuantityChange(product.id, -1)} color="secondary" aria-label="remove">
            <Remove />
          </IconButton>
        </Box>
      </Paper>
    </Grid>
  );
};

function BakeryView({ products, setProducts }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleQuantityChange = (id, delta) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, quantity: Math.max(0, p.quantity + delta) } : p
    ));
  };

  const totalPrice = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);

  if (isMobile) {
    return (
      <Box sx={{ height: 'calc(100vh - 160px)', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Grid container spacing={2} justifyContent="center" alignItems="stretch">
            {products.map(product => (
              <ProductCard product={product} key={product.id} handleQuantityChange={handleQuantityChange} />
            ))}
          </Grid>
        </Box>
        <Box 
          sx={{ 
            flex: 1, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="h1"
            sx={{ fontSize: '4rem', fontWeight: 'bold' }}
          >
            Total: ${totalPrice.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    );
  }

  // Desktop layout
  return (
    <Box>
      <Typography variant="h2" align="center" gutterBottom>
        Total: ${totalPrice.toFixed(2)}
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {products.map(product => (
          <ProductCard product={product} key={product.id} handleQuantityChange={handleQuantityChange} />
        ))}
      </Grid>
    </Box>
  );
}

export default BakeryView;
