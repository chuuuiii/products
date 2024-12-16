import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore.";
import Modal from "react-modal";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openUpdateModal = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { success, message } = await updateProduct(
      currentProduct._id,
      currentProduct
    );
    if (success) {
      toast.success(message);
      closeUpdateModal();
    } else {
      toast.error(message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { success, message } = await deleteProduct(id);
      if (!success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Failed to delete, Try again");
    }
  };

  const handleChange = (e) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

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
                    <button
                      onClick={() => openUpdateModal(product)}
                      className="btn btn-info mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-warning"
                    >
                      Delete
                    </button>
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

      {/* update modal  */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeUpdateModal}
        contentLabel="Update Product Modal"
        className="right-modal"
        overlayClassName="right-modal-overlay"
      >
        <h2 className="text-xl font-semibold mb-4">Update Product</h2>
        {currentProduct && (
          <form onSubmit={handleUpdate}>
            <label className="block mb-2">
              Product name:
              <input
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </label>
            <label className="block mb-2">
              Quantity:
              <input
                type="number"
                name="quantity"
                value={currentProduct.quantity}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </label>
            <label className="block mb-2">
              Price:
              <input
                type="number"
                name="price"
                value={currentProduct.price}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </label>
            <label className="block mb-2">
              Category:
              <select
                name="category"
                value={currentProduct.category}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select Category</option>
                <option value="Gadget">Gadget</option>
                <option value="Apparel">Apparel</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Appliances">Appliances</option>
                <option value="Shoes">Shoes</option>
              </select>
            </label>
            <label className="block mb-2">
              Image URL:
              <input
                type="text"
                name="image"
                value={currentProduct.image}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </label>
            <label className="block mb-2">
              Description:
              <textarea
                type="text"
                name="description"
                value={currentProduct.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
              />
            </label>
            <div className="flex justify-end mt-4">
              <button type="submit" className="btn btn-info mr-5">
                Update
              </button>
              <button
                onClick={closeUpdateModal}
                type="button"
                className="btn btn-neutral"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default ProductDetails;
