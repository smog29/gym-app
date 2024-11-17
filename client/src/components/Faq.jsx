import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Faq = () => {
  const [isVisible, setIsVisible] = useState(false);
  const faqRef = useRef(null);

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

    if (faqRef.current) {
      observer.observe(faqRef.current);
    }

    return () => {
      if (faqRef.current) {
        observer.unobserve(faqRef.current);
      }
    };
  }, []);

  return (
    <Container
      ref={faqRef}
      id="faq"
      sx={{ paddingY: 4 }}
      className={`fade-in ${isVisible ? 'visible' : ''}`}
    >
      <Typography variant="h4" gutterBottom>FAQ</Typography>
      {['Question A', 'Question B', 'Question C'].map((question, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Answer to {question}...</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default Faq;
