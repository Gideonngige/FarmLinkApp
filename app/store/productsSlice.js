import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async fetch for initial load
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (productName) => {
    const res = await fetch(`https://farmlinkbackend-qupt.onrender.com/get_products/${productName}`);
    const data = await res.json();
    return data.products;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateProductQuantity: (state, action) => {
      const { productId, quantityBought } = action.payload;
      const product = state.products.find((p) => p.id === parseInt(productId));
      if (product) {
        product.quantity -= quantityBought;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateProductQuantity } = productsSlice.actions;
export default productsSlice.reducer;
