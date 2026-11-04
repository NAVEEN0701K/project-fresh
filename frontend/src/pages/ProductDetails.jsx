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
  MapPin,
  Clock,
  Sparkles,
  Award,
  Zap,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatPrice';
import ProductImageGallery from '../components/catalog/ProductImageGallery';
import ProductSlider from '../components/catalog/ProductSlider';
import Loader from '../components/common/Loader';
import { productsData } from '../data/products';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, items, wishlist, toggleWishlist } = useCart();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [morePicks, setMorePicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Delivery check state
  const [pincode, setPincode] = useState('560100');
  const [pincodeStatus, setPincodeStatus] = useState({
    checked: true,
    available: true,
    message: 'Express delivery available in Bangalore (560100)',
    time: 'Tomorrow, 7:00 AM – 9:00 AM',
  });

  const isWishlisted = product ? wishlist?.includes(product._id) : false;
  const inCart = product ? items.some((i) => i._id === product._id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setQuantity(1);
      try {
        const res = await productService.getProductById(id);
        if (res?.data?.data) {
          setProduct(res.data.data);
          setRelated(res.data.related || []);
          document.title = `${res.data.data.name} — FreshBasket`;
        } else {
          throw new Error('No product data');
        }
      } catch (err) {
        console.warn('Product fetch error, fallback to catalog:', err);
        const fallback = productsData.find((p) => p._id === id) || productsData[0];
        setProduct(fallback);
        setRelated(productsData.filter((p) => p.category === fallback.category && p._id !== fallback._id).slice(0, 8));
        document.title = `${fallback.name} — FreshBasket`;
      } finally {
        // Cross-category recommendations for the bottom slider
        const crossPicks = productsData.filter((p) => p._id !== id).slice(0, 8);
        setMorePicks(crossPicks);
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleAddToCart = () => {
    if (!product?.isAvailable) return;
    addToCart(product, quantity);
    setAddedFeedback(true);
    addToast(`Added ${quantity} × ${product.name} to cart!`, 'success');

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.65 },
      });
    } catch (e) {}

    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    toggleWishlist(product._id);
    addToast(
      isWishlisted ? `Removed from wishlist` : `Added ${product.name} to wishlist`,
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

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.trim().length === 6) {
      setPincodeStatus({
        checked: true,
        available: true,
        message: `Delivery available for ${pincode}`,
        time: 'Tomorrow, 7:00 AM – 9:00 AM',
      });
      addToast(`Delivery available for ${pincode}!`, 'success');
    } else {
      setPincodeStatus({
        checked: true,
        available: false,
        message: 'Please enter a valid 6-digit pincode',
        time: '',
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Loader count={1} className="grid-cols-1" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-xl font-bold text-gray-800">Product not found</p>
        <Link to="/catalog" className="mt-4 inline-block btn-primary px-6 py-3 rounded-2xl">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const allImages = [product.image, ...(product.images || [])].filter(Boolean);
  const uniqueImages = [...new Set(allImages)];

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <div className="min-h-screen" style={{ background: '#F0FAF4' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-primary-700 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            to={`/${product.category}`}
            className="hover:text-primary-700 transition-colors capitalize font-medium"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Stage: 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Interactive Product Image Gallery & Swiper */}
          <div className="lg:col-span-6 sticky top-24">
            <ProductImageGallery
              images={uniqueImages}
              productName={product.name}
              discount={discount}
              isSeasonal={product.isSeasonal}
              isFeatured={product.isFeatured}
              onShare={handleShare}
            />

            {/* Farm Fresh Guarantee Ribbon under Gallery */}
            <div className="mt-4 bg-white/80 backdrop-blur rounded-2xl p-4 border border-emerald-100 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">100% Farm-Fresh Guarantee</p>
                  <p className="text-[11px] text-gray-500">
                    Not satisfied with freshness? Instant replacement or refund.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full whitespace-nowrap">
                Verified Fresh
              </span>
            </div>
          </div>

          {/* Right Column: Product Info & Purchasing Controls */}
          <div className="lg:col-span-6 space-y-6">
            {/* Category, Badges, Origin */}
            <div>
              <div className="flex flex-wrap gap-2 items-center mb-3">
                <span className="text-xs font-bold bg-primary-100 text-primary-800 px-3 py-1 rounded-full capitalize">
                  {product.subcategory || product.category}
                </span>
                {product.origin && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-full">
                    <MapPin className="w-3 h-3 text-primary-600" />
                    {product.origin}
                  </span>
                )}
                {product.harvested && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    {product.harvested}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Review Counter */}
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-gray-800">
                    {product.rating ? product.rating.toFixed(1) : '4.8'}
                  </span>
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {product.reviewCount || 180}+ verified farm reviews
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> High in demand
                </span>
              </div>
            </div>

            {/* Price Row */}
            <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-black text-primary-700 tracking-tight">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm font-semibold text-gray-500">/ per {product.unit}</span>
                {discount > 0 && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-rose-500 text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow-xs">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Inclusive of all taxes • Sourced direct from verified farmers
              </p>

              {/* Total Price Calculator for Selected Quantity */}
              <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-600 font-semibold">
                  Subtotal for <strong>{quantity} {product.unit}(s)</strong>:
                </span>
                <span className="text-base font-black text-gray-900">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            </div>

            {/* Quantity Selector & Add to Cart Action Buttons */}
            {product.isAvailable && product.stock > 0 ? (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border-2 border-gray-200 rounded-2xl overflow-hidden shadow-xs bg-white w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3.5 hover:bg-gray-100 transition-colors text-gray-700 active:scale-95"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-5 py-3.5 font-black text-gray-900 min-w-[3.5rem] text-center text-sm border-x border-gray-100">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-3.5 hover:bg-gray-100 transition-colors text-gray-700 active:scale-95"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Basket button with shine */}
                  <button
                    onClick={handleAddToCart}
                    className={`btn-shine flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl font-bold text-sm shadow-lg transition-all duration-300 active:scale-[.98] ${
                      addedFeedback
                        ? 'bg-emerald-600 text-white scale-102'
                        : 'bg-gradient-to-r from-primary-700 to-emerald-600 text-white hover:shadow-xl hover:-translate-y-0.5'
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
                        <span>{inCart ? 'Add More to Basket' : 'Add to Basket'}</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={handleToggleWishlist}
                    title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                    className={`p-3.5 rounded-2xl border-2 transition-all active:scale-95 shadow-xs flex items-center justify-center ${
                      isWishlisted
                        ? 'bg-rose-50 border-rose-300 text-rose-500 scale-105'
                        : 'border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-500 bg-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Stock indicator */}
                <div className="flex items-center justify-between text-xs pt-1 px-1">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>In Stock ({product.stock} {product.unit}s available)</span>
                  </div>
                  {product.stock <= 15 && (
                    <span className="text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-md">
                      Selling fast!
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-center">
                <p className="text-sm font-bold text-rose-700">Currently Out of Stock</p>
                <p className="text-xs text-rose-500 mt-0.5">Fresh harvest expected tomorrow morning</p>
              </div>
            )}

            {/* Delivery Pincode Checker */}
            <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-primary-700" />
                  Delivery Check
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Free over Rs. 499
                </span>
              </div>

              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  className="input-glow flex-1 px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white"
                />
                <button
                  type="submit"
                  className="bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap shadow-xs"
                >
                  Check
                </button>
              </form>

              {pincodeStatus.checked && (
                <div className="text-xs text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200/80 space-y-0.5">
                  <p className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {pincodeStatus.message}
                  </p>
                  {pincodeStatus.time && (
                    <p className="text-[11px] text-emerald-700 pl-5">
                      Estimated delivery: <strong>{pincodeStatus.time}</strong>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Assurance Icons Grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, title: 'Same-Day Dispatch', sub: 'Ordered before 2 PM' },
                { icon: Shield, title: 'Quality Checked', sub: '3-tier grading' },
                { icon: RefreshCw, title: 'Easy Returns', sub: 'At door, no questions' },
              ].map((b) => (
                <div
                  key={b.title}
                  className="bg-white rounded-2xl p-3 text-center border border-gray-100 shadow-xs"
                >
                  <b.icon className="w-5 h-5 text-primary-700 mx-auto mb-1.5" />
                  <p className="text-xs font-bold text-gray-900">{b.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabbed Product Information Section */}
        <section className="mt-14 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
          {/* Tabs header */}
          <div className="flex border-b border-gray-100 gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
            {[
              { id: 'overview', label: 'Description & Highlights' },
              { id: 'farm', label: 'Farm Origin & Freshness' },
              { id: 'nutrition', label: 'Nutrition & Storage' },
              { id: 'reviews', label: `Reviews (${product.reviewCount || 180})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-primary-700 border-b-2 border-primary-700'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab contents */}
          <div className="pt-6">
            {activeTab === 'overview' && (
              <div className="space-y-4 max-w-3xl">
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {product.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-gray-900">Zero Artificial Ripening</p>
                      <p className="text-[11px] text-gray-500">Naturally ripened on tree/vine</p>
                    </div>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-gray-900">Grade-A Quality</p>
                      <p className="text-[11px] text-gray-500">Individually sorted & inspected</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'farm' && (
              <div className="space-y-4 max-w-3xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                    <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                      Source Region
                    </p>
                    <p className="text-base font-black text-gray-900">
                      {product.origin || 'Certified Organic Partner Farms'}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Direct partnership with local farming clusters ensuring fair prices to farmers.
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                    <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                      Harvest Time
                    </p>
                    <p className="text-base font-black text-gray-900">
                      {product.harvested || 'Freshly picked within 24 hours'}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Stored in temperature-controlled chambers until dispatch.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="space-y-4 max-w-3xl">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {product.nutrition ? (
                    Object.entries(product.nutrition).map(([k, v]) => (
                      <div
                        key={k}
                        className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-center"
                      >
                        <p className="text-[11px] font-semibold text-gray-400 capitalize">{k}</p>
                        <p className="text-sm font-extrabold text-gray-900 mt-0.5">{v}</p>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                        <p className="text-[11px] font-semibold text-gray-400">Calories</p>
                        <p className="text-sm font-extrabold text-gray-900 mt-0.5">Natural</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                        <p className="text-[11px] font-semibold text-gray-400">Purity</p>
                        <p className="text-sm font-extrabold text-gray-900 mt-0.5">100%</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900">
                  <strong>Storage Tip:</strong> Store in a cool, dry place or refrigerate to preserve freshness and crispness for {product.shelfLife || '5-7 days'}.
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-center">
                    <p className="text-4xl font-black text-gray-900">
                      {product.rating ? product.rating.toFixed(1) : '4.8'}
                    </p>
                    <div className="flex justify-center gap-0.5 mt-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">Overall Rating</p>
                  </div>
                  <div className="flex-1 border-l border-gray-200 pl-6 space-y-1.5 text-xs">
                    <p className="text-gray-700"><strong>98%</strong> of customers would buy this again</p>
                    <p className="text-gray-700"><strong>100%</strong> confirmed freshness on arrival</p>
                    <p className="text-gray-500 text-[11px]">Bangalore verified buyer reviews</p>
                  </div>
                </div>

                {/* Sample Review Comments */}
                <div className="space-y-3 pt-2">
                  {[
                    {
                      user: 'Deepak S.',
                      rating: 5,
                      date: '2 days ago',
                      comment: 'Extremely fresh and delivered right on time in Bangalore! Packaging was top-notch.',
                    },
                    {
                      user: 'Pooja R.',
                      rating: 5,
                      date: 'Last week',
                      comment: 'Much better quality than supermarkets. The taste and fragrance are authentic farm-fresh.',
                    },
                  ].map((rev, i) => (
                    <div key={i} className="p-3.5 rounded-2xl border border-gray-100 bg-white shadow-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-gray-900">{rev.user}</span>
                        <span className="text-[10px] text-gray-400">{rev.date}</span>
                      </div>
                      <div className="flex gap-0.5 mb-1.5">
                        {[...Array(rev.rating)].map((_, s) => (
                          <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ===== PRODUCT CAROUSEL / SLIDER #1: Matching Category Items ===== */}
        {related.length > 0 && (
          <ProductSlider
            products={related}
            title={`More Fresh ${product.category?.toUpperCase() || 'RECOMMENDATIONS'}`}
            subtitle="Browse more popular items from the same farm section"
            badge="Category Picks"
            autoPlay={true}
            autoPlayInterval={3500}
          />
        )}

        {/* ===== PRODUCT CAROUSEL / SLIDER #2: Customers Also Loved (Moving Swiper) ===== */}
        {morePicks.length > 0 && (
          <ProductSlider
            products={morePicks}
            title="Customers Also Purchased"
            subtitle="Trending seasonal picks moving fast today"
            badge="Top Trending"
            autoPlay={true}
            autoPlayInterval={4200}
          />
        )}
      </div>
    </div>
  );
}
