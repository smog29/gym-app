import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Button } from '@mui/material';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);

  const testimonials = [
    {
      id: 1,
      before: 'images/before.jpg',
      after: 'images/after.jpg',
      opinion: 'To było dla mnie ogromne wyzwanie, ale z pomocą trenerów i odpowiednim planem treningowym udało mi się osiągnąć niesamowite rezultaty...',
    },
    {
      id: 2,
      before: 'images/before.jpg',
      after: 'images/after.jpg',
      opinion: 'Kiedy zaczynałem moją przygodę z siłownią, nie wiedziałem, od czego zacząć... To było dla mnie ogromne wyzwanie, ale z pomocą trenerów i odpowiednim planem treningowym udało mi się osiągnąć niesamowite rezultaty...',
    },
    {
      id: 3,
      before: 'images/before.jpg',
      after: 'images/after.jpg',
      opinion: 'Zdecydowałam się na treningi w tym miejscu, ponieważ miałam dość typowego podejścia do fitnessu...',
    },
  ];

  const testimonialsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 }
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

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? testimonials.length - 1 : prevSlide - 1
    );
  };

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  return (
    <Container
      ref={testimonialsRef}
      id="testimonials"
      sx={{ paddingY: 6, maxWidth: '1200px', margin: '0 auto' }}
      className={`fade-in ${isVisible ? 'visible' : ''}`}
    >
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 4 }}>
        Opinie
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card sx={{ display: 'flex', flexDirection: 'row', borderRadius: '15px', boxShadow: 4 }}>
          <Box
            sx={{
              width: '60%',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '15px',
              height: '500px',
            }}
          >
            <CardMedia
              component="img"
              image={testimonials[currentSlide].before}
              alt="Before"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />

            <CardMedia
              component="img"
              image={testimonials[currentSlide].after}
              alt="After"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
                clipPath: `inset(0 ${sliderValue}% 0 0)`,
                transition: 'clip-path 0.5s ease-in-out',
              }}
            />
          </Box>

          <Box sx={{ width: '40%', padding: 4, display: 'flex', alignItems: 'center' }}>
            <CardContent>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: '18px', textAlign: 'center', lineHeight: '1.8' }}
              >
                {testimonials[currentSlide].opinion}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Typography variant="body2" sx={{ marginRight: 2 }}>
          Przed → Po
        </Typography>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderChange}
          style={{
            width: '60%',
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Button
          onClick={prevSlide}
          variant="contained"
          color="primary"
          sx={{ marginRight: 2, padding: '10px 20px', fontSize: '16px' }}
        >
          Poprzednia
        </Button>
        <Button
          onClick={nextSlide}
          variant="contained"
          color="primary"
          sx={{ padding: '10px 20px', fontSize: '16px' }}
        >
          Następna
        </Button>
      </Box>
    </Container>
  );
};

export default Testimonials;
