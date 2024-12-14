// import Product from "../models/product.model"


// export class ProductService {
//   async findAll() {
//     return await Product.find({}).sort({ createdAt: -1 })
//   }

//   async create(data: ProductData) {
//     const newProduct = new Product(data);
//     return await newProduct.save();
//   }

//   async update(id: string, data: Partial<ProductData>) {
//     return await Product.findByIdAndUpdate(id, data, { new: true });
//   }

//   async delete(id: string) {
//     return await Product.findByIdAndDelete(id)
//   }
// };

