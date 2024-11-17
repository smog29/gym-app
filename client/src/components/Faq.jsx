import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Faq = () => (
  <Container id="faq" sx={{ paddingY: 4 }}>
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

export default Faq;
