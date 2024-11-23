import { Box, Typography, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';

const Form = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      sx={{
        background: 'linear-gradient(145deg, #FF8C42, #FF6F00)', // Modern orange gradient
        borderRadius: '24px',
        boxShadow: '0px 12px 25px rgba(0, 0, 0, 0.2)', // Stronger shadow
        padding: '48px',
        maxWidth: '800px', // Larger form width
        margin: '60px auto 60px', // Increased gap from components above and below
        color: 'white',
      }}
    >
      <Typography
        variant="h3" // Larger title
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: '24px',
        }}
      >
        Zacznij już dziś!
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          marginBottom: '40px', // Larger gap below the text
          lineHeight: 1.8,
          fontSize: '1.2rem',
        }}
      >
        Wypełnij formularz i skontaktujemy się z Tobą. Zostań częścią naszej społeczności i 
        odkryj nowe możliwości rozwoju. Nasz zespół pomoże Ci osiągnąć sukces na każdym kroku. 
        Nie czekaj dłużej – Twoja przyszłość zaczyna się tutaj i teraz!
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px', // More spacing between inputs and button
        }}
      >
        <TextField
          fullWidth
          label="Imię i nazwisko"
          variant="outlined"
          InputProps={{
            sx: {
              backgroundColor: 'white',
              borderRadius: '12px',
              fontSize: '1.1rem',
            },
          }}
          sx={{
            fontSize: '1.2rem',
          }}
        />
        <TextField
          fullWidth
          label="Adres e-mail"
          variant="outlined"
          InputProps={{
            sx: {
              backgroundColor: 'white',
              borderRadius: '12px',
              fontSize: '1.1rem',
            },
          }}
          sx={{
            fontSize: '1.2rem',
          }}
        />
        <Button
          variant="contained"
          sx={{
            background: 'white',
            color: '#FF6F00',
            fontWeight: 'bold',
            borderRadius: '12px',
            padding: '16px 0',
            fontSize: '1.2rem',
            textTransform: 'none',
            '&:hover': {
              background: '#FFE0CC',
              color: '#FF8C42',
            },
          }}
        >
          Wyślij
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
