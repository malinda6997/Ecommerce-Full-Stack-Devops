import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { productService, categoryService } from "@/services/apiService";
import { ArrowRight, Star } from "lucide-react";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productService.getFeaturedProducts(),
          categoryService.getAllCategories(),
        ]);

        setFeaturedProducts(productsData.data.slice(0, 6));
        setCategories(categoriesData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1920&q=80"
            alt="Mobile phones background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
              Discover Your Perfect
              <span className="block mt-2 bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent animate-fade-in-up-delay-1">
                Mobile Device
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl animate-fade-in-up-delay-2">
              Explore the latest smartphones from top brands. Premium quality,
              competitive prices, and unbeatable deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up-delay-3">
              <Link to="/categories">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-black text-white hover:bg-black/90 transition-all transform hover:scale-105"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/categories?featured=true">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-black bg-black text-white hover:bg-black/80 transition-all transform hover:scale-105"
                >
                  Featured Products
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
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
            {loading ? (
              <div className="text-center py-8">Loading categories...</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    to={`/categories?category=${category.name}`}
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
            )}
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

          {loading ? (
            <div className="text-center py-8">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`}>
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
                        {product.stock === 0 && (
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
                          {product.category}
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
                          <Button size="sm" disabled={product.stock === 0}>
                            {product.stock > 0
                              ? "View Details"
                              : "Out of Stock"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

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
