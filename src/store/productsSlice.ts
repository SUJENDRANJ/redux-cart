import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/product';

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  // Simulating API call with sample data
  const products: Product[] = [
    {
      id: 1,
      title: "Modern Laptop",
      price: 999.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      description: "Powerful laptop for all your computing needs"
    },
    {
      id: 2,
      title: "Wireless Headphones",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      description: "Premium wireless headphones with noise cancellation"
    },
    {
      id: 3,
      title: "Smart Watch",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      description: "Track your fitness and stay connected"
    }
  ];
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return products;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export default productsSlice.reducer;