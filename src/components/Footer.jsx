import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">

        {/* Logo / About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">🛒 C2CMarketPlace</h2>
          <p className="text-sm">
            Buy and sell products easily.|| तपाईहहरुले यस C2C MarketPlace मा 
            आफना second hand सामान  साजिलै बेच्न र किन्न सक्नुहुन्छ।
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
          <ul className="space-y-2">
            <li><Link to="/category" className="hover:text-white">📱 Mobile</Link></li>
            <li><Link to="/category" className="hover:text-white">💻 Electronics</Link></li>
            <li><Link to="/category" className="hover:text-white">🏍️ Vehicles</Link></li>
            <li><Link to="/category" className="hover:text-white">👕 Fashion</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/register" className="hover:text-white">Register</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p>Email: support@mymarket.com</p>
          <p>Phone: +977 9800000000</p>

          {/* Social */}
          <div className="flex gap-4 mt-3 text-xl">
            <a href="#" className="hover:text-white">🌐</a>
            <a href="#" className="hover:text-white">📘</a>
            <a href="#" className="hover:text-white">📸</a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} C2CMarketPlace. All rights reserved.
      </div>
    </footer>
  );
}