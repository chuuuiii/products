import { create } from "zustand"

// Initial state for a new product
const initialProductState = {
  name: '',
  quantity: '',
  price: '',
  category: '',
  image: '',
  description: ''
}


export const useProductStore = create((set) => ({
   // Initial state for the products array
  products: [],
  setProducts: (products) => ({products}),

  //function to create new product
  createProduct: async (newProduct) => {

    if (!newProduct.name || !newProduct.quantity || !newProduct.price || !newProduct.category || !newProduct.image || !newProduct.description) {
      return { success: false, message: 'Please provide all the details' }
    }

    try {
      const res = await fetch('/api/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      })
      const data = await res.json();
      if (res.ok) {
        //update product state after creating new product
        set((state) => ({ products: [...state.products, data.data ]}))
        return { success: true, message: 'Product created successfully' }
      } else {
        return { success: false, message: data.message || 'Failed to create product' }
      }
    } catch (error) {
      return { success: false, message: 'Network error, Please try again' }
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch('/api/products/');
      const data = await res.json();
      set({ products: data.data })
    } catch (error) {
      console.error('Failed to fetch data', error.message)
    }
  },

  resetForm: () => initialProductState,


}))