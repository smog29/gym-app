import { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Button, Fade } from '@mui/material';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(100);
  const intervalRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      before: '/images/before-marek.png',
      after: '/images/after-marek.png',
      opinion: 'Kiedy zaczynałem moją przygodę z siłownią, nie wiedziałem, od czego zacząć... To było dla mnie ogromne wyzwanie, ale z pomocą trenerów i odpowiednim planem treningowym udało mi się osiągnąć niesamowite rezultaty...',
    },
    {
      id: 2,
      before: '/images/before-ania.png',
      after: '/images/after-ania.png',
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

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
    }, 7000);
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(intervalRef.current);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
    resetTimer();
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? testimonials.length - 1 : prevSlide - 1
    );
    resetTimer();
  };

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  return (
    <Container
      ref={testimonialsRef}
      id="testimonials"
      sx={{
        paddingY: 6,
        maxWidth: '1200px',
        margin: '0 auto',
        '@media (max-width: 600px)': {
          paddingY: 4,
        },
      }}
      className={`fade-in ${isVisible ? 'visible' : ''}`}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: 4,
          fontSize: { xs: '2rem', sm: '2.5rem' },
        }}
      >
        Opinie
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'row',
            borderRadius: '15px',
            boxShadow: 4,
            width: { xs: '100%', sm: '80%' },
            maxWidth: '1200px',
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', sm: '60%' },
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '15px',
              height: { xs: '300px', sm: '500px' },
              padding: '10px',
            }}
          >
            <Fade in={true} timeout={1000}>
              <CardMedia
                component="img"
                image={`${import.meta.env.BASE_URL}${testimonials[currentSlide].after}`}
                alt="After"
                sx={{
                  maxWidth: '100%',
                  maxHeight: '500px',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  borderRadius: '15px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                }}
              />
            </Fade>

            <Fade in={true} timeout={1000}>
              <CardMedia
                component="img"
                image={testimonials[currentSlide].before}
                alt="Before"
                sx={{
                  maxWidth: '100%',
                  maxHeight: '500px',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  clipPath: `inset(0 ${sliderValue}% 0 0)`,
                  transition: 'clip-path 0.5s ease-in-out',
                  borderRadius: '15px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                }}
              />
            </Fade>
          </Box>

          <Box
            sx={{
              width: { xs: '100%', sm: '40%' },
              padding: 4,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CardContent>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '14px', sm: '18px' },
                  textAlign: 'center',
                  lineHeight: '1.8',
                }}
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
          sx={{
            marginRight: 2,
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: 'black',
            color: 'white',
          }}
        >
          Poprzednia
        </Button>
        <Button
          onClick={nextSlide}
          variant="contained"
          sx={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: 'black',
            color: 'white',
          }}
        >
          Następna
        </Button>
      </Box>
    </Container>
  );
};

export default Testimonials;
