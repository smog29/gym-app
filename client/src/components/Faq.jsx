import { useState, useRef, useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";

const FAQ = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const faqRef = useRef(null);

  const questions = [
    { id: 1, question: "Jakie są godziny otwarcia?", answer: "Jestem otwarty od poniedziałku do piątku w godzinach 6:00 - 22:00, a w weekendy od 8:00 do 20:00." },
    { id: 2, question: "Czy muszę mieć własny sprzęt?", answer: "Nie, nasz sprzęt jest dostępny do użytku dla wszystkich członków. Oferujemy różnorodne maszyny, hantle, oraz akcesoria fitness." },
    { id: 3, question: "Czy oferujecie treningi personalne?", answer: "Tak, oferujemy usługi trenera personalnego. Nasz zespół wykwalifikowanych trenerów pomoże Ci osiągnąć Twoje cele fitness." },
    { id: 4, question: "Czy mogę zapisać się na siłownię na próbny okres?", answer: "Tak, oferujemy 7-dniowy darmowy okres próbny, który pozwala Ci sprawdzić, czy nasze usługi odpowiadają Twoim potrzebom." },
    { id: 5, question: "Jakie są ceny karnetów?", answer: "Mamy różne opcje karnetów: miesięczny, kwartalny oraz roczny. Ceny zaczynają się od 100 zł miesięcznie. Skontaktuj się z nami, aby uzyskać szczegółowe informacje." },
    { id: 6, question: "Czy oferujecie zajęcia grupowe?", answer: "Tak, oferujemy szeroki wybór zajęć grupowych, takich jak yoga, pilates, spinning, czy treningi siłowe. Sprawdź nasz harmonogram na stronie." },
  ];

  const handleClick = (id) => {
    setSelectedQuestion(selectedQuestion === id ? null : id);
  };

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
      id="faq"
      ref={faqRef}
      sx={{
        py: 6,
        maxWidth: "1200px",
        margin: "0 auto",
      }}
      className={`fade-in ${isVisible ? "visible" : ""}`}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mb: 4,
          color: "#333",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        Najczęściej zadawane pytania
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr", // Single column on mobile
            sm: "1fr 2fr", // 1 column for questions, 2 columns for answers on larger screens
          },
          gap: 4,
          alignItems: "start",
        }}
      >
        {/* Questions */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {questions.map((question) => (
            <Button
              key={question.id}
              onClick={() => handleClick(question.id)}
              sx={{
                textAlign: "left",
                padding: "15px 20px",
                borderRadius: "10px",
                backgroundColor: selectedQuestion === question.id ? "#4caf50" : "#f0f0f0",
                color: selectedQuestion === question.id ? "#fff" : "#333",
                fontWeight: "bold",
                fontSize: { xs: "16px", sm: "18px" }, // Smaller font size on mobile
                boxShadow:
                  selectedQuestion === question.id
                    ? "0 4px 12px rgba(76, 175, 80, 0.3)"
                    : "0 2px 8px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: selectedQuestion === question.id ? "#45a047" : "#e0e0e0",
                },
              }}
            >
              {question.question}
            </Button>
          ))}
        </Box>

        {/* Answer */}
        <Box
          sx={{
            backgroundColor: "#f7f7f7",
            borderRadius: "10px",
            padding: { xs: "20px", sm: "30px" }, // Adjust padding on mobile
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transform: selectedQuestion ? "translateY(0)" : "translateY(20px)",
            opacity: selectedQuestion ? 1 : 0,
            transition: "all 0.3s ease",
          }}
        >
          {selectedQuestion ? (
            <>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  mb: 2,
                  borderBottom: "2px solid #4caf50",
                  display: "inline-block",
                  paddingBottom: "5px",
                }}
              >
                {questions.find((q) => q.id === selectedQuestion).question}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "16px", sm: "18px" }, // Adjust font size on mobile
                  color: "#555",
                  lineHeight: 1.8,
                }}
              >
                {questions.find((q) => q.id === selectedQuestion).answer}
              </Typography>
            </>
          ) : (
            <Typography
              variant="body1"
              sx={{
                fontSize: "18px",
                color: "#888",
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              Wybierz pytanie, aby zobaczyć odpowiedź.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default FAQ;
