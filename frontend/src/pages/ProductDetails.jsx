import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShoppingCart,
  Heart,
  Star,
  Package,
  Plus,
  Minus,
  Shield,
  Truck,
  RefreshCw,
  Check,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatPrice';
import ProductCard from '../components/catalog/ProductCard';
import Loader from '../components/common/Loader';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, items, wishlist, toggleWishlist } = useCart();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const isWishlisted = wishlist?.includes(id);
  const inCart = items.some((i) => i._id === id);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      setQuantity(1);
      try {
        const res = await productService.getProductById(id);
        setProduct(res.data.data);
        setRelated(res.data.related || []);
        document.title = `${res.data.data.name}  FreshBasket`;
      } catch (err) {
        setError(err.response?.data?.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!product?.isAvailable) return;
    addToCart(product, quantity);
    setAddedFeedback(true);
    addToast(`Added ${quantity}  ${product.name} to cart!`, 'success');

    // Fire celebration confetti effect
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (e) {}

    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product._id);
    addToast(
      isWishlisted ? `Removed from wishlist` : `Added ${product.name} to wishlist `,
      'info'
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard!', 'info');
    }
  };

  const allImages = product ? [product.image, ...(product.images || [])].filter(Boolean) : [];
  const uniqueImages = [...new Set(allImages)];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Loader count={1} className="grid-cols-1" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-xl font-bold text-gray-700">{error || 'Product not found'}</p>
        <Link to="/catalog" className="mt-4 inline-block btn-primary px-6 py-3 rounded-xl">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary-700 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            to={`/${product.category}`}
            className="hover:text-primary-700 transition-colors capitalize"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-3">
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm relative group">
              <img
                src={uniqueImages[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-80 sm:h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=70';
                }}
              />
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-gray-700 hover:text-primary-700 hover:bg-white transition-all active:scale-90"
                title="Share product"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
            {uniqueImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {uniqueImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-primary-700 scale-105 shadow-sm'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold bg-primary-100 text-primary-800 px-3 py-1 rounded-full capitalize">
                {product.subcategory || product.category}
              </span>
              {product.isFeatured && (
                <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                   Featured Item
                </span>
              )}
              {product.isSeasonal && (
                <span className="text-xs font-bold bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                   Seasonal Harvest
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= Math.round(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-700">{product.rating.toFixed(1)}</span>
                {product.reviewCount > 0 && (
                  <span className="text-xs text-gray-400">({product.reviewCount} customer reviews)</span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-primary-700">
                {formatPrice(product.price)}
              </span>
              <span className="text-base text-gray-400 font-medium">/ {product.unit}</span>
              {discount > 0 && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                    -{discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Dynamic Total Price Calculator */}
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-600 font-medium">Total for {quantity} {product.unit}(s):</span>
              <span className="text-sm font-extrabold text-gray-900">
                {formatPrice(product.price * quantity)}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>

            {/* Stock indicator */}
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-400" />
              <span className="text-xs sm:text-sm">
                {product.isAvailable && product.stock > 0 ? (
                  <span>
                    <span className="text-emerald-600 font-bold">In Stock</span>
                    <span className="text-gray-500">
                      {' '}
                       {product.stock} {product.unit}s ready for dispatch
                    </span>
                  </span>
                ) : (
                  <span className="text-rose-600 font-bold">Currently Sold Out</span>
                )}
              </span>
            </div>

            {/* Quantity & Add to Cart Controls */}
            {product.isAvailable && product.stock > 0 && (
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {/* Quantity selector */}
                <div className="flex items-center border border-gray-200 rounded-2xl overflow-hidden w-fit shadow-sm bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 py-3 font-extrabold text-gray-900 min-w-[3.5rem] text-center border-x border-gray-100 text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-[.98] ${
                    addedFeedback
                      ? 'bg-emerald-600 text-white'
                      : 'bg-primary-700 text-white hover:bg-primary-800'
                  }`}
                >
                  {addedFeedback ? (
                    <>
                      <Check className="w-5 h-5 animate-bounce" />
                      <span>Added to Basket!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      <span>{inCart ? 'Add More to Cart' : 'Add to Cart'}</span>
                    </>
                  )}
                </button>

                {/* Wishlist toggle button */}
                <button
                  onClick={handleToggleWishlist}
                  title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                  className={`p-3.5 rounded-2xl border transition-all active:scale-95 shadow-sm ${
                    isWishlisted
                      ? 'bg-rose-50 border-rose-300 text-rose-500'
                      : 'border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-500 bg-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            )}

            {/* Assurance Perks */}
            <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-gray-100">
              {[
                { icon: Truck, label: 'Fast Delivery', sub: 'Express dispatch' },
                { icon: Shield, label: '100% Organic', sub: 'Verified farms' },
                { icon: RefreshCw, label: 'Fresh Return', sub: 'No questions asked' },
              ].map((b) => (
                <div
                  key={b.label}
                  className="text-center p-3 rounded-2xl bg-white border border-gray-100 shadow-sm"
                >
                  <div className="w-8 h-8 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                    <b.icon className="w-4 h-4 text-primary-700" />
                  </div>
                  <p className="text-xs font-bold text-gray-800">{b.label}</p>
                  <p className="text-[10px] text-gray-400">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Related Products */}
        {related.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                  Recommended For You
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Handpicked matching items from the {product.category} section
                </p>
              </div>
              <Link
                to={`/${product.category}`}
                className="text-xs sm:text-sm font-bold text-primary-700 hover:underline"
              >
                Explore all {product.category} 
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
