import { useState } from "react";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";

const initialProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    category: "Apple",
    price: 1199,
    stock: 45,
    status: "Active",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    category: "Samsung",
    price: 1299,
    stock: 38,
    status: "Active",
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    category: "Google",
    price: 999,
    stock: 29,
    status: "Active",
  },
  {
    id: 4,
    name: "OnePlus 12",
    category: "OnePlus",
    price: 799,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: 5,
    name: "Xiaomi 14 Pro",
    category: "Xiaomi",
    price: 899,
    stock: 20,
    status: "Active",
  },
  {
    id: 6,
    name: "iPhone 14 Pro",
    category: "Apple",
    price: 999,
    stock: 32,
    status: "Active",
  },
  {
    id: 7,
    name: "Samsung Galaxy S23",
    category: "Samsung",
    price: 899,
    stock: 15,
    status: "Active",
  },
  {
    id: 8,
    name: "Google Pixel 7a",
    category: "Google",
    price: 499,
    stock: 52,
    status: "Active",
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.status === "Active" ? "success" : "warning"
                        }
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
