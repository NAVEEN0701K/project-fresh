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
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product._id);
    addToast(
      isWishlisted ? `Removed ${product.name} from wishlist` : `Saved ${product.name} to wishlist `,
      'info'
    );
  };

  return (
    <Link to={`/product/${product._id}`} className="block group">
      <div className="card h-full flex flex-col hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-50 aspect-square">
          <img
            src={imageError ? fallbackImage : product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {discount > 0 && (
              <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                -{discount}% OFF
              </span>
            )}
            {product.isFeatured && (
              <span className="bg-primary-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                Featured
              </span>
            )}
            {product.isSeasonal && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                Seasonal
              </span>
            )}
            {!product.isAvailable && (
              <span className="bg-gray-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                Out of Stock
              </span>
            )}
          </div>

          {/* Floating Actions */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200">
            <button
              onClick={handleWishlist}
              title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md backdrop-blur-sm transition-transform active:scale-90 ${
                isWishlisted
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/90 text-gray-700 hover:text-rose-500 hover:bg-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <span
              className="w-8 h-8 bg-white/90 text-gray-700 rounded-full flex items-center justify-center shadow-md hover:text-primary-700 hover:bg-white backdrop-blur-sm transition-transform active:scale-90"
              title="Quick preview"
            >
              <Eye className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3.5 sm:p-4 flex flex-col flex-1">
          <p className="text-[11px] text-primary-600 font-semibold uppercase tracking-wider capitalize mb-1">
            {product.subcategory || product.category}
          </p>
          <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-1 mb-1 group-hover:text-primary-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-1">
            {product.description}
          </p>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1 mb-2.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-gray-700">{product.rating.toFixed(1)}</span>
              {product.reviewCount > 0 && (
                <span className="text-[11px] text-gray-400">({product.reviewCount})</span>
              )}
            </div>
          )}

          {/* Price row */}
          <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-gray-100">
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
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 shadow-sm ${
                !product.isAvailable || product.stock === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : isAdding
                  ? 'bg-emerald-600 text-white'
                  : inCart
                  ? 'bg-primary-100 text-primary-800 hover:bg-primary-200'
                  : 'bg-primary-700 text-white hover:bg-primary-800'
              }`}
            >
              {isAdding ? (
                <>
                  <Check className="w-3.5 h-3.5 animate-bounce" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{!product.isAvailable || product.stock === 0 ? 'N/A' : inCart ? 'Add +' : 'Add'}</span>
                </>
              )}
            </button>
          </div>

          {/* Dynamic Low Stock Warning */}
          {product.isAvailable && product.stock > 0 && product.stock <= 10 && (
            <div className="mt-2 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-medium inline-block w-fit">
               Only {product.stock} units remaining
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
