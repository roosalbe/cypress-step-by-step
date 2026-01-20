import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import ProductFilters from '../components/products/ProductFilters';
import ProductGrid from '../components/products/ProductGrid';
import './ProductsPage.css';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    sort: '',
    inStock: false
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const params = {};
        if (filters.category !== 'all') params.category = filters.category;
        if (filters.search) params.search = filters.search;
        if (filters.sort) params.sort = filters.sort;
        if (filters.inStock) params.inStock = 'true';

        const response = await productsAPI.getAll(params);
        setProducts(response.data.products);
      } catch (err) {
        setError('Kon producten niet laden');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container products-page" data-cy="products-page">
      <h1 className="page-title">Producten</h1>

      <ProductFilters filters={filters} onFilterChange={handleFilterChange} />

      {error && <div className="error-message">{error}</div>}

      <div className="products-count" data-cy="products-count">
        {!loading && `${products.length} producten gevonden`}
      </div>

      <ProductGrid products={products} loading={loading} />
    </div>
  );
}

export default ProductsPage;
