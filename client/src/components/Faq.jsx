import React, { useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";

const FAQ = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const questions = [
    {
      id: 1,
      question: "Jakie są godziny otwarcia?",
      answer:
        "Jestem otwarty od poniedziałku do piątku w godzinach 6:00 - 22:00, a w weekendy od 8:00 do 20:00.",
    },
    {
      id: 2,
      question: "Czy muszę mieć własny sprzęt?",
      answer:
        "Nie, nasz sprzęt jest dostępny do użytku dla wszystkich członków. Oferujemy różnorodne maszyny, hantle, oraz akcesoria fitness.",
    },
    {
      id: 3,
      question: "Czy oferujecie treningi personalne?",
      answer:
        "Tak, oferujemy usługi trenera personalnego. Nasz zespół wykwalifikowanych trenerów pomoże Ci osiągnąć Twoje cele fitness.",
    },
    {
      id: 4,
      question: "Czy mogę zapisać się na siłownię na próbny okres?",
      answer:
        "Tak, oferujemy 7-dniowy darmowy okres próbny, który pozwala Ci sprawdzić, czy nasze usługi odpowiadają Twoim potrzebom.",
    },
    {
      id: 5,
      question: "Jakie są ceny karnetów?",
      answer:
        "Mamy różne opcje karnetów: miesięczny, kwartalny oraz roczny. Ceny zaczynają się od 100 zł miesięcznie. Skontaktuj się z nami, aby uzyskać szczegółowe informacje.",
    },
    {
      id: 6,
      question: "Czy oferujecie zajęcia grupowe?",
      answer:
        "Tak, oferujemy szeroki wybór zajęć grupowych, takich jak yoga, pilates, spinning, czy treningi siłowe. Sprawdź nasz harmonogram na stronie.",
    },
    {
      id: 7,
      question: "Czy muszę rezerwować miejsce na zajęcia?",
      answer:
        "Rezerwacja miejsca na zajęcia grupowe jest zalecana, zwłaszcza w godzinach szczytu. Można to zrobić za pośrednictwem naszej aplikacji lub strony internetowej.",
    },
  ];

  const handleClick = (id) => {
    if (selectedQuestion === id) {
      setSelectedQuestion(null); // If the same question is clicked again, hide the answer
    } else {
      setSelectedQuestion(id); // Show the answer for the clicked question
    }
  };

  return (
    <Container
      id="faq"
      sx={{
        py: 4,
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        FAQ
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
        }}
      >
        {/* Questions Block */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "100%",
            height: "auto",
            transition: "all 0.5s ease",
          }}
        >
          {questions.map((question) => (
            <Button
              key={question.id}
              onClick={() => handleClick(question.id)}
              sx={{
                textAlign: "left",
                borderRadius: "10px",
                padding: "15px",
                backgroundColor: selectedQuestion === question.id ? "#e0e0e0" : "#f0f0f0", // Highlight selected question
                color: selectedQuestion === question.id ? "#000" : "#333", // Change text color on selection
                fontWeight: "bold",
                fontSize: "18px",
                width: "100%",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
                transition: "transform 0.5s ease-in-out",
                transform:
                  selectedQuestion === question.id ? "translateX(-100px)" : "none", // Move selected question to the left
              }}
            >
              {question.question}
            </Button>
          ))}
        </Box>

        {/* Answer Block */}
        <Box
          sx={{
            flex: 3,
            padding: "30px", // Padding for answer block
            borderRadius: "10px",
            backgroundColor: "#f7f7f7",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            height: "auto",
            maxHeight: "500px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            opacity: selectedQuestion ? 1 : 0, // Fade in/out answer block
            transition: "opacity 0.5s ease",
          }}
        >
          {selectedQuestion && (
            <>
              <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                Odpowiedź:
              </Typography>
              <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: "bold" }}>
                {questions.find((q) => q.id === selectedQuestion).answer}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default FAQ;
