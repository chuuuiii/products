import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useProductStore } from "../store/useProductStore.";
import ProductCard from "../product/ProductCard";

export default function CategoryPage() {
  const { category } = useParams();
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  //filtered products based on the selected category or display all products when no category selected
  const filteredProducts = category
    ? products.filter(
        (products) => products.category.toLowerCase() === category.toLowerCase()
      )
    : products;

  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">
        {category ? `${category}` : "All products"}
      </h1>
      {filteredProducts.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <p>No available products</p>
      )}
    </div>
  );
}
