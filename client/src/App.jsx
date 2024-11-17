import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Header from './components/Header';
import About from './components/About';
import Shop from './components/Shop';
import Faq from './components/Faq';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <CssBaseline />
      <About />
      <Shop />
      <Faq />
      <Testimonials />
      <Contact />
    </ThemeProvider>
  );
}

export default App
