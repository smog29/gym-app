import { Container, Typography, TextField, Button, Grid, Box } from '@mui/material';

const Contact = () => (
  <Container id="contact" sx={{ paddingY: 4 }}>
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
          <Button variant="contained" color="primary" type="submit">Submit</Button>
        </Grid>
      </Grid>
    </Box>
  </Container>
);

export default Contact;
