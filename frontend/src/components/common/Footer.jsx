import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin, Share2, Globe, Send, Shield, Truck, Star } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black">
                <span className="text-primary-400">Fresh</span>
                <span className="text-orange-400">Basket</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Your trusted marketplace for farm-fresh fruits, vegetables and flowers.
              Sourced directly from farms, delivered to your door.
            </p>

            {/* Trust badges */}
            <div className="space-y-2 mb-5">
              {[
                { icon: Shield, text: 'Quality Assured', color: 'text-green-400' },
                { icon: Truck, text: 'Free Delivery on Rs. 499+', color: 'text-blue-400' },
                { icon: Star, text: '50K+ Happy Customers', color: 'text-yellow-400' },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-2 text-xs text-gray-400">
                  <b.icon className={`w-3.5 h-3.5 ${b.color} flex-shrink-0`} />
                  {b.text}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-2">
              {[Share2, Globe, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-primary-600 hover:to-emerald-600 hover:scale-110 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Shop</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: '/fruits', label: 'Fresh Fruits' },
                { to: '/vegetables', label: 'Vegetables' },
                { to: '/flowers', label: 'Flowers' },
                { to: '/catalog', label: 'All Products' },
                { to: '/catalog?featured=true', label: 'Featured Items' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-primary-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Information</h3>
            <ul className="space-y-2.5 text-sm">
              {['About Us', 'Our Farms', 'Quality Promise', 'Delivery Policy', 'Return Policy', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-primary-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-primary-400" />
                </div>
                <span className="leading-snug">Bangalore, Karnataka 560100</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-primary-400" />
                </div>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 text-primary-400" />
                </div>
                <span>hello@freshbasket.in</span>
              </li>
            </ul>

            <div className="mt-5 p-4 bg-gradient-to-br from-gray-800 to-gray-800/60 rounded-2xl border border-gray-700/50">
              <p className="text-green-400 font-bold text-xs uppercase tracking-wider mb-2">Delivery Hours</p>
              <div className="space-y-1 text-xs text-gray-400">
                <p>Mon - Sat: 7:00 AM to 9:00 PM</p>
                <p>Sunday: 8:00 AM to 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} FreshBasket. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <span className="text-rose-500 font-bold">love</span>
            <span>for fresh food lovers in Bangalore</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
