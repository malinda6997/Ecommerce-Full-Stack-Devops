import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products, categories } from "@/data/products";
import { ArrowRight, Star } from "lucide-react";

const HomePage = () => {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
              Discover Your Perfect
              <span className="block mt-2">Mobile Device</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore the latest smartphones from top brands. Premium quality,
              competitive prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/categories">
                <Button size="lg" className="w-full sm:w-auto">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/categories?featured=true">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Featured Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600">Find your perfect device</p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl">
              {categories.slice(1).map((category) => (
                <Link
                  key={category.id}
                  to={`/categories?category=${category.id}`}
                  className="group"
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-semibold text-black mb-1 group-hover:underline">
                        {category.name}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600">Handpicked for you</p>
            </div>
            <Link to="/categories?featured=true" className="hidden md:block">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="group hover:shadow-xl transition-shadow h-full">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.featured && (
                        <Badge className="absolute top-3 left-3">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Featured
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge
                          variant="secondary"
                          className="absolute top-3 right-3"
                        >
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-600 mb-1">
                        {product.brand}
                      </p>
                      <h3 className="font-semibold text-black mb-2 group-hover:underline">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-black">
                          ${product.price}
                        </span>
                        <Button size="sm" disabled={!product.inStock}>
                          {product.inStock ? "View Details" : "Out of Stock"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/categories?featured=true">
              <Button variant="outline" className="w-full sm:w-auto">
                View All Featured
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Why Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-lg text-black mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Only authentic devices from authorized distributors
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-lg text-black mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Free shipping on all orders with express delivery options
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-lg text-black mb-2">
                Warranty Support
              </h3>
              <p className="text-gray-600">
                Full manufacturer warranty with dedicated customer support
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
