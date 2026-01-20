import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import db from '../db/database.js';
import { generateToken, authenticateToken } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email en wachtwoord zijn verplicht' });
    }

    await db.read();
    const user = db.data.users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ error: 'Ongeldige inloggegevens' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Ongeldige inloggegevens' });
    }

    const token = generateToken(user);

    // Return user without password
    const { password: _, ...safeUser } = user;
    res.json({ token, user: safeUser });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error bij inloggen' });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email en wachtwoord zijn verplicht' });
    }

    await db.read();

    // Check if user exists
    const existingUser = db.data.users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email is al geregistreerd' });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      name: name || `${firstName || ''} ${lastName || ''}`.trim(),
      firstName: firstName || '',
      lastName: lastName || '',
      role: 'user',
      createdAt: new Date().toISOString()
    };

    db.data.users.push(newUser);
    await db.write();

    const token = generateToken(newUser);
    const { password: _, ...safeUser } = newUser;

    res.status(201).json({ token, user: safeUser });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error bij registratie' });
  }
});

// GET /api/auth/me
router.get('/me', authenticateToken, async (req, res) => {
  try {
    await db.read();
    const user = db.data.users.find(u => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'Gebruiker niet gevonden' });
    }

    const { password: _, ...safeUser } = user;
    res.json({ user: safeUser });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  // Client-side handles token removal
  res.json({ success: true, message: 'Uitgelogd' });
});

export default router;
