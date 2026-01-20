import { Router } from 'express';
import db from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Alle order routes vereisen authenticatie
router.use(authenticateToken);

// GET /api/orders - Get user's orders
router.get('/', async (req, res) => {
  try {
    await db.read();

    const userOrders = db.data.orders
      .filter(o => o.userId === req.user.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ orders: userOrders });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Server error bij ophalen bestellingen' });
  }
});

// GET /api/orders/:id - Get single order
router.get('/:id', async (req, res) => {
  try {
    await db.read();

    const order = db.data.orders.find(o => o.id === req.params.id && o.userId === req.user.id);

    if (!order) {
      return res.status(404).json({ error: 'Bestelling niet gevonden' });
    }

    res.json({ order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Server error bij ophalen bestelling' });
  }
});

// POST /api/orders - Create new order from cart
router.post('/', async (req, res) => {
  try {
    const { shippingInfo } = req.body;

    // Validate shipping info
    if (!shippingInfo) {
      return res.status(400).json({ error: 'Verzendgegevens zijn verplicht' });
    }

    const requiredFields = ['name', 'address', 'city', 'postalCode'];
    for (const field of requiredFields) {
      if (!shippingInfo[field]) {
        return res.status(400).json({ error: `${field} is verplicht` });
      }
    }

    await db.read();

    // Get user's cart
    const cart = db.data.carts.find(c => c.userId === req.user.id);
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Winkelwagen is leeg' });
    }

    // Validate stock and build order items
    const orderItems = [];
    for (const item of cart.items) {
      const product = db.data.products.find(p => p.id === item.productId);
      if (!product) {
        return res.status(400).json({ error: `Product ${item.productId} niet gevonden` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Niet genoeg voorraad voor ${product.name}` });
      }
      orderItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        subtotal: Math.round(product.price * item.quantity * 100) / 100
      });
    }

    // Calculate total
    const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

    // Create order
    const order = {
      id: uuidv4(),
      userId: req.user.id,
      items: orderItems,
      total: Math.round(total * 100) / 100,
      status: 'pending',
      shippingInfo,
      createdAt: new Date().toISOString()
    };

    // Update stock
    for (const item of cart.items) {
      const product = db.data.products.find(p => p.id === item.productId);
      if (product) {
        product.stock -= item.quantity;
      }
    }

    // Add order and clear cart
    db.data.orders.push(order);
    cart.items = [];

    await db.write();

    res.status(201).json({ order });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Server error bij plaatsen bestelling' });
  }
});

export default router;
