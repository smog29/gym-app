import React, { useState, useRef, useEffect } from "react";
import { Container, Typography, Box, Card, CardContent, CardMedia, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Shop = () => {
  const containerRef = useRef(null);

  const products = [
    { id: 1, title: "Product 1", price: "10", image: "images/handles.jpeg" },
    { id: 2, title: "Product 2", price: "20", image: "images/handles2.jpg" },
    { id: 3, title: "Product 3", price: "30", image: "images/ball.jpg" },
    { id: 5, title: "Product 5", price: "50", image: "images/shoes.jpg" },
  ];

  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const firstItem = container.firstChild;
      const lastItem = container.lastChild;

      if (container.scrollLeft <= 0) {
        container.scrollLeft += lastItem.offsetWidth;
        container.prepend(lastItem);
      } else if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollLeft -= firstItem.offsetWidth;
        container.append(firstItem);
      }
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleDragStart = (e) => {
    containerRef.current.isDragging = true;
    containerRef.current.startX = e.pageX || e.touches[0].pageX;
  };

  const handleDragMove = (e) => {
    if (!containerRef.current.isDragging) return;

    const currentX = e.pageX || e.touches[0].pageX;
    const deltaX = containerRef.current.startX - currentX;
    containerRef.current.scrollLeft += deltaX;
    containerRef.current.startX = currentX;
  };

  const handleDragEnd = () => {
    containerRef.current.isDragging = false;
  };

  return (
    <Container
      id="shop"
      sx={{
        py: { xs: 4, sm: 6 }, // Add more padding on larger screens
        maxWidth: "100%",
        margin: "0 auto",
        paddingTop: { xs: 4, sm: 6 }, // More space above on larger screens
        paddingBottom: { xs: 4, sm: 6 }, // More space below on larger screens
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        Sprawdź produkty
      </Typography>
      <Box
        ref={containerRef}
        sx={{
          py: 8,
          display: "flex",
          gap: 3,
          overflowX: "scroll", // Make horizontal scrolling active
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          cursor: "grab",
          userSelect: "none",
          // Mobile only
          "@media (max-width: 600px)": {
            flexWrap: "nowrap", // Make sure it's horizontally scrollable
          },
        }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onMouseMove={handleDragMove}
        onTouchMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchEnd={handleDragEnd}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              flex: "0 0 100%", // Set to 100% to show one item at a time on mobile
              maxWidth: "100%", // Keep it to 100% width for mobile
              transition: "transform 0.3s ease, filter 0.3s ease",
              filter: hoveredProduct && hoveredProduct !== product.id ? "blur(4px)" : "none",
              overflow: "visible",
              transformOrigin: "center",
              // Desktop
              "@media (min-width: 600px)": {
                flex: "0 0 calc(33.333% - 1rem)", // 3 items per row on larger screens
                maxWidth: "calc(33.333% - 1rem)",
              },
            }}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
            onClick={() => setHoveredProduct(product.id)}
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
                height="400"
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
    </Container>
  );
};

export default Shop;
