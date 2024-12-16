import React, { Suspense, useState } from "react";
import Modal from "react-modal";
import { useProductStore } from "../store/useProductStore.";
import { toast } from "react-toastify";
import ProductDetails from "../product/ProductDetails";

Modal.setAppElement("#root");
const CreateProduct = () => {
  const { createProduct, resetForm } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState(resetForm());

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewProduct(resetForm());
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await createProduct(newProduct);
    if (success) {
      toast.success(message);
      closeModal();
      setNewProduct(resetForm());
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="font-poppins">
      <button className="btn btn-primary text-white" onClick={openModal}>
        Add new product
      </button>
      <div>
        {/* <Suspense fallback={}> */}
        <ProductDetails />
        {/* </Suspense> */}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Product Modal"
        className="right-modal"
        overlayClassName="right-modal-overlay"
      >
        <h1 className="text-xl font-semibold mb-4">Add new product</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Product name:
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </label>
          <label className="block mb-2">
            Quantity:
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </label>
          <label className="block mb-2">
            Price:
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </label>
          <label className="block mb-2">
            Category:
            <select
              name="category"
              value={newProduct.category}
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
              value={newProduct.image}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </label>
          <label className="block mb-2">
            Description:
            <textarea
              type="text"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
            />
          </label>
          <div className="flex justify-end mt-4">
            <button type="submit" className="btn btn-primary mr-5">
              Add product
            </button>
            <button
              type="button"
              className="btn btn-neutral"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreateProduct;
