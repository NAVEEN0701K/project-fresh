import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Leaf, Eye, EyeOff, Gift, Zap, Users, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const WHY_JOIN = [
  { icon: Gift, title: 'Exclusive Deals', desc: 'Members-only offers and early access to sales' },
  { icon: Zap, title: 'Express Delivery', desc: 'Priority same-day delivery for registered users' },
  { icon: Users, title: 'Loyalty Rewards', desc: 'Earn points on every purchase you make' },
  { icon: CheckCircle, title: 'Order Tracking', desc: 'Real-time updates on your farm-fresh orders' },
];

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      addToast('Please fill in all fields', 'error');
      return;
    }
    if (password.length < 6) {
      addToast('Password must be at least 6 characters long', 'error');
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    setLoading(false);
    if (error) {
      addToast(error.message, 'error');
    } else {
      addToast('Account created! Welcome to FreshBasket!', 'success');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-row-reverse">
      {/* ===== RIGHT PANEL: Why Join ===== */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden flex-col items-center justify-center p-10"
        style={{ background: 'linear-gradient(135deg, #064e3b 0%, #15803d 50%, #059669 100%)' }}
      >
        {/* Orbs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/8 rounded-full blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute -bottom-10 left-0 w-56 h-56 bg-emerald-200/15 rounded-full blur-3xl animate-float pointer-events-none" />
        <div
          className="absolute inset-0 opacity-8 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />

        <div className="relative z-10 max-w-xs text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center ring-2 ring-white/30">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-black text-white" style={{ fontFamily: "'Poppins',sans-serif" }}>
              Fresh<span className="text-green-300">Basket</span>
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-white mb-2">Why Join Us?</h2>
          <p className="text-white/65 text-sm mb-8">Create a free account and unlock incredible benefits</p>

          <div className="space-y-4">
            {WHY_JOIN.map((item, i) => (
              <div
                key={item.title}
                className="flex items-start gap-3 text-left bg-white/12 backdrop-blur border border-white/20 rounded-2xl p-3.5 animate-slide-up"
                style={{ animationDelay: `${i * 0.1 + 0.2}s` }}
              >
                <div className="w-9 h-9 bg-green-400/25 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="w-4.5 h-4.5 text-green-200 w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{item.title}</p>
                  <p className="text-white/60 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="mt-8 bg-white/12 border border-white/20 backdrop-blur rounded-2xl px-5 py-3">
            <p className="text-white font-extrabold text-2xl">50,000+</p>
            <p className="text-white/65 text-xs">Happy members already shopping fresh</p>
          </div>
        </div>
      </div>

      {/* ===== LEFT PANEL: FORM ===== */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="w-full max-w-md animate-zoom-in">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 justify-center mb-6">
            <div className="w-10 h-10 bg-primary-700 rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-primary-700">Fresh<span className="text-orange-500">Basket</span></span>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sm:p-10">
            <div className="mb-7">
              <h2 className="text-2xl font-extrabold text-gray-900">Create Your Account</h2>
              <p className="text-gray-500 text-sm mt-1">Start shopping fresh fruits, veggies and flowers</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Naveen Kumar"
                    className="input-glow w-full pl-10 pr-4 py-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all"
                  />
                </div>
              </div>

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
                  Password (min. 6 characters)
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

              {/* Password strength bar */}
              {password.length > 0 && (
                <div>
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          password.length >= n * 2
                            ? password.length >= 8 ? 'bg-green-500' : 'bg-orange-400'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-400">
                    {password.length < 4 ? 'Too short' : password.length < 6 ? 'Weak' : password.length < 8 ? 'Fair' : 'Strong'}
                  </p>
                </div>
              )}

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
                    <span>Create Free Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-700 font-extrabold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
