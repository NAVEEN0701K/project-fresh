import { createContext, useContext, useReducer, useEffect, useState } from 'react';

const CartContext = createContext();

const initialState = { items: [], isOpen: false };

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i._id === action.payload._id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i._id === action.payload._id
              ? { ...i, quantity: i.quantity + (action.payload.quantity || 1) }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i._id !== action.payload) };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i._id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i._id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'LOAD_CART':
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [wishlist, setWishlist] = useState([]);
  const [discountCode, setDiscountCode] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('freshbasket_cart');
      if (savedCart) {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
      }
      const savedWishlist = localStorage.getItem('freshbasket_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
      const savedDiscount = localStorage.getItem('freshbasket_discount');
      if (savedDiscount) {
        setDiscountCode(JSON.parse(savedDiscount));
      }
    } catch (e) {
      console.warn('Storage load error:', e);
    }
  }, []);

  // Save Cart
  useEffect(() => {
    localStorage.setItem('freshbasket_cart', JSON.stringify(state.items));
  }, [state.items]);

  // Save Wishlist
  useEffect(() => {
    localStorage.setItem('freshbasket_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, qty = 1) => {
    if (!product.isAvailable || product.stock === 0) return;
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity: qty } });
    dispatch({ type: 'OPEN_CART' });
  };

  const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });

  const updateQuantity = (id, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    setDiscountCode(null);
    localStorage.removeItem('freshbasket_discount');
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'FRESH10') {
      const coupon = { code: 'FRESH10', percent: 10 };
      setDiscountCode(coupon);
      localStorage.setItem('freshbasket_discount', JSON.stringify(coupon));
      return { success: true, message: 'Coupon FRESH10 applied! (10% OFF)' };
    } else if (cleanCode === 'SAVE20') {
      const coupon = { code: 'SAVE20', percent: 20 };
      setDiscountCode(coupon);
      localStorage.setItem('freshbasket_discount', JSON.stringify(coupon));
      return { success: true, message: 'Coupon SAVE20 applied! (20% OFF)' };
    }
    return { success: false, message: 'Invalid promo code. Try FRESH10 or SAVE20' };
  };

  const removeCoupon = () => {
    setDiscountCode(null);
    localStorage.removeItem('freshbasket_discount');
  };

  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });

  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const cartSubtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  
  const couponDiscount = discountCode
    ? Math.round((cartSubtotal * discountCode.percent) / 100)
    : 0;
  
  const cartTotal = Math.max(0, cartSubtotal - couponDiscount);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        cartCount,
        cartSubtotal,
        cartTotal,
        couponDiscount,
        discountCode,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
        toggleWishlist,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export default CartContext;
