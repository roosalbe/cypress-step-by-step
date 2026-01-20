import { Router } from 'express';
import db from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Alle cart routes vereisen authenticatie
router.use(authenticateToken);

// GET /api/cart - Get user's cart
router.get('/', async (req, res) => {
  try {
    await db.read();

    let cart = db.data.carts.find(c => c.userId === req.user.id);

    if (!cart) {
      cart = {
        id: uuidv4(),
        userId: req.user.id,
        items: []
      };
      db.data.carts.push(cart);
      await db.write();
    }

    // Enrich cart items with product details
    const enrichedItems = cart.items.map(item => {
      const product = db.data.products.find(p => p.id === item.productId);
      return {
        ...item,
        product: product || null
      };
    }).filter(item => item.product !== null);

    const total = enrichedItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    res.json({
      items: enrichedItems,
      total: Math.round(total * 100) / 100,
      itemCount: enrichedItems.reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ error: 'Server error bij ophalen winkelwagen' });
  }
});

// POST /api/cart - Add item to cart
router.post('/', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is verplicht' });
    }

    await db.read();

    // Check if product exists
    const product = db.data.products.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: 'Product niet gevonden' });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Niet genoeg voorraad' });
    }

    // Get or create cart
    let cart = db.data.carts.find(c => c.userId === req.user.id);
    if (!cart) {
      cart = {
        id: uuidv4(),
        userId: req.user.id,
        items: []
      };
      db.data.carts.push(cart);
    }

    // Check if item already in cart
    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        id: uuidv4(),
        productId,
        quantity
      });
    }

    await db.write();

    // Return updated cart
    const enrichedItems = cart.items.map(item => {
      const prod = db.data.products.find(p => p.id === item.productId);
      return { ...item, product: prod };
    }).filter(item => item.product);

    const total = enrichedItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    res.json({
      items: enrichedItems,
      total: Math.round(total * 100) / 100,
      itemCount: enrichedItems.reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Server error bij toevoegen aan winkelwagen' });
  }
});

// PUT /api/cart/:itemId - Update item quantity
router.put('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined || quantity < 0) {
      return res.status(400).json({ error: 'Geldige hoeveelheid is verplicht' });
    }

    await db.read();

    const cart = db.data.carts.find(c => c.userId === req.user.id);
    if (!cart) {
      return res.status(404).json({ error: 'Winkelwagen niet gevonden' });
    }

    const itemIndex = cart.items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item niet gevonden in winkelwagen' });
    }

    if (quantity === 0) {
      // Remove item
      cart.items.splice(itemIndex, 1);
    } else {
      // Check stock
      const product = db.data.products.find(p => p.id === cart.items[itemIndex].productId);
      if (product && product.stock < quantity) {
        return res.status(400).json({ error: 'Niet genoeg voorraad' });
      }
      cart.items[itemIndex].quantity = quantity;
    }

    await db.write();

    // Return updated cart
    const enrichedItems = cart.items.map(item => {
      const prod = db.data.products.find(p => p.id === item.productId);
      return { ...item, product: prod };
    }).filter(item => item.product);

    const total = enrichedItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    res.json({
      items: enrichedItems,
      total: Math.round(total * 100) / 100,
      itemCount: enrichedItems.reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ error: 'Server error bij updaten winkelwagen' });
  }
});

// DELETE /api/cart/:itemId - Remove item from cart
router.delete('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;

    await db.read();

    const cart = db.data.carts.find(c => c.userId === req.user.id);
    if (!cart) {
      return res.status(404).json({ error: 'Winkelwagen niet gevonden' });
    }

    const itemIndex = cart.items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item niet gevonden in winkelwagen' });
    }

    cart.items.splice(itemIndex, 1);
    await db.write();

    // Return updated cart
    const enrichedItems = cart.items.map(item => {
      const prod = db.data.products.find(p => p.id === item.productId);
      return { ...item, product: prod };
    }).filter(item => item.product);

    const total = enrichedItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    res.json({
      items: enrichedItems,
      total: Math.round(total * 100) / 100,
      itemCount: enrichedItems.reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    console.error('Delete cart item error:', error);
    res.status(500).json({ error: 'Server error bij verwijderen uit winkelwagen' });
  }
});

// DELETE /api/cart - Clear entire cart
router.delete('/', async (req, res) => {
  try {
    await db.read();

    const cartIndex = db.data.carts.findIndex(c => c.userId === req.user.id);
    if (cartIndex !== -1) {
      db.data.carts[cartIndex].items = [];
      await db.write();
    }

    res.json({ success: true, items: [], total: 0, itemCount: 0 });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ error: 'Server error bij legen winkelwagen' });
  }
});

export default router;
