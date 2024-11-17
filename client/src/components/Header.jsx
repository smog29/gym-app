import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const Header = () => (
  <AppBar position="static" color="primary">
    <Container>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">ReForma</Typography>
        <div>
          {['About', 'Shop', 'FAQ', 'Testimonials', 'Contact'].map((item) => (
            <Button key={item} color="inherit" href={`#${item.toLowerCase()}`}>
              {item}
            </Button>
          ))}
        </div>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Header;
