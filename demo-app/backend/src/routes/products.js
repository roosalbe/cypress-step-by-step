import { Router } from 'express';
import db from '../db/database.js';

const router = Router();

// GET /api/products
router.get('/', async (req, res) => {
  try {
    await db.read();
    let products = [...db.data.products];

    // Filter by category
    if (req.query.category && req.query.category !== 'all') {
      products = products.filter(p => p.category === req.query.category);
    }

    // Filter by search query
    if (req.query.search) {
      const query = req.query.search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Filter by stock
    if (req.query.inStock === 'true') {
      products = products.filter(p => p.stock > 0);
    }

    // Sort
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price-asc':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'name':
        case 'name-asc':
          products.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          products.sort((a, b) => b.name.localeCompare(a.name));
          break;
      }
    }

    res.json({ products });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Server error bij ophalen producten' });
  }
});

// GET /api/products/categories
router.get('/categories', async (req, res) => {
  try {
    await db.read();
    const categories = [...new Set(db.data.products.map(p => p.category))];
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    await db.read();
    const product = db.data.products.find(p => p.id === req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product niet gevonden' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
