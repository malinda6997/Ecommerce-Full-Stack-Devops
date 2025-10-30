import api from "./api";

export const productService = {
  // Get all products with filters
  getAllProducts: async (params = {}) => {
    const response = await api.get("/products", { params });
    return response.data;
  },

  // Get single product by ID
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Search products
  searchProducts: async (searchTerm) => {
    const response = await api.get("/products", {
      params: { search: searchTerm },
    });
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    const response = await api.get("/products", {
      params: { category },
    });
    return response.data;
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await api.get("/products", {
      params: { featured: true },
    });
    return response.data;
  },
};

export const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    const response = await api.get("/categories");
    return response.data;
  },
};

export const orderService = {
  // Create new order
  createOrder: async (orderData) => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },

  // Get user orders
  getUserOrders: async () => {
    const response = await api.get("/orders/my-orders");
    return response.data;
  },

  // Get order by ID
  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};

export const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    if (response.data.success && response.data.data.token) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    if (response.data.success && response.data.data.token) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};
