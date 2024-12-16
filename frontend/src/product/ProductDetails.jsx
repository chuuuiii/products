import React, { useEffect } from "react";
import { useProductStore } from "../store/useProductStore.";

const ProductDetails = () => {
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="mt-5 text-center">
      <h1 className="text-lg font-semibold">Product Details</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-gray-100">
            <tr>
              <th>No.</th>
              <th>Product name</th>
              <th>Quatity</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index} className="">
                  <td></td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td className="">
                    <button className="btn btn-info mr-3">Edit</button>
                    <button className="btn btn-warning">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500">
                  No available products
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetails;
