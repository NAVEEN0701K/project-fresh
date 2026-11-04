import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Eye, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice, getDiscountPercent } from '../../utils/formatPrice';

export default function ProductCard({ product }) {
  const { addToCart, items, wishlist, toggleWishlist } = useCart();
  const { addToast } = useToast();
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const isWishlisted = wishlist?.includes(product._id);
  const inCart = items.some((i) => i._id === product._id);
  const discount = getDiscountPercent(product.originalPrice, product.price);

  const fallbackImage = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=70';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product);
    addToast(`Added ${product.name} to cart!`, 'success');
    setTimeout(() => setIsAdding(false), 700);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product._id);
    addToast(
      isWishlisted ? `Removed ${product.name} from wishlist` : `Saved ${product.name} to wishlist`,
      'info'
    );
  };

  return (
    <Link to={`/product/${product._id}`} className="block group">
      <div className="card-hover bg-white rounded-2xl border border-gray-100 overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 aspect-square">
          <img
            src={imageError ? fallbackImage : product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {discount > 0 && (
              <span className="bg-gradient-to-r from-rose-500 to-red-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                -{discount}% OFF
              </span>
            )}
            {product.isFeatured && (
              <span className="bg-gradient-to-r from-primary-700 to-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                Featured
              </span>
            )}
            {product.isSeasonal && (
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                Seasonal
              </span>
            )}
            {!product.isAvailable && (
              <span className="bg-gray-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                Out of Stock
              </span>
            )}
          </div>

          {/* Floating Action Buttons */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10 sm:translate-x-10 sm:opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={handleWishlist}
              title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-200 active:scale-90 ${
                isWishlisted
                  ? 'bg-rose-500 text-white scale-110'
                  : 'bg-white/90 text-gray-600 hover:text-rose-500 hover:bg-white hover:scale-110'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <span
              className="w-9 h-9 bg-white/90 text-gray-600 rounded-full flex items-center justify-center shadow-lg hover:text-primary-700 hover:bg-white hover:scale-110 backdrop-blur-sm transition-all duration-200 cursor-pointer"
              title="Quick preview"
            >
              <Eye className="w-4 h-4" />
            </span>
          </div>

          {/* Quick Add overlay on mobile */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-2 sm:hidden">
            <button
              onClick={handleAddToCart}
              disabled={!product.isAvailable || product.stock === 0}
              className="w-full bg-primary-700 text-white text-xs font-bold py-2 rounded-xl shadow-lg"
            >
              Quick Add
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-[11px] text-primary-600 font-semibold uppercase tracking-wider capitalize mb-1">
            {product.subcategory || product.category}
          </p>
          <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-1 mb-1 group-hover:text-primary-700 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-xs text-gray-400 line-clamp-2 mb-3 flex-1 leading-relaxed">
            {product.description}
          </p>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3 h-3 ${s <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-700">{product.rating.toFixed(1)}</span>
              {product.reviewCount > 0 && (
                <span className="text-[11px] text-gray-400">({product.reviewCount})</span>
              )}
            </div>
          )}

          {/* Price row */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-base sm:text-lg font-extrabold text-primary-700">
                  {formatPrice(product.price)}
                </span>
                <span className="text-[11px] text-gray-400">/{product.unit}</span>
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.isAvailable || product.stock === 0}
              className={`btn-shine hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 shadow-sm ${
                !product.isAvailable || product.stock === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : isAdding
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white scale-105'
                  : inCart
                  ? 'bg-primary-100 text-primary-800 hover:bg-primary-200'
                  : 'bg-gradient-to-r from-primary-700 to-emerald-600 text-white hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              {isAdding ? (
                <>
                  <Check className="w-3.5 h-3.5 animate-bounce" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{!product.isAvailable || product.stock === 0 ? 'N/A' : inCart ? 'Add More' : 'Add'}</span>
                </>
              )}
            </button>
          </div>

          {/* Low Stock Warning */}
          {product.isAvailable && product.stock > 0 && product.stock <= 10 && (
            <div className="mt-2.5 text-[11px] text-orange-700 bg-orange-50 border border-orange-100 px-2.5 py-1 rounded-lg font-semibold inline-block w-fit">
              Only {product.stock} left!
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
