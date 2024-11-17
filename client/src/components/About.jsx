import { Container, Typography } from '@mui/material';

const About = () => (
  <Container id="about" sx={{ paddingY: 4 }}>
    <Typography variant="h4" gutterBottom>
      O mnie
    </Typography>
    <Typography variant="body1">
      Michal Jaworski - Your brief description goes here, explaining your background and specialties.
    </Typography>
  </Container>
);

export default About;
