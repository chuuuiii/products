import { model, Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  quantity: number;
  price: number;
  category: string;
  image: string;
  description: string;
  // isActive?: boolean;
  createdAt: Date;
  updatedAt: Date
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name required'],
    trim: true,
    minlength: [2, 'Product name must be at least 2 characters long'],
    maxlength: [100, 'Product name cannot exceed 100 characters'],
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity required'],
    min: [0, 'Quantity cannot be less than 0'],
    max: [10000, 'Quantity cannot exceed 10,000'],
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'Product price required'],
    min: [0, 'Price cannot be less than 0'],
    max: [1000000, 'Price is too high'],
    default: 0
  },
  category: {
    type: String,
    required: [true, 'Product category required'],
  },
  image: {
    type: String,
    required: [true, 'Image URL required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  }
}, { timestamps: true });

// // method to check if product is active 
// productSchema.methods.isProductActive = function() {
//   return this.active;
// }

// //method to find active products
// productSchema.statics.findActiveProducts = function() {
//   return this.find({ isActive: true })
// }

export default model<IProduct>('Product', productSchema);