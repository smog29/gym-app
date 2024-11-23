import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Fade } from '@mui/material';

const transformationsData = [
  {
    name: 'Ania',
    beforeImage: '/images/before-ania.png',
    afterImage: '/images/after-ania.png',
  },
  {
    name: 'Kasia',
    beforeImage: '/images/before-kasia.png',
    afterImage: '/images/after-kasia.png',
  },
  {
    name: 'Marek',
    beforeImage: '/images/before-marek.png',
    afterImage: '/images/after-marek.png',
  },
  // Add more transformations as needed
];

const Transformations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % transformationsData.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  const currentTransformation = transformationsData[currentIndex];

  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, rgba(255, 87, 34, 0.1) 0%, rgba(255, 0, 0, 0.2) 100%)',
        borderRadius: '15px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        maxWidth: '100%',
      }}
    >
      <Fade in={true} timeout={1000}>
        <Typography variant="h3" sx={{ marginBottom: '2rem', fontWeight: 'bold', fontSize: '2rem', color: '#333' }}>
          {currentTransformation.name}
        </Typography>
      </Fade>

      <Grid container spacing={4} justifyContent="center" sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={12} sm={5} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Fade in={true} timeout={1500}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ marginBottom: '1rem', fontSize: '1.2rem', color: '#FF5722', fontWeight: 'bold' }}>
                Przed
              </Typography>
              <img
                src={currentTransformation.beforeImage}
                alt={`Before ${currentTransformation.name}`}
                style={{
                  maxWidth: '100%',
                  width: 'auto', // Allow the image to scale responsively but maintain aspect ratio
                  height: 'auto', // Maintain aspect ratio on smaller screens
                  maxHeight: '500px',  // Increase max height to 500px for better display
                  borderRadius: '15px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
              />
            </Box>
          </Fade>
        </Grid>

        <Grid item xs={12} sm={5} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Fade in={true} timeout={2000}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ marginBottom: '1rem', fontSize: '1.2rem', color: '#FF5722', fontWeight: 'bold' }}>
                Po
              </Typography>
              <img
                src={currentTransformation.afterImage}
                alt={`After ${currentTransformation.name}`}
                style={{
                  maxWidth: '100%',
                  width: 'auto', // Ensure the width scales responsively
                  height: 'auto', // Maintain aspect ratio
                  maxHeight: '500px',  // Limit height to 500px, so images don't become too large
                  borderRadius: '15px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
              />
            </Box>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Transformations;
