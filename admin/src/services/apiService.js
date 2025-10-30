import api from "./api";

export const authService = {
  // Login admin
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    if (response.data.success && response.data.data.token) {
      localStorage.setItem("adminToken", response.data.data.token);
      localStorage.setItem(
        "adminUser",
        JSON.stringify(response.data.data.user)
      );
      localStorage.setItem("isAuthenticated", "true");
    }
    return response.data;
  },

  // Get current admin profile
  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("isAuthenticated");
  },

  // Get current admin from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem("adminUser");
    return user ? JSON.parse(user) : null;
  },

  // Check if admin is authenticated
  isAuthenticated: () => {
    return (
      localStorage.getItem("isAuthenticated") === "true" &&
      !!localStorage.getItem("adminToken")
    );
  },
};

export const productService = {
  // Get all products
  getAllProducts: async (params = {}) => {
    const response = await api.get("/products", { params });
    return response.data;
  },

  // Get single product
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Create product
  createProduct: async (productData) => {
    const response = await api.post("/products", productData);
    return response.data;
  },

  // Update product
  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

export const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    const response = await api.get("/categories");
    return response.data;
  },

  // Create category
  createCategory: async (categoryData) => {
    const response = await api.post("/categories", categoryData);
    return response.data;
  },

  // Update category
  updateCategory: async (id, categoryData) => {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  },

  // Delete category
  deleteCategory: async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};

export const orderService = {
  // Get all orders
  getAllOrders: async (params = {}) => {
    const response = await api.get("/orders", { params });
    return response.data;
  },

  // Get single order
  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (id, statusData) => {
    const response = await api.put(`/orders/${id}/status`, statusData);
    return response.data;
  },
};

export const userService = {
  // Get all users
  getAllUsers: async () => {
    const response = await api.get("/users");
    return response.data;
  },

  // Get single user
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};
