import React from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const CardButton = styled(Link)(({ theme, rotation }) => ({
  width: '180px',
  height: '80px',
  backgroundColor: '#ffffff',
  backgroundImage: `radial-gradient(circle at 100% 150%, transparent 24%, #6264A7 25%, #6264A7 28%, transparent 29%),
                    radial-gradient(circle at 0% -50%, transparent 24%, #6264A7 25%, #6264A7 28%, transparent 29%)`,
  backgroundSize: '20px 40px',
  backgroundRepeat: 'repeat-x',
  backgroundPosition: '0 100%',
  borderRadius: '8px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  textDecoration: 'none',
  color: '#333',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  border: '1px solid #e0e0e0',
  padding: '20px',
  cursor: 'pointer',
  position: 'relative',
  transform: `rotate(${rotation}deg)`,
  '&:hover': {
    transform: 'translateY(-10px) rotate(0deg) scale(1.02)',
    boxShadow: '0 20px 30px rgba(0,0,0,0.15)',
    borderColor: '#6264A7',
    zIndex: 10,
    textDecoration: 'none',
  },
}));

const BusinessCardBuilder = () => {
  const rotations = [-1.5, 2, -1, 1.5];

  return (
    <Box sx={{ p: 5, backgroundColor: '#090909', borderRadius: '15px' }}>
      
      <Grid container spacing={4} alignitems="center" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '70% 25%' }}}>
        {/* Left Side: Business Cards (9 columns) */}
        <Grid xs={12} md={9}>
          <Typography variant="h6" align="center" gutterBottom sx={{ color: 'white',fontWeight: 'bold', mb: 5 }}>
            Available Card Designs
          </Typography>
          <Grid container spacing={3}>
            <Grid xs={12} sm={6}>
              <CardButton href="./files/card-creator.html?type=SVA" rotation={rotations[0]}>
                <img src="./files/SVA_Logo.png" alt="SVA" style={{ width: '80px', marginBottom: '8px' }} />
                <Typography variant="button" sx={{ fontWeight: 'bold' }}>SVA</Typography>
              </CardButton>
            </Grid>
            <Grid xs={12} sm={6}>
              <CardButton href="./files/card-creator.html?type=VMRC" rotation={rotations[1]}>
                <img src="./files/VMRC_Logo.png" alt="VMRC" style={{ width: '80px', marginBottom: '8px' }} />
                <Typography variant="button" sx={{ fontWeight: 'bold' }}>VMRC</Typography>
              </CardButton>
            </Grid>
            <Grid xs={12} sm={6}>
              <CardButton href="./files/card-creator.html?type=Both" rotation={rotations[2]}>
                <Box sx={{ display: 'flex', gap: '15px', mb: 1 }}>
                  <img src="./files/SVA_Logo.png" alt="SVA" style={{ width: '50px' }} />
                  <img src="./files/VMRC_Logo.png" alt="VMRC" style={{ width: '50px' }} />
                </Box>
                <Typography variant="button" sx={{ fontWeight: 'bold' }}>SVA & VMRC</Typography>
              </CardButton>
            </Grid>
            <Grid xs={12} sm={6}>
              <CardButton href="./files/card-creator.html?type=VAWS" rotation={rotations[3]}>
                <img src="./files/generic_user.png" alt="User" style={{ width: '55px', marginBottom: '8px', opacity: 0.6 }} />
                <Typography variant="button" sx={{ fontWeight: 'bold' }}>Student Worker</Typography>
              </CardButton>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Side: Trophy Container (3 columns) */}
        <Grid xs={12} md={3}>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              p: 10, 
              borderLeft: '2px #ccc' 
            }}
          >
            <Typography variant="subtitle2" sx={{ color: 'white', mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
              Our Achievements
            </Typography>
            <Link href="https://www.aum.edu/student-affairs/homecoming/" target="_blank" rel="noopener">
              <Box
                component="img"
                src="https://png.pngtree.com/png-clipart/20240905/original/pngtree-minimalist-trophy-icon-illustration-png-image_15942298.png"
                alt="AUM Trophy"
                sx={{ 
                  width: '250px', 
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.2) rotate(5deg)' }
                }}
              />
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessCardBuilder;
