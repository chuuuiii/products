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
        <table className="table min-w-[800px] border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th>No.</th>
              <th>Product name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index} className="border-b">
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => openUpdateModal(product)}
                        className="btn btn-info text-white px-3 py-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-warning text-white px-3 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500">
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
        className="right-modal p-4 w-full max-w-[600px] mx-auto"
        overlayClassName="right-modal-overlay flex items-center justify-center p-4"
      >
        <h2 className="text-xl font-semibold mb-4">Update Product</h2>
        {currentProduct && (
          <form onSubmit={handleUpdate}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label>
                Product name:
                <input
                  type="text"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </label>
              <label>
                Quantity:
                <input
                  type="number"
                  name="quantity"
                  value={currentProduct.quantity}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={currentProduct.price}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </label>
              <label>
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
            </div>
            <label className="block mt-4">
              Image URL:
              <input
                type="text"
                name="image"
                value={currentProduct.image}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </label>
            <label className="block mt-4">
              Description:
              <textarea
                type="text"
                name="description"
                value={currentProduct.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
              />
            </label>
            <div className="flex justify-end gap-3 mt-4">
              <button type="submit" className="btn btn-info px-4 py-2">
                Update
              </button>
              <button
                onClick={closeUpdateModal}
                type="button"
                className="btn btn-neutral px-4 py-2"
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
