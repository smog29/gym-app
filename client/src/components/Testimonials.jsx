import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const Testimonials = () => (
  <Container id="testimonials" sx={{ paddingY: 4 }}>
    <Typography variant="h4" gutterBottom>Opinie</Typography>
    <Grid container spacing={4}>
      {[1, 2, 3].map((testimonial) => (
        <Grid item xs={12} sm={6} md={4} key={testimonial}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="https://via.placeholder.com/150"
              alt="Before After"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Testimonial text for {testimonial}.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default Testimonials;
