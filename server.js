const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Serve the React app as static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// Sample API route for testing
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Catch-all route to serve React's index.html for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
