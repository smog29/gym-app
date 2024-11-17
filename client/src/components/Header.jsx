import React, { useEffect, useRef, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Home, Shop, Info, QuestionAnswer, ContactMail } from '@mui/icons-material'; // Import icons

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef(null);

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

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <AppBar
      ref={headerRef}
      position="sticky"
      sx={{
        backgroundColor: 'white',
        boxShadow: 2,
        zIndex: 1300,
        color: 'black',
      }}
      className={`fade-in ${isVisible ? 'visible' : ''}`}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        {/* Left side: Large image with top-bottom gap */}
        <Box
          sx={{
            width: 200, // Adjust the width of the image container
            height: 100, // Adjust the height of the image container
            backgroundImage: 'url("/images/logo.jpg")', // Ensure the image path is correct
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 2,
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'grey', // Fallback background color in case the image fails to load
            marginTop: 2, // Top gap
            marginBottom: 2, // Bottom gap
          }}
        />
        
        {/* Navigation buttons with icons (Horizontal layout) */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {Object.entries({
            'About': { text: 'O mnie', icon: <Info /> },
            'Shop': { text: 'Sklep', icon: <Shop /> },
            'FAQ': { text: 'FAQ', icon: <QuestionAnswer /> },
            'Testimonials': { text: 'Opinie', icon: <Home /> }, // Use Home icon for Testimonials, or choose another one
            'Contact': { text: 'Kontakt', icon: <ContactMail /> },
          }).map(([component, { text, icon }]) => (
            <Button key={component} color="inherit" href={`#${component.toLowerCase()}`} sx={{ color: 'black', display: 'inline-flex', alignItems: 'center', gap: 1 }}>
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
