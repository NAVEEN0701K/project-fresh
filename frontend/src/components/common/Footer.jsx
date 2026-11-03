import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin, Share2, Globe, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary-700 rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-primary-400">Fresh</span>
                <span className="text-accent">Basket</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted marketplace for farm-fresh fruits, vegetables and flowers. Sourced directly from farms, delivered to your door.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/fruits', label: 'Fresh Fruits' },
                { to: '/vegetables', label: 'Vegetables' },
                { to: '/flowers', label: 'Flowers' },
                { to: '/catalog', label: 'All Products' },
                { to: '/catalog?featured=true', label: 'Featured Items' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Our Farms', 'Quality Promise', 'Delivery Policy', 'Return Policy', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-primary-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <span>Bangalore, Karnataka 560100</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>hello@freshbasket.in</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-gray-800 rounded-xl text-xs">
              <p className="text-green-400 font-medium"> Delivery Hours</p>
              <p className="text-gray-400 mt-1">MonSat: 7 AM  9 PM</p>
              <p className="text-gray-400">Sun: 8 AM  6 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p> {new Date().getFullYear()} FreshBasket. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <span className="text-red-400"></span>
            <span>for fresh food lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
