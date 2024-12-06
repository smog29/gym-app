import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  useMediaQuery,
  Paper,
  Fade,
} from '@mui/material';

const Calculator = () => {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const validateField = (field, value) => {
    const fieldErrors = {};
    const parsedValue = parseFloat(value);

    if (!value) {
      fieldErrors[field] = 'To pole jest wymagane.';
    } else {
      if (field === 'age') {
        if (isNaN(parsedValue) || parsedValue <= 0 || parsedValue > 120) {
          fieldErrors.age = 'Proszę podać poprawny wiek (1-120 lat).';
        }
      }

      if (field === 'height') {
        if (isNaN(parsedValue) || parsedValue <= 50 || parsedValue > 300) {
          fieldErrors.height = 'Proszę podać poprawny wzrost (50-300 cm).';
        }
      }

      if (field === 'weight') {
        if (isNaN(parsedValue) || parsedValue <= 10 || parsedValue > 300) {
          fieldErrors.weight = 'Proszę podać poprawną wagę (10-300 kg).';
        }
      }
    }

    return fieldErrors;
  };

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'age':
        setAge(value);
        break;
      case 'height':
        setHeight(value);
        break;
      case 'weight':
        setWeight(value);
        break;
      default:
        break;
    }

    // Validate the field and update errors
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors, ...validateField(field, value) };
      if (!validateField(field, value)[field]) {
        delete updatedErrors[field]; // Remove the error if the field becomes valid
      }
      return updatedErrors;
    });
  };

  const calculateCalories = () => {
    // Check if all fields are filled and valid before calculating
    const fieldErrors = {};
    if (!age) fieldErrors.age = 'To pole jest wymagane.';
    if (!height) fieldErrors.height = 'To pole jest wymagane.';
    if (!weight) fieldErrors.weight = 'To pole jest wymagane.';

    setErrors(fieldErrors); // Set errors if fields are missing

    // If there are any errors, stop calculation
    if (Object.keys(fieldErrors).length > 0) return;

    const heightCm = parseFloat(height);
    const weightKg = parseFloat(weight);
    const ageYears = parseInt(age, 10);

    // Calculate the daily calorie intake (BMR) for male/female
    const bmr =
      gender === 'male'
        ? 88.36 + 13.4 * weightKg + 4.8 * heightCm - 5.7 * ageYears
        : 447.6 + 9.2 * weightKg + 3.1 * heightCm - 4.3 * ageYears;

    setResult(`Dzienne spożycie kcal: ${Math.round(bmr)} kcal`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
        padding: 3,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: '500px',
          width: '100%',
          padding: 4,
          borderRadius: 4,
          textAlign: 'center',
          backgroundColor: '#fff',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          sx={{
            marginBottom: 3,
            fontWeight: 'bold',
            color: '#FF5722', // Orange color like header
            textTransform: 'uppercase',
          }}
        >
          Kalkulator kcal
        </Typography>

        <RadioGroup
          row
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          sx={{
            justifyContent: 'center',
            marginBottom: 3,
          }}
        >
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="Mężczyzna"
            sx={{ color: 'black', fontWeight: 'bold' }}
          />
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="Kobieta"
            sx={{ color: 'black', fontWeight: 'bold' }}
          />
        </RadioGroup>

        <TextField
          label="Wiek (lata)"
          fullWidth
          type="number"
          value={age}
          onChange={(e) => handleInputChange('age', e.target.value)}
          margin="normal"
          variant="outlined"
          error={!!errors.age}
          helperText={errors.age}
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
            },
          }}
        />
        <TextField
          label="Wzrost (cm)"
          fullWidth
          type="number"
          value={height}
          onChange={(e) => handleInputChange('height', e.target.value)}
          margin="normal"
          variant="outlined"
          error={!!errors.height}
          helperText={errors.height}
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
            },
          }}
        />
        <TextField
          label="Waga (kg)"
          fullWidth
          type="number"
          value={weight}
          onChange={(e) => handleInputChange('weight', e.target.value)}
          margin="normal"
          variant="outlined"
          error={!!errors.weight}
          helperText={errors.weight}
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
            },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            marginTop: 3,
            padding: 1.5,
            fontWeight: 'bold',
            backgroundColor: '#FF5722', // Orange color
            '&:hover': {
              backgroundColor: '#e64a19', // Darker shade on hover
            },
          }}
          onClick={calculateCalories}
        >
          Oblicz
        </Button>

        <Fade in={!!result}>
          <Typography
            variant="h6"
            sx={{
              marginTop: 3,
              color: '#FF5722',
              fontWeight: 'bold',
              animation: 'fadeIn 0.5s ease-in',
            }}
          >
            {result}
          </Typography>
        </Fade>
      </Paper>
    </Box>
  );
};

export default Calculator;
