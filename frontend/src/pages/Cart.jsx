import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Tag,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatPrice';

export default function Cart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotal,
    couponDiscount,
    discountCode,
    applyCoupon,
    removeCoupon,
    clearCart,
  } = useCart();

  const { addToast } = useToast();
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    document.title = 'Shopping Cart  FreshBasket';
  }, []);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyCoupon(promoInput);
    if (res.success) {
      addToast(res.message, 'success');
      setPromoInput('');
    } else {
      addToast(res.message, 'error');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderPlaced(true);
      clearCart();
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }, 1200);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-5 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">Order Confirmed!</h2>
        <p className="text-sm text-gray-500 max-w-sm mb-6">
          Thank you for shopping with FreshBasket. Your fresh items are being handpicked and prepared for delivery!
        </p>
        <button
          onClick={() => navigate('/catalog')}
          className="btn-primary px-8 py-3 rounded-2xl text-sm font-bold shadow-md"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-bg flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-300" />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-6 text-sm">Looks like you haven&apos;t added any fresh items yet.</p>
        <Link to="/catalog" className="btn-primary px-8 py-3 rounded-2xl text-sm font-bold shadow-md">
          Start Shopping
        </Link>
      </div>
    );
  }

  const deliveryCharge = cartSubtotal >= 499 ? 0 : 49;
  const finalTotal = cartTotal + deliveryCharge;

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/catalog"
            className="p-2 hover:bg-white rounded-xl border border-gray-200/60 shadow-sm transition-colors text-gray-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-none">
              Your Basket
            </h1>
            <span className="text-xs text-gray-500 font-medium">
              Review and adjust your fresh picks
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Items Section */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4 transition-all hover:shadow-md"
              >
                <Link to={`/product/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&q=60';
                    }}
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <Link to={`/product/${item._id}`}>
                        <p className="font-bold text-gray-900 hover:text-primary-700 transition-colors">
                          {item.name}
                        </p>
                      </Link>
                      <p className="text-xs text-gray-400 capitalize mt-0.5">{item.unit}</p>
                    </div>
                    <button
                      onClick={() => {
                        removeFromCart(item._id);
                        addToast(`Removed ${item.name}`, 'info');
                      }}
                      className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="px-3 py-1.5 hover:bg-gray-100 transition-colors text-gray-700"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 py-1.5 font-bold text-sm border-x border-gray-200 bg-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="px-3 py-1.5 hover:bg-gray-100 transition-colors text-gray-700"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="font-black text-primary-700 text-base">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                clearCart();
                addToast('Basket cleared', 'info');
              }}
              className="text-xs text-rose-500 hover:text-rose-700 font-bold transition-colors ml-1"
            >
              Clear all items
            </button>
          </div>

          {/* Dynamic Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sticky top-24 space-y-4">
              <h2 className="text-lg font-extrabold text-gray-900 border-b border-gray-100 pb-3">
                Order Summary
              </h2>

              {/* Promo code */}
              {discountCode ? (
                <div className="flex items-center justify-between p-3 bg-primary-50 border border-primary-200 rounded-2xl text-xs">
                  <span className="text-primary-800 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary-600" />
                    {discountCode.code} ({discountCode.percent}% OFF)
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-primary-900 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (FRESH10 / SAVE20)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-xl uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Breakdown */}
              <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">{formatPrice(cartSubtotal)}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery</span>
                  {deliveryCharge === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    <span className="font-semibold text-gray-900">{formatPrice(deliveryCharge)}</span>
                  )}
                </div>

                {deliveryCharge > 0 && (
                  <div className="text-[11px] text-amber-800 bg-amber-50 px-3 py-2 rounded-xl border border-amber-200/60 font-medium">
                     Add {formatPrice(499 - cartSubtotal)} more to qualify for FREE Delivery!
                  </div>
                )}

                <div className="flex justify-between font-extrabold text-base text-gray-900 pt-3 border-t border-gray-100">
                  <span>Grand Total</span>
                  <span className="text-primary-700 text-xl">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Dynamic Instant Place Order Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-primary-700 text-white font-bold py-3.5 rounded-2xl shadow-md hover:bg-primary-800 transition-all active:scale-[.98] disabled:opacity-50 text-sm flex items-center justify-center gap-2"
              >
                {isCheckingOut ? (
                  <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <span>Place Order Now  {formatPrice(finalTotal)}</span>
                )}
              </button>

              <Link
                to="/catalog"
                className="block text-center text-xs text-gray-500 hover:text-gray-800 font-medium py-1"
              >
                 Back to Fresh Catalog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
