import ProductCard from './ProductCard';
import './ProductGrid.css';

function ProductGrid({ products, loading }) {
  if (loading) {
    return <div className="loading-container">Producten laden...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="no-products" data-cy="no-products">
        <p>Geen producten gevonden</p>
      </div>
    );
  }

  return (
    <div className="product-grid" data-cy="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
