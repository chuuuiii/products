import React, { useEffect } from "react";
import { useProductStore } from "../store/useProductStore.";
import ProductCard from "../product/ProductCard";

const Home = () => {
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <div className="container mx-auto px-4 py-5 font-poppins text-center">
      <h1 className="text-lg font-semibold mb-4">All Products</h1>
      {products.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <>
          <p className="text-gray-500">No available products</p>
        </>
      )}
    </div>
  );
};

export default Home;
