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
        paddingTop: { xs: 2, sm: 4 },
        paddingBottom: { xs: 2, sm: 6 }, // Add more space under the section on larger screens
        display: "flex",
        flexDirection: "column", // Flexbox layout
        justifyContent: "center", // Vertically center content
        alignItems: "center", // Horizontally center content
        marginTop: { xs: 3, sm: 8 }, // Increase space above on larger screens
        maxWidth: { xs: '100%', sm: '85%' }, // Wider container on larger screens
      }}
      className={`fade-in ${isVisible ? 'visible' : ''}`}
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
        sx={{
          width: '100%',
          justifyContent: "center",
          height: "auto", // Adjust height dynamically
        }}
      >
        {/* Left side: Image */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: '100%',
              height: { xs: '40vh', sm: '60vh' }, // Adjust height based on screen size
              overflow: 'hidden',
              borderRadius: '16px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <img
              src="images/aboutme.jpeg"
              alt="About me"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '16px',
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
