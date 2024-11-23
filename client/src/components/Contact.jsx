import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box } from '@mui/material';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Element has come into view
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  return (
    <Container
      ref={contactRef}
      id="contact"
      sx={{
        paddingY: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      className={`fade-in ${isVisible ? 'visible' : ''}`}
    >
      {/* Left Section - Form */}
      <Box sx={{ flex: 1, maxWidth: '500px', padding: '20px' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
          Kontakt
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                sx={{
                  marginBottom: '15px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                sx={{
                  marginBottom: '15px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Instagram"
                variant="outlined"
                sx={{
                  marginBottom: '15px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  padding: '10px 20px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: '#333',
                  },
                }}
                type="submit"
              >
                Prześlij
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Right Section - Large Image */}
      <Box sx={{ flex: 1, maxWidth: '500px' }}>
        <img
          src="images/contact.jpg"
          alt="Contact"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        />
      </Box>
    </Container>
  );
};

export default Contact;
