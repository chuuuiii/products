import { Request, Response, NextFunction } from "express";
import Product from "../models/product.model";
import mongoose from "mongoose";


export const getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 })
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    next(error)
  }
}

interface CreateProductBody {
  name: string;
  quantity: number;
  price: number;
  category: string;
  image: string;
  description: string
}

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, quantity, price, category, image, description } = req.body as CreateProductBody;

  if (!name || !quantity || !price || !category || !image || !description) {
    res.status(400).json({ success: false, message: 'Please provide all the details' });
    return;
  }

  try {
    const newProduct = new Product({ name, quantity, price, category, image, description });
    await newProduct.save();
    res.status(201).json({ success: true, message: 'Product created successfully', data: newProduct  })
  } catch (error) {
    next(error)
  }
};


export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const productData = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    const updateProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
    res.status(200).json({ success: true, message: 'Product updated successfully', data: updateProduct });
  } catch (error) {
    next(error)
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Product deleted successfully', data: deleteProduct });
  } catch (error) {
    next(error)
  }
};



