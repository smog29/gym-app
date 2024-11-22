import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Home, Info, QuestionAnswer, ContactMail, Shop } from '@mui/icons-material';


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: isScrolled
          ? 'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(255, 87, 34, 1) 100%)' // Gym-like gradient (dark to vibrant orange)
          : 'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(255, 87, 34, 0.8) 70%)', // Slightly faded gradient at the top
        boxShadow: 4,
        zIndex: 1300,
        color: 'white',
        transition: 'all 0.3s ease',
        padding: isScrolled ? '5px 20px' : '15px 30px', // More padding when at the top
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Left side: Logo with dynamic size */}
        <Box
          sx={{
            width: isScrolled ? 150 : 200, // Smaller logo on scroll
            height: isScrolled ? 75 : 100, // Adjust logo size on scroll
            backgroundImage: 'url("/images/logo.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 2,
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'grey',
            marginTop: isScrolled ? 1 : 2,
            marginBottom: isScrolled ? 1 : 2,
            boxShadow: isScrolled ? 2 : 4,
            transition: 'all 0.3s ease', // Smooth transition for size and shadow
          }}
        />

        {/* Navigation buttons with icons (Horizontal layout) */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          {Object.entries({
            'About': { text: 'O mnie', icon: <Info /> },
            'Shop': { text: 'Sklep', icon: <Shop /> },
            'FAQ': { text: 'FAQ', icon: <QuestionAnswer /> },
            'Testimonials': { text: 'Opinie', icon: <Home /> },
            'Contact': { text: 'Kontakt', icon: <ContactMail /> },
          }).map(([component, { text, icon }]) => (
            <Button
              key={component}
              color="inherit"
              href={`#${component.toLowerCase()}`}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isScrolled ? '0.9rem' : '1.2rem', // Smaller font size when scrolled
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: 1.2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 87, 34, 0.1)',
                  color: '#FF5722',
                  borderRadius: '5px',
                  transform: 'scale(1.05)',
                },
              }}
            >
              {icon}
              {text}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
