import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useProductStore } from "../store/useProductStore.";
import ProductCard from "../product/ProductCard";

export default function CategoryPage() {
  const { category } = useParams();
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  //filtered products based on the selected category or display all products when no category selected
  const filteredByCategory = category
    ? products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      )
    : products;

  //filter products based on the search input
  const filteredProducts = filteredByCategory.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">
        {category ? `${category}` : "All products"}
        <div className="flex">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product...."
            className="bg-white px-4 py-2 rounded border border-gray-600"
          />
        </div>
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
