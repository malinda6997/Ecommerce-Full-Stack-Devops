import { useState } from "react";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Plus, Edit, Trash2 } from "lucide-react";

const initialCategories = [
  {
    id: 1,
    name: "Apple",
    slug: "apple",
    products: 12,
    description: "Apple iPhones",
  },
  {
    id: 2,
    name: "Samsung",
    slug: "samsung",
    products: 15,
    description: "Samsung Galaxy series",
  },
  {
    id: 3,
    name: "Google",
    slug: "google",
    products: 8,
    description: "Google Pixel phones",
  },
  {
    id: 4,
    name: "OnePlus",
    slug: "oneplus",
    products: 7,
    description: "OnePlus smartphones",
  },
  {
    id: 5,
    name: "Xiaomi",
    slug: "xiaomi",
    products: 10,
    description: "Xiaomi phones",
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-gray-500">Manage product categories</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-gray-500">
                    {category.slug}
                  </TableCell>
                  <TableCell>{category.products}</TableCell>
                  <TableCell className="text-gray-500">
                    {category.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
