import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Leaf, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

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
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-bg">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-10">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-3 group">
            <div className="w-10 h-10 bg-primary-700 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-primary-700">Fresh<span className="text-accent">Basket</span></span>
          </Link>
          <h2 className="text-2xl font-extrabold text-gray-900">Sign In</h2>
          <p className="text-xs text-gray-500 mt-1">Sign in to access our farm-fresh catalog</p>
        </div>

        {/* Demo Credentials Quick Pill */}
        <div className="mb-6 p-3 bg-primary-50 border border-primary-200/80 rounded-2xl flex items-center justify-between text-xs text-primary-900">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary-600 flex-shrink-0" />
            <span>
              Pre-filled demo credentials ready!
            </span>
          </div>
          <span className="font-bold text-[10px] bg-primary-200 text-primary-800 px-2 py-0.5 rounded-full">
            Static Mode
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white transition-all"
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
                className="w-full pl-10 pr-10 py-3 text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-700 text-white font-bold py-3.5 rounded-2xl shadow-md hover:bg-primary-800 transition-all active:scale-[.98] disabled:opacity-50 text-sm flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <span>Sign In to Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer switch */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-primary-700 font-extrabold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
