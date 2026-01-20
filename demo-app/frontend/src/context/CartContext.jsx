import { createContext, useState, useEffect, useCallback } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) {
      setItems([]);
      setTotal(0);
      setItemCount(0);
      return;
    }

    setLoading(true);
    try {
      const response = await cartAPI.get();
      setItems(response.data.items);
      setTotal(response.data.total);
      setItemCount(response.data.itemCount);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true);
    try {
      const response = await cartAPI.add(productId, quantity);
      setItems(response.data.items);
      setTotal(response.data.total);
      setItemCount(response.data.itemCount);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    setLoading(true);
    try {
      const response = await cartAPI.update(itemId, quantity);
      setItems(response.data.items);
      setTotal(response.data.total);
      setItemCount(response.data.itemCount);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    setLoading(true);
    try {
      const response = await cartAPI.remove(itemId);
      setItems(response.data.items);
      setTotal(response.data.total);
      setItemCount(response.data.itemCount);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      await cartAPI.clear();
      setItems([]);
      setTotal(0);
      setItemCount(0);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    items,
    total,
    itemCount,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart: fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
