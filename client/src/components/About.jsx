import { useEffect, useRef, useState } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <Container
      ref={aboutRef}
      id="about"
      sx={{
        py: 8,
        px: 6,
        mt: { xs: 6, sm: 10 }, // Increased gap from the top header
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.6s ease-in-out',
        maxWidth: '85%',
        mx: 'auto',
      }}
    >
      <Grid
        container
        spacing={8} // Increased spacing between image and text
        alignItems="center"
        sx={{
          justifyContent: 'center',
        }}
      >
        {/* Left Side: Image */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: '100%',
              height: { xs: '50vh', sm: '70vh' }, // Made the image larger
              overflow: 'hidden',
              borderRadius: '20px',
              boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <img
              src="images/aboutme.jpeg"
              alt="About me"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '20px',
              }}
            />
          </Box>
        </Grid>

        {/* Right Side: Text */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h2" // Made the title larger
            gutterBottom
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #ff7e5f, #feb47b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '3rem',
              mb: 4,
            }}
          >
            O mnie
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.4rem', // Increased font size
              color: '#555',
              lineHeight: 1.8,
              textAlign: 'justify',
              px: { xs: 2, sm: 0 },
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mauris ligula, porttitor a dolor a, 
            iaculis facilisis ipsum. Nullam ac dapibus mauris. Cras at ligula nec leo eleifend tempor. Ut gravida 
            ut tortor in lacinia. Praesent ornare felis sit amet nulla convallis, quis blandit sem laoreet.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
