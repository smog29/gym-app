import React, { useState, useRef, useEffect } from "react";
import { Container, Typography, Box, Card, CardContent, CardMedia, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"; // Import the shopping cart icon

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

    if (container) {
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
        maxWidth: "100%", // Make container span the full width of the screen
        margin: "0 auto", // Center the container
      }}
    >
      <Typography variant="h4" gutterBottom>
        Sklep
      </Typography>
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          gap: 3, // Increase gap between items for better spacing
          overflow: "hidden",
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For IE/Edge
          "&::-webkit-scrollbar": {
            display: "none", // For WebKit browsers
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
              flex: "0 0 calc(33.333% - 1rem)", // Adjust to take up 1/3 of the width (3 items per row)
              maxWidth: "calc(33.333% - 1rem)", // Ensure each item takes up 1/3 of the width
              transition: "transform 0.3s ease, filter 0.3s ease", // Add smooth scaling and filter transition
              filter: hoveredProduct && hoveredProduct !== product.id ? "blur(4px)" : "none", // Foggy effect on other items
              overflow: "visible", // Ensure the content does not get clipped when scaled
              transformOrigin: "center", // Scale from the center so it's even on both sides
            }}
            onMouseEnter={() => setHoveredProduct(product.id)} // Show details on hover
            onMouseLeave={() => setHoveredProduct(null)} // Hide details when mouse leaves
            onClick={() => setHoveredProduct(product.id)} // Show details on click
          >
            <Card
              sx={{
                textAlign: "center",
                position: "relative",
                transition: "transform 0.3s ease", // Smooth transition for scaling the entire card
                transform: hoveredProduct === product.id ? "scale(1.1)" : "scale(1)", // Apply scaling to the entire card
              }}
            >
              <CardMedia
                component="img"
                height="400" // Increased height for larger image
                image={product.image}
                alt={product.title}
                sx={{
                  transition: "opacity 0.3s ease",
                  opacity: hoveredProduct === product.id ? 0.3 : 1, // Dim image on hover
                  cursor: "pointer", // Change cursor on hover
                  objectFit: "cover", // Ensures the image fills the area
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
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: hoveredProduct === product.id ? 1 : 0, // Show content on hover
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
                    variant="contained" // Change variant to 'contained' for a solid background
                    startIcon={<AddShoppingCartIcon />} // Add shopping cart icon
                    sx={{
                      backgroundColor: "white", // White background
                      color: "black", // Black text color
                      borderColor: "black", // Black border
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)", // Light hover effect
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
