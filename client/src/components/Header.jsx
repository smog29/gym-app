import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Box, useMediaQuery } from '@mui/material';
import { Home, Info, QuestionAnswer, ContactMail, Shop } from '@mui/icons-material';
import DescriptionIcon from '@mui/icons-material/Description';
import CalculateIcon from '@mui/icons-material/Calculate';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm')); // Check for mobile screen size
  const navigate = useNavigate(); // Hook to programmatically navigate
  const location = useLocation(); // Hook to get the current location

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

  // Smooth scroll function with offset
  const handleSmoothScroll = (id) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      // Calculate the scroll position with an offset (100px below the top)
      const offsetPosition = targetElement.offsetTop - 100; // Adjust this value as needed
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleCalkulatorClick = () => {
    // If already on /calc page, just scroll to the calculator section
    if (location.pathname === '/calc') {
      handleSmoothScroll('calculator-section'); // Assuming there's a section with id="calculator-section" in the /calc page
    } else {
      navigate('/calc'); // Navigate to /calc page
    }
  };

  // Handle navigation to the root and smooth scroll to the section
  const handleRootNavigation = (id) => {
    if (location.pathname === '/') {
      // Scroll to the section without redirecting
      handleSmoothScroll(id);
    } else {
      // Navigate to / and then scroll to the section
      navigate('/');
      setTimeout(() => handleSmoothScroll(id), 100); // Delay to allow navigation to complete
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: isScrolled
          ? 'linear-gradient(90deg, rgba(255, 0, 0, 1) 0%, rgba(255, 87, 34, 1) 100%)'
          : 'linear-gradient(90deg, rgba(255, 0, 0, 0.8) 0%, rgba(255, 87, 34, 0.8) 70%)',
        boxShadow: 4,
        zIndex: 1300,
        color: 'white',
        transition: 'all 0.3s ease',
        padding: isScrolled ? '5px 20px' : '15px 30px',
        opacity: isHeaderVisible ? 1 : 0,
        transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 1 : 3,
        }}
      >
        <Box
          sx={{
            width: isScrolled ? 120 : 150,
            height: isScrolled ? 60 : 75,
            backgroundImage: 'url("/images/logo.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 2,
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'grey',
            marginTop: isScrolled ? 1 : 2,
            marginBottom: isScrolled ? 1 : 2,
            boxShadow: isScrolled ? 2 : 4,
            transition: 'all 0.3s ease',
          }}
        />

        <Box sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 1 : 3,
          width: '100%',
          justifyContent: isMobile ? 'center' : 'flex-end',
          paddingTop: isMobile ? 1 : 0,
        }}>
          {Object.entries({
            'About': { text: 'O mnie', icon: <Info /> },
            'Shop': { text: 'Sklep', icon: <Shop /> },
            'FAQ': { text: 'FAQ', icon: <QuestionAnswer /> },
            'Testimonials': { text: 'Opinie', icon: <Home /> },
            'Form': { text: 'Formularz', icon: <DescriptionIcon /> },
            'Contact': { text: 'Kontakt', icon: <ContactMail /> },
          }).map(([component, { text, icon }]) => (
            <Button
              key={component}
              color="inherit"
              onClick={() => handleRootNavigation(component.toLowerCase())} // Handle root navigation and scroll
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isScrolled ? '0.8rem' : '1rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: 1.2,
                transition: 'all 0.3s ease',
                width: isMobile ? '100%' : 'auto',
                padding: isMobile ? '5px 0' : '10px 20px',
                position: 'relative',
                '&:hover': {
                  backgroundColor: 'rgba(255, 87, 34, 0.1)',
                  color: '#FF5722',
                  borderRadius: '5px',
                  transform: 'scale(1.05)',
                },
                '&:hover::after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '120%',
                  height: '120%',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  zIndex: -1,
                  transition: 'all 0.3s ease',
                },
              }}
            >
              {icon}
              {text}
            </Button>
          ))}
                    <Button
            color="inherit"
            startIcon={<CalculateIcon />}
            onClick={handleCalkulatorClick}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              fontSize: isScrolled ? '0.8rem' : '1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: 1.2,
              transition: 'all 0.3s ease',
              width: isMobile ? '100%' : 'auto',
              padding: isMobile ? '5px 0' : '10px 20px',
              position: 'relative',
              '&:hover': {
                backgroundColor: 'rgba(255, 87, 34, 0.1)',
                color: '#FF5722',
                borderRadius: '5px',
                transform: 'scale(1.05)',
              },
              '&:hover::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '120%',
                height: '120%',
                backgroundColor: 'white',
                borderRadius: '50%',
                zIndex: -1,
                transition: 'all 0.3s ease',
              },
            }}
          >
            Kalkulator kcal
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
