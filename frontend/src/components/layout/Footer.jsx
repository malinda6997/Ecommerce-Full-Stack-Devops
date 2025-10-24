import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold text-black mb-4">MobileShop</h3>
            <p className="text-sm text-gray-600">
              Your trusted destination for the latest smartphones and mobile
              devices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-black mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/categories"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/categories?category=flagship"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Flagship
                </Link>
              </li>
              <li>
                <Link
                  to="/categories?category=mid-range"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Mid-Range
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-black mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-semibold text-black mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            © {currentYear} MobileShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
