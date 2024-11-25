import React, { useState, useRef, useEffect } from "react";
import { Container, Typography, Box, Card, CardContent, CardMedia, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Shop = () => {
  const [currentCollection, setCurrentCollection] = useState(0);
  const productsPerPage = 9;
  const allProducts = [
    { id: 1, title: "Product 1", price: "10", image: "images/handles.jpeg" },
    { id: 2, title: "Product 2", price: "20", image: "images/handles2.jpg" },
    { id: 3, title: "Product 3", price: "30", image: "images/ball.jpg" },
    { id: 4, title: "Product 4", price: "40", image: "images/shoes.jpg" },
    { id: 5, title: "Product 5", price: "50", image: "images/handles.jpeg" },
    { id: 6, title: "Product 6", price: "60", image: "images/handles2.jpg" },
    { id: 7, title: "Product 7", price: "70", image: "images/ball.jpg" },
    { id: 8, title: "Product 8", price: "80", image: "images/shoes.jpg" },
    { id: 9, title: "Product 9", price: "90", image: "images/handles.jpeg" },
    { id: 10, title: "Product 10", price: "100", image: "images/handles2.jpg" },
    { id: 11, title: "Product 11", price: "110", image: "images/ball.jpg" },
    { id: 12, title: "Product 12", price: "120", image: "images/shoes.jpg" },
    { id: 13, title: "Product 13", price: "130", image: "images/handles.jpeg" },
    { id: 14, title: "Product 14", price: "140", image: "images/handles2.jpg" },
    { id: 15, title: "Product 15", price: "150", image: "images/ball.jpg" },
  ];

  const products = allProducts.slice(
    currentCollection * productsPerPage,
    (currentCollection + 1) * productsPerPage
  );

  const [hoveredProduct, setHoveredProduct] = useState(null);

  const buttonsWrapperRef = useRef(null);

  const handleNextCollection = () => {
    if ((currentCollection + 1) * productsPerPage < allProducts.length) {
      setCurrentCollection((prev) => prev + 1);
    }
  };

  const handlePrevCollection = () => {
    if (currentCollection > 0) {
      setCurrentCollection((prev) => prev - 1);
    }
  };

  // Check if the total number of products is less than or equal to productsPerPage
  const hasMoreThan9Products = allProducts.length > productsPerPage;

  const hasLessThanFullPage = (currentCollection + 1) * productsPerPage >= allProducts.length;

  useEffect(() => {
    if (hasLessThanFullPage && buttonsWrapperRef.current) {
      buttonsWrapperRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentCollection, hasLessThanFullPage]);

  return (
    <Container
      id="shop"
      sx={{
        py: { xs: 4, sm: 6 },
        maxWidth: "100%",
        margin: "0 auto",
        paddingTop: { xs: 4, sm: 6 },
        paddingBottom: { xs: 4, sm: 6 },
      }}
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
        Sprawdź produkty
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)", // 1 column on extra-small screens
            sm: "repeat(2, 1fr)", // 2 columns on small screens
            md: "repeat(3, 1fr)", // 3 columns on medium and larger screens
          },
          gap: 3,
          paddingBottom: "2rem",
        }}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <Card
              sx={{
                textAlign: "center",
                position: "relative",
                transition: "transform 0.3s ease",
                transform: hoveredProduct === product.id ? "scale(1.1)" : "scale(1)",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{
                  transition: "opacity 0.3s ease",
                  opacity: hoveredProduct === product.id ? 0.3 : 1,
                  cursor: "pointer",
                  objectFit: "cover",
                }}
              />
              {(hoveredProduct === product.id || hoveredProduct === null) && (
                <CardContent
                  sx={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: hoveredProduct === product.id ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <Typography variant="h6" color="white">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Cena: {product.price} zł
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<AddShoppingCartIcon />}
                    sx={{
                      backgroundColor: "white",
                      color: "black",
                      borderColor: "black",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    Dodaj do koszyka
                  </Button>
                </CardContent>
              )}
            </Card>
          </Box>
        ))}
      </Box>

      {/* Show buttons only if there are more than 9 items */}
      {hasMoreThan9Products && (
        <Box
          ref={buttonsWrapperRef} // Add ref to the wrapper
          sx={{ display: "flex", justifyContent: "center", gap: 2 }}
        >
          <Button
            variant="contained"
            onClick={handlePrevCollection}
            disabled={currentCollection === 0}
            sx={{
              backgroundColor: "#333",
              "&:hover": {
                backgroundColor: "#555",
              },
            }}
          >
            Poprzednie
          </Button>
          <Button
            variant="contained"
            onClick={handleNextCollection}
            disabled={hasLessThanFullPage}
            sx={{
              backgroundColor: "#333",
              "&:hover": {
                backgroundColor: "#555",
              },
            }}
          >
            Następne
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Shop;
