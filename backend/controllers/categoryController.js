import { ObjectId } from "mongodb";
import { getDB } from "../config/database.js";

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const db = getDB();
    const categories = await db.collection("categories").find({}).toArray();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create category (Admin only)
export const createCategory = async (req, res) => {
  try {
    const db = getDB();
    const { name, description, image } = req.body;

    const categoryData = {
      name,
      description,
      image,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("categories").insertOne(categoryData);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: { _id: result.insertedId, ...categoryData },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update category (Admin only)
export const updateCategory = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const updateData = {
      ...req.body,
      updatedAt: new Date(),
    };

    const result = await db
      .collection("categories")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { returnDocument: "after" }
      );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete category (Admin only)
export const deleteCategory = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const result = await db
      .collection("categories")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
