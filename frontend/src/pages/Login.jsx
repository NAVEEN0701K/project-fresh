import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Leaf, Eye, EyeOff, Sparkles, ShieldCheck, Truck, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const PERKS = [
  { icon: Leaf, text: '100% Organic & Fresh' },
  { icon: Truck, text: 'Free Delivery on orders above Rs. 499' },
  { icon: ShieldCheck, text: 'Quality Guaranteed on every product' },
  { icon: Star, text: 'Trusted by 50,000+ happy customers' },
];

const FLOAT_IMGS = [
  { src: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=160&q=70', style: { top: '8%', left: '10%', width: 90, animationDelay: '0s' } },
  { src: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=160&q=70', style: { top: '20%', right: '8%', width: 80, animationDelay: '1.2s' } },
  { src: 'https://images.unsplash.com/photo-1487530811015-780b680a3f74?w=160&q=70', style: { bottom: '22%', left: '6%', width: 85, animationDelay: '0.6s' } },
  { src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=160&q=70', style: { bottom: '10%', right: '10%', width: 75, animationDelay: '1.8s' } },
];

export default function Login() {
  const [email, setEmail] = useState('demo@freshbasket.in');
  const [password, setPassword] = useState('fresh123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please fill in all fields', 'error');
      return;
    }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      addToast(error.message, 'error');
    } else {
      addToast('Welcome to FreshBasket!', 'success');
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ===== LEFT PANEL ===== */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-fresh overflow-hidden flex-col items-center justify-center p-12">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        {/* Animated orbs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-56 h-56 bg-emerald-200/15 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />

        {/* Floating product images */}
        {FLOAT_IMGS.map((img, i) => (
          <div
            key={i}
            className="absolute rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/25"
            style={{ ...img.style, animation: `float 4s ease-in-out infinite`, animationDelay: img.style.animationDelay }}
          >
            <img src={img.src} alt="product" style={{ width: img.style.width, height: img.style.width }} className="object-cover" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 text-center max-w-xs">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center ring-2 ring-white/30">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-black text-white" style={{ fontFamily: "'Poppins',sans-serif" }}>
              Fresh<span className="text-green-300">Basket</span>
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-white mb-3 leading-tight">
            Farm-Fresh Goodness, Delivered to You
          </h2>
          <p className="text-white/70 text-sm mb-8 leading-relaxed">
            Join thousands of happy customers enjoying the freshest produce from certified organic farms.
          </p>

          {/* Perks */}
          <div className="space-y-3">
            {PERKS.map((p, i) => (
              <div
                key={p.text}
                className="flex items-center gap-3 bg-white/12 backdrop-blur rounded-xl px-4 py-2.5 border border-white/20 animate-slide-up"
                style={{ animationDelay: `${i * 0.1 + 0.2}s` }}
              >
                <div className="w-8 h-8 bg-green-400/25 rounded-lg flex items-center justify-center flex-shrink-0">
                  <p.icon className="w-4 h-4 text-green-200" />
                </div>
                <span className="text-white/90 text-xs font-medium text-left">{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== RIGHT PANEL: FORM ===== */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="w-full max-w-md animate-zoom-in">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 justify-center mb-6">
            <div className="w-10 h-10 bg-primary-700 rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-primary-700">Fresh<span className="text-orange-500">Basket</span></span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sm:p-10">
            <div className="mb-7">
              <h2 className="text-2xl font-extrabold text-gray-900">Welcome Back!</h2>
              <p className="text-gray-500 text-sm mt-1">Sign in to your FreshBasket account</p>
            </div>

            {/* Demo pill */}
            <div className="mb-6 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl flex items-center justify-between text-xs text-green-900">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>Demo credentials are pre-filled!</span>
              </div>
              <span className="font-bold text-[10px] bg-green-200 text-green-800 px-2 py-0.5 rounded-full whitespace-nowrap">
                Static Mode
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="input-glow w-full pl-10 pr-4 py-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-glow w-full pl-10 pr-11 py-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-shine w-full bg-gradient-to-r from-primary-700 to-emerald-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-[.98] disabled:opacity-50 text-sm flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <span>Sign In to FreshBasket</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-6">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-primary-700 font-extrabold hover:underline">
                Create one free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
