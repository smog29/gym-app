import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Box, useMediaQuery } from '@mui/material';
import { Home, Info, QuestionAnswer, ContactMail, Shop } from '@mui/icons-material';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm')); // Check for mobile screen size

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
      if (isMobile) {
        setIsHeaderVisible(false); // Hide header on scroll down (mobile only)
      }
    } else {
      setIsScrolled(false);
      if (isMobile) {
        setIsHeaderVisible(true); // Show header when at the top (mobile only)
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]); // Re-run effect when mobile screen size changes

  return (
    <AppBar
      position="sticky"
      sx={{
        background: isScrolled
          ? 'linear-gradient(90deg, rgba(255, 0, 0, 1) 0%, rgba(255, 87, 34, 1) 100%)' // Strong red gradient
          : 'linear-gradient(90deg, rgba(255, 0, 0, 0.8) 0%, rgba(255, 87, 34, 0.8) 70%)', // Faded red gradient at the top
        boxShadow: 4,
        zIndex: 1300,
        color: 'white',
        transition: 'all 0.3s ease',
        padding: isScrolled ? '5px 20px' : '15px 30px', // More padding when at the top
        opacity: isHeaderVisible ? 1 : 0, // Hide the header on scroll (mobile only)
        transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)', // Smooth transition to hide the header
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          flexDirection: isMobile ? 'column' : 'row', // Stack elements on mobile
          gap: isMobile ? 1 : 3, // Add gap between elements on mobile, but keep it smaller
        }}
      >
        {/* Left side: Logo with dynamic size */}
        <Box
          sx={{
            width: isScrolled ? 120 : 150, // Even smaller logo on mobile and scroll
            height: isScrolled ? 60 : 75, // Smaller height on mobile and scroll
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

        {/* Navigation buttons with icons (Horizontal or Vertical layout based on screen size) */}
        <Box sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row', 
          gap: isMobile ? 1 : 3, // Reduced gap between items on mobile
          width: '100%', 
          justifyContent: isMobile ? 'center' : 'flex-end',
          paddingTop: isMobile ? 1 : 0, // Small padding on top on mobile
        }}>
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
                fontSize: isScrolled ? '0.8rem' : '1rem', // Smaller font size when scrolled or on mobile
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: 1.2,
                transition: 'all 0.3s ease',
                width: isMobile ? '100%' : 'auto', // Full width buttons on mobile
                padding: isMobile ? '5px 0' : '10px 20px', // Adjust padding on mobile
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
