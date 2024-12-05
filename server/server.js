const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const app = express();
const prisma = new PrismaClient();

const corsOptions = {
  origin: ['http://localhost:5173'], // Vite app running on this port
};

app.use(cors(corsOptions));
app.use(express.json()); // To parse JSON request bodies

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Load JWT_SECRET from .env or use default

// User registration endpoint
app.post(
  '/api/v1/users',
  // Validation rules
  body('firstName').notEmpty().withMessage('Imię jest wymagane'),
  body('lastName').notEmpty().withMessage('Nazwisko jest wymagane'),
  body('email').isEmail().withMessage('Niepoprawny adres e-mail'),
  body('address').notEmpty().withMessage('Adres jest wymagany'),
  body('password')
    .matches(/^[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Hasło musi mieć co najmniej 8 znaków')
    .matches(/^[^A-Z]*[A-Z][^A-Z]*$/)  // Only one capital letter
    .withMessage('Hasło musi zawierać co najmniej jedną dużą literę'),
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, address, password } = req.body;

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res.status(400).json({ errors: 'E-mail jest już zajęty' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          address,
          password: hashedPassword,
        },
      });

      res.status(201).json(newUser);  // This line sends the response to the client
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: 'Nie udało się utworzyć użytkownika' });
    }
  }
);

// User login endpoint
app.post('/api/v1/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ errors: 'E-mail i hasło są wymagane' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ errors: 'Nieprawidłowe dane logowania' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ errors: 'Nieprawidłowe dane logowania' });
    }

    // Generate a JWT token that expires in 1 week
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ message: 'Logowanie powiodło się', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: 'Nie udało się zalogować' });
  }
});

// Start the server
app.listen(8080, () => {
  console.log('Serwer uruchomiony na porcie 8080');
});
