"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API'den ürünleri çek
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      // Gerçek API'ye bağlanabilirsiniz
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();

      // API'den gelen verileri dönüştürme
      const formattedProducts = data.products.map((product) => ({
        id: product.id,
        name: product.title,
        price: product.price,
        rating: product.rating,
        brand: product.brand,
        image: product.thumbnail,
      }));

      return formattedProducts;
    } catch (error) {
      return rejectWithValue("Ürünler yüklenirken bir hata oluştu.");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
