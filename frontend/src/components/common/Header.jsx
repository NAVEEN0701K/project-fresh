import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Leaf, Search, Heart, Sparkles, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { productService } from '../../services/productService';
import { formatPrice } from '../../utils/formatPrice';

export default function Header() {
  const { cartCount, toggleCart, wishlist } = useCart();
  const { user, signOut } = useAuth();
  const { addToast } = useToast();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/fruits', label: 'Fruits' },
    { to: '/vegetables', label: 'Vegetables' },
    { to: '/flowers', label: 'Flowers' },
    { to: '/catalog', label: 'All Products' },
  ];

  // Dynamic live search debounce
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await productService.getProducts({ search: searchQuery.trim(), limit: 4 });
        setSuggestions(res.data.data || []);
      } catch (err) {
        setSuggestions([]);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setUserDropdownOpen(false);
    addToast('Signed out successfully', 'info');
    navigate('/login');
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    return user.fullName || user.email?.split('@')[0] || 'User';
  };

  return (
    <header className="bg-white/97 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-gray-100/80">
      {/* Scrolling Ticker */}
      <div className="bg-gradient-to-r from-primary-900 via-emerald-900 to-primary-900 text-white text-[11px] py-1.5 overflow-hidden relative">
        <div className="ticker-track">
          {[
            'Use coupon FRESH10 for 10% OFF',
            'Free delivery on orders above Rs. 499',
            'Use SAVE20 for 20% OFF orders above Rs. 999',
            'Fresh organic produce daily',
            'Bangalore same-day delivery available',
            'Quality guaranteed on every order',
            'Use coupon FRESH10 for 10% OFF',
            'Free delivery on orders above Rs. 499',
            'Use SAVE20 for 20% OFF orders above Rs. 999',
            'Fresh organic produce daily',
            'Bangalore same-day delivery available',
            'Quality guaranteed on every order',
          ].map((msg, i) => (
            <span key={i} className="inline-flex items-center gap-2 mx-6 font-medium whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-orange-400 flex-shrink-0" />
              {msg}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-9 h-9 bg-primary-700 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-black text-primary-700">Fresh</span>
              <span className="text-xl font-black text-accent">Basket</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-primary-100 text-primary-800'
                      : 'text-gray-600 hover:text-primary-700 hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Live Search */}
          <div ref={searchRef} className="hidden md:block flex-1 max-w-xs lg:max-w-sm relative">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                placeholder="Search fruits, veg, flowers..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:bg-white transition-all"
              />
            </form>

            {/* Instant Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                <div className="p-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Products ({suggestions.length})
                </div>
                {suggestions.map((p) => (
                  <Link
                    key={p._id}
                    to={`/product/${p._id}`}
                    onClick={() => {
                      setShowSuggestions(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-3 p-2.5 hover:bg-gray-50 transition-colors border-t border-gray-50"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">{p.name}</p>
                      <p className="text-[11px] text-gray-400 capitalize">{p.category}</p>
                    </div>
                    <span className="text-xs font-black text-primary-700">
                      {formatPrice(p.price)}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Wishlist Icon */}
            <Link
              to="/catalog"
              className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
              title="Saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlist?.length > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <button
              onClick={toggleCart}
              className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 active:scale-95"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary-700 text-white text-[10px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Sign Out Pill */}
            {user ? (
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-3 rounded-2xl hover:bg-gray-100 transition-all border border-gray-200 text-xs font-bold text-gray-800"
                >
                  <span className="max-w-[90px] truncate">{getUserDisplayName()}</span>
                  <div className="w-7 h-7 bg-primary-700 text-white rounded-xl flex items-center justify-center font-bold text-xs uppercase">
                    {getUserDisplayName()[0]}
                  </div>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-gray-900 truncate">{getUserDisplayName()}</p>
                      <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 font-bold flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3.5 py-2 text-xs font-bold bg-primary-700 text-white rounded-xl hover:bg-primary-800 shadow-xs transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search farm fresh items..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
          </form>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 animate-fade-in shadow-lg">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                    isActive ? 'bg-primary-100 text-primary-800' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {user ? (
              <div className="pt-3 mt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Signed in as <strong>{getUserDisplayName()}</strong></p>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left py-2 text-xs font-bold text-rose-600"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-3 mt-2 border-t border-gray-100">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center py-2 text-xs font-bold text-white bg-primary-700 rounded-xl"
                >
                  Sign In
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
