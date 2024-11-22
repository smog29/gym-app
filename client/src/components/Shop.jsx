import React, { useState, useRef, useEffect } from "react";
import { Container, Typography, Box, Card, CardContent, CardMedia, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Shop = () => {
  const containerRef = useRef(null);

  const products = [
    { id: 1, title: "Product 1", price: "$10", image: "images/handles.jpeg" },
    { id: 2, title: "Product 2", price: "$20", image: "images/handles.jpeg" },
    { id: 3, title: "Product 3", price: "$30", image: "images/handles.jpeg" },
    { id: 4, title: "Product 4", price: "$40", image: "images/handles.jpeg" },
    { id: 5, title: "Product 5", price: "$50", image: "images/handles.jpeg" },
    { id: 6, title: "Product 6", price: "$60", image: "images/handles.jpeg" },
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
        py: 4,
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        Sprawdź produkty
      </Typography>
      <Box
        ref={containerRef}
        sx={{
          py: 2,
          display: "flex",
          gap: 3,
          overflow: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          cursor: "grab",
          userSelect: "none",
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
              flex: "0 0 calc(33.333% - 1rem)",
              maxWidth: "calc(33.333% - 1rem)",
              transition: "transform 0.3s ease, filter 0.3s ease",
              filter: hoveredProduct && hoveredProduct !== product.id ? "blur(4px)" : "none",
              overflow: "visible",
              transformOrigin: "center",
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
                    Cena: {product.price}
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
