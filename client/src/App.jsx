import './App.css';

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Shop from './components/Shop';
import Faq from './components/Faq';
import Transformations from './components/Transformations';
import Testimonials from './components/Testimonials';
import Form from './components/Form';
import Contact from './components/Contact';
import Calculator from './components/Calculator'; // Import your new tab component

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
      <Router>
        <Header />
        <CssBaseline />
        <Routes>
          <Route path="/" element={
            <>
              <About />
              <Shop />
              <Faq />
              <Transformations />
              <Testimonials />
              <Form />
              <Contact />
            </>
          } />
          <Route path="/calc" element={<Calculator />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
