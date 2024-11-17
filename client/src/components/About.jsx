import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);

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
        paddingY: 4,
        height: "100vh", // Set height to full viewport height
        display: "flex",
        flexDirection: "column", // Make the container a flexbox
        justifyContent: "center", // Vertically center the content
        alignItems: "center", // Horizontally center the content
      }}
      className={`fade-in ${isVisible ? 'visible' : ''}`}
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
        sx={{
          height: "100%", // Make the grid take up the full height of the container
          justifyContent: "center", // Center the content inside the grid
        }}
      >
        {/* Left side: Image */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: '100%',
              height: '60vh', // Make the image container take up 60% of the viewport height
              overflow: 'hidden',
              borderRadius: '16px', // Rounded corners for the container
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Optional: Adds a subtle shadow for a modern effect
            }}
          >
            <img
              src="images/aboutme.jpg"
              alt="About me"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', // Ensures the image covers the container area
                borderRadius: '16px', // Rounded corners for the image itself
              }}
            />
          </Box>
        </Grid>

        {/* Right side: Text */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
            O mnie
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.2rem", textAlign: "center" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mauris ligula, porttitor a dolor a, iaculis facilisis ipsum. Nullam ac dapibus mauris. Cras at ligula nec leo eleifend tempor. Ut gravida ut tortor in lacinia. Praesent ornare felis sit amet nulla convallis, quis blandit sem laoreet. Morbi aliquam iaculis gravida. Ut sollicitudin lacus vitae lectus imperdiet, in dapibus tortor interdum. Suspendisse imperdiet risus odio. Vivamus eros lectus, congue ut viverra id, iaculis eleifend turpis. Nullam libero leo, varius ac pulvinar eget, feugiat in est. Nunc et neque eget dolor rutrum aliquet non quis lacus. Morbi auctor a orci vitae pharetra.

            Nulla porttitor erat vitae leo suscipit, et tincidunt odio venenatis. Curabitur finibus erat in nibh blandit, non scelerisque turpis tincidunt. Vivamus fermentum augue ante, fermentum placerat turpis interdum vel. Nulla vehicula ipsum non diam gravida, sed eleifend ipsum dictum. Phasellus euismod euismod elit dignissim vestibulum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean sit amet lorem eu elit vestibulum rhoncus. Aenean facilisis eros sit amet turpis facilisis, ac tempor mauris placerat. Vestibulum nec tincidunt risus. Etiam et eros nec magna pellentesque feugiat nec non turpis. Donec fermentum est in ex fringilla, eget vehicula odio efficitur.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
