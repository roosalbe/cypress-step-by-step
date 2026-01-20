import { Router } from 'express';
import db from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';
import bcrypt from 'bcryptjs';

const router = Router();

// Alle user routes vereisen authenticatie
router.use(authenticateToken);

// GET /api/users/profile - Get current user profile
router.get('/profile', async (req, res) => {
  try {
    await db.read();

    const user = db.data.users.find(u => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'Gebruiker niet gevonden' });
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error bij ophalen profiel' });
  }
});

// PUT /api/users/profile - Update current user profile
router.put('/profile', async (req, res) => {
  try {
    const { name, email } = req.body;

    await db.read();

    const userIndex = db.data.users.findIndex(u => u.id === req.user.id);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'Gebruiker niet gevonden' });
    }

    // Check if email is taken by another user
    if (email && email !== db.data.users[userIndex].email) {
      const emailExists = db.data.users.some(u => u.email === email && u.id !== req.user.id);
      if (emailExists) {
        return res.status(400).json({ error: 'Email is al in gebruik' });
      }
    }

    // Update fields
    if (name) db.data.users[userIndex].name = name;
    if (email) db.data.users[userIndex].email = email;

    await db.write();

    // Return updated user without password
    const { password, ...userWithoutPassword } = db.data.users[userIndex];
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error bij updaten profiel' });
  }
});

// PUT /api/users/password - Change password
router.put('/password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Huidig en nieuw wachtwoord zijn verplicht' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Nieuw wachtwoord moet minimaal 6 karakters zijn' });
    }

    await db.read();

    const userIndex = db.data.users.findIndex(u => u.id === req.user.id);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'Gebruiker niet gevonden' });
    }

    // Verify current password
    const validPassword = await bcrypt.compare(currentPassword, db.data.users[userIndex].password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Huidig wachtwoord is onjuist' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    db.data.users[userIndex].password = hashedPassword;
    await db.write();

    res.json({ success: true, message: 'Wachtwoord succesvol gewijzigd' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Server error bij wijzigen wachtwoord' });
  }
});

export default router;
