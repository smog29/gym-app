const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');  // Import the PostgreSQL client

const app = express();
const corsOptions = {
  origin: ['http://localhost:5173'],
};

app.use(cors(corsOptions));

// Set up the PostgreSQL client with connection details
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'admin',
  database: 'gym',
});

// Test the connection to PostgreSQL
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Error connecting to PostgreSQL:', err));

app.listen(8080, () => {
  console.log('Server started on port 8080');
});
