import React, { useEffect, useState } from "react";

export default function ProductCard({ product }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);
  const [description, setDescription] = useState(product.description);

  useEffect(() => {
    setImage(product.image);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
  }, [product]);

  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition duration-200">
      <figure className="flex flex-col items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-48 h-48 object-cover"
        />
        <figcaption className="mt-2">
          <h1 className="text-lg font-semibold">{product.name}</h1>
          <p className="text-gray-700">${product.price}</p>
          <p className="text-gray-700">{product.description}</p>
        </figcaption>
      </figure>
    </div>
  );
}
