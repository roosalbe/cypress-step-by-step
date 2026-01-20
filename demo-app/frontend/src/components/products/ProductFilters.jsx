import { useState, useEffect } from 'react';
import { productsAPI } from '../../services/api';
import Input from '../common/Input';
import Button from '../common/Button';
import './ProductFilters.css';

function ProductFilters({ filters, onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productsAPI.getCategories();
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      category: 'all',
      search: '',
      sort: '',
      inStock: false
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <form className="product-filters" onSubmit={handleSearch} data-cy="product-filters">
      <div className="filter-row">
        <div className="filter-group">
          <Input
            type="text"
            name="search"
            placeholder="Zoek producten..."
            value={localFilters.search}
            onChange={handleChange}
            data-cy="search-input"
          />
        </div>

        <div className="filter-group">
          <select
            name="category"
            className="form-input"
            value={localFilters.category}
            onChange={handleChange}
            data-cy="category-filter"
          >
            <option value="all">Alle categorieën</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <select
            name="sort"
            className="form-input"
            value={localFilters.sort}
            onChange={handleChange}
            data-cy="sort-filter"
          >
            <option value="">Standaard</option>
            <option value="price-asc">Prijs laag-hoog</option>
            <option value="price-desc">Prijs hoog-laag</option>
            <option value="name-asc">Naam A-Z</option>
            <option value="name-desc">Naam Z-A</option>
          </select>
        </div>

        <div className="filter-group filter-checkbox">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="inStock"
              checked={localFilters.inStock}
              onChange={handleChange}
              data-cy="in-stock-filter"
            />
            <span>Alleen op voorraad</span>
          </label>
        </div>
      </div>

      <div className="filter-actions">
        <Button type="submit" variant="primary" size="small" data-cy="apply-filters">
          Filters toepassen
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="small"
          onClick={handleReset}
          data-cy="reset-filters"
        >
          Reset
        </Button>
      </div>
    </form>
  );
}

export default ProductFilters;
