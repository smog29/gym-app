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
      sx={{ paddingY: 4 }}
      className={`fade-in ${isVisible ? 'visible' : ''}`}
    >
      <Typography variant="h4" gutterBottom>Kontakt</Typography>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Phone" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Instagram" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Contact;
