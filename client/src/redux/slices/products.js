import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null
};

export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setProducts: (state, action) => {
      state.loading = false;
      state.error = null;
      state.products = action.payload;
    },
    setProduct: (state, action) => {
      state.loading = false;
      state.error = null;
      state.product = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

console.log("ProdictSLice");
console.log(productsSlice);

export const { setLoading, setProducts, setError, setProduct } = productsSlice.actions;
export default productsSlice.reducer;

export const productSelector = (state) => state.products;
