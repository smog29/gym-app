import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Button } from '@mui/material';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(50); // Initial value for the slider
  const testimonials = [
    {
      id: 1,
      before: 'images/opinion.jpg', // Before image
      after: 'images/opinion.jpg',  // After image
      opinion: 'To było dla mnie ogromne wyzwanie, ale z pomocą trenerów i odpowiednim planem treningowym udało mi się osiągnąć niesamowite rezultaty...',
    },
    {
      id: 2,
      before: 'images/opinion.jpg', // Before image
      after: 'images/opinion.jpg',  // After image
      opinion: 'Kiedy zaczynałem moją przygodę z siłownią, nie wiedziałem, od czego zacząć...',
    },
    {
      id: 3,
      before: 'images/opinion.jpg', // Before image
      after: 'images/opinion.jpg',  // After image
      opinion: 'Zdecydowałam się na treningi w tym miejscu, ponieważ miałam dość typowego podejścia do fitnessu...',
    },
  ];

  const testimonialsRef = useRef(null);

  // Intersection Observer to detect when the section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current);
      }
    };
  }, []);

  // Move to the next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
  };

  // Move to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? testimonials.length - 1 : prevSlide - 1
    );
  };

  // Handle slider change
  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  return (
    <Container
      ref={testimonialsRef}
      id="testimonials"
      sx={{ paddingY: 4 }}
      className={`fade-in ${isVisible ? 'visible' : ''}`}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Opinie
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card sx={{ display: 'flex', flexDirection: 'row', borderRadius: '10px', boxShadow: 2 }}>
          {/* Left Section - Image Slider */}
          <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
            <CardMedia
              component="img"
              image={testimonials[currentSlide].before} // Start with the before image
              alt="Before"
              sx={{
                marginBottom: 2,
                borderRadius: '10px',
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                clipPath: `inset(0 0 0 ${100 - sliderValue}%)`, // Control the slide based on the slider value
                transition: 'clip-path 0.5s ease-in-out',
              }}
            />
            <CardMedia
              component="img"
              image={testimonials[currentSlide].after} // After image
              alt="After"
              sx={{
                marginBottom: 2,
                borderRadius: '10px',
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                position: 'absolute', // Layered over the before image
                clipPath: `inset(0 ${sliderValue}% 0 0)`, // Control the slide based on the slider value
                transition: 'clip-path 0.5s ease-in-out',
              }}
            />
          </Box>

          {/* Right Section - Opinion Text */}
          <Box sx={{ width: '50%', padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '16px', textAlign: 'center' }}>
                {testimonials[currentSlide].opinion}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Box>

      {/* Slider for Transitioning */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Typography variant="body2" sx={{ marginRight: 2 }}>Przed → Po</Typography>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderChange}
          sx={{ width: '80%' }}
        />
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Button onClick={prevSlide} sx={{ marginRight: 2 }}>Poprzedni</Button>
        <Button onClick={nextSlide}>Następny</Button>
      </Box>
    </Container>
  );
};

export default Testimonials;
