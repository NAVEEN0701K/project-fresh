import { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/formatPrice';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotal,
    couponDiscount,
    discountCode,
    applyCoupon,
    removeCoupon,
    cartCount,
  } = useCart();

  const { addToast } = useToast();
  const [promoInput, setPromoInput] = useState('');

  const freeDeliveryThreshold = 499;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeDeliveryThreshold) * 100));
  const remainingForFree = Math.max(0, freeDeliveryThreshold - cartSubtotal);

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

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col cart-drawer ${
          isOpen ? 'open' : ''
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-primary-100 text-primary-700 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-gray-900 leading-none">Your Cart</h2>
              <span className="text-xs text-gray-500 font-medium">{cartCount} fresh items</span>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Dynamic Progress */}
        {items.length > 0 && (
          <div className="px-5 py-3 bg-emerald-50/70 border-b border-emerald-100/60">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-emerald-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                {remainingForFree === 0
                  ? ' You unlocked FREE Delivery!'
                  : `Add ${formatPrice(remainingForFree)} more for FREE Delivery`}
              </span>
              <span className="text-emerald-700">{progressPercent}%</span>
            </div>
            <div className="w-full bg-emerald-200/60 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-12">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-emerald-600" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">Your cart is empty</p>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  Fill it with hand-picked fruits, organic veggies and lovely bouquets!
                </p>
              </div>
              <button
                onClick={closeCart}
                className="btn-primary text-sm px-6 py-2.5 rounded-xl shadow-md"
              >
                Browse Fresh Items
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item._id}
                className="flex gap-3 p-3 bg-gray-50/80 hover:bg-gray-50 rounded-2xl border border-gray-100 transition-colors"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&q=60';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                  <p className="text-xs text-gray-400 capitalize">{item.unit}</p>
                  <p className="text-sm font-extrabold text-primary-700 mt-1">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => {
                      removeFromCart(item._id);
                      addToast(`Removed ${item.name}`, 'info');
                    }}
                    className="p-1 text-gray-400 hover:text-rose-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg p-0.5 shadow-sm">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Promo Section */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-5 space-y-3 bg-white shadow-lg">
            {/* Promo Code Input */}
            {discountCode ? (
              <div className="flex items-center justify-between p-2.5 bg-primary-50 border border-primary-200 rounded-xl text-xs">
                <span className="text-primary-800 font-semibold flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-primary-600" />
                  Coupon <strong>{discountCode.code}</strong> applied ({discountCode.percent}% OFF)
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
                  placeholder="Promo Code (try FRESH10)"
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

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-gray-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-800">{formatPrice(cartSubtotal)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span>-{formatPrice(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                {remainingForFree === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  <span className="font-semibold text-gray-800">{formatPrice(49)}</span>
                )}
              </div>
              <div className="flex justify-between font-extrabold text-sm text-gray-900 pt-2 border-t border-gray-100">
                <span>Grand Total</span>
                <span className="text-primary-700 text-base">
                  {formatPrice(cartTotal + (remainingForFree === 0 ? 0 : 49))}
                </span>
              </div>
            </div>

            <Link
              to="/cart"
              onClick={closeCart}
              className="w-full flex items-center justify-center gap-2 bg-primary-700 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-primary-800 active:scale-[.98] transition-all"
            >
              Checkout Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
