const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const app = express();
const prisma = new PrismaClient();

const corsOptions = {
  origin: ['http://localhost:5173'], // Vite app running on this port
};

app.use(cors(corsOptions));
app.use(express.json()); // To parse JSON request bodies

const JWT_SECRET = process.env.JWT_SECRET

// Set up Nodemailer for sending email
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use another email service
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app password
  },
});

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
  body('passwordConfirmation')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Hasła muszą się zgadzać'),
  async (req, res) => {
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

      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({ message: 'Rejestracja zakończona sukcesem', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: 'Nie udało się utworzyć użytkownika' });
    }
  }
);

// Request Password Reset - Generate Token and Send Email
app.post('/api/v1/request-password-reset', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ errors: 'E-mail jest wymagany' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ errors: 'Użytkownik nie znaleziony' });
    }

    // Generate a password reset token that expires in 2 hours
    const resetToken = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Create the reset link
    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

    // Send email with reset link
    await transporter.sendMail({
      from: 'your_email@gmail.com',
      to: user.email,
      subject: 'Resetuj hasło',
      html: `<p>Witaj, aby zresetować swoje hasło, kliknij w poniższy link:</p><p><a href="${resetLink}">${resetLink}</a></p>`,
    });

    res.status(200).json({ message: 'Link do resetowania hasła został wysłany na Twój e-mail' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: 'Nie udało się wysłać e-maila z linkiem resetującym hasło' });
  }
});

// Reset Password - Verify Token and Update Password
app.post('/api/v1/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ errors: 'Token i nowe hasło są wymagane' });
  }

  try {
    // Verify the reset token
    const decoded = jwt.verify(token, JWT_SECRET);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: 'Hasło zostało zaktualizowane' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ errors: 'Nieprawidłowy lub wygasły token' });
  }
});

// Start the server
app.listen(8080, () => {
  console.log('Serwer uruchomiony na porcie 8080');
});
