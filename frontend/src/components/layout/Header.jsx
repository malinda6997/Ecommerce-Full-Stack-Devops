import { Link } from "react-router-dom";
import { ShoppingCart, Menu, Search, X, User } from "lucide-react";
import Button from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";

const Header = () => {
  const { getCartItemsCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "Featured", href: "/categories?featured=true" },
  ];

  const handleAdminLogin = () => {
    // Open admin panel in new tab
    window.open("http://localhost:5174", "_blank");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-black">MobileShop</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="items-center hidden space-x-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-black transition-colors hover:text-gray-600"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleAdminLogin}
              title="Admin Login"
            >
              <User className="w-5 h-5" />
            </Button>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {getCartItemsCount() > 0 && (
                  <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-black rounded-full -top-1 -right-1">
                    {getCartItemsCount()}
                  </span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="bg-white border-t border-gray-200 md:hidden">
          <div className="px-4 py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block text-base font-medium text-black transition-colors hover:text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 space-y-3 border-t border-gray-200">
              <Button variant="ghost" className="justify-start w-full">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
              <Button
                variant="ghost"
                className="justify-start w-full"
                onClick={() => {
                  handleAdminLogin();
                  setMobileMenuOpen(false);
                }}
              >
                <User className="w-5 h-5 mr-2" />
                Admin Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
