import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  reviewSend: false,
  productUpdate: false,
  reviewRemoval: false,
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
    productReviewed: (state, action ) => {
      state.loading = false;
      state.error = null;
      state.reviewSend = true
    },
    resetError: (state) => {
      state.error = null;
      state.reviewSend = false;
      state.productUpdate = false
    },
    setProductUpdateFlag: (state) => {
      state.productUpdate = true;
      state.loading = false
    },
    setReviewRemovalFlag: (state) => {
      state.error = null;
      state.reviewRemoval = true;
      state.loading = false;
    },
  },
});

export const { setLoading, setProducts, setError, setProduct, productReviewed, resetError, setProductUpdateFlag, setReviewRemovalFlag } = productsSlice.actions;
export default productsSlice.reducer;

export const productSelector = (state) => state.products;
