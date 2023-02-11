import { createSlice } from "@reduxjs/toolkit";

const calculateSubtotal = (cartState) => {
  let result = 0
  cartState.map((item) => (
    result += item.qty * item.price
  ))

  return Number(result).toFixed(2)
}

const updateLocalStorage = (cart) => {
  localStorage.setItem('cartItems' ,JSON.stringify(cart))
  localStorage.setItem('subtotal', JSON.stringify(calculateSubtotal(cart)))
}

export const initialState = {
  loading: false,
  error: null,
  cart: JSON.parse(localStorage.getItem('cartItems')) || [],
  expressShipping: false,
  subtotal: localStorage.getItem('subtotal') ? calculateSubtotal(JSON.parse(localStorage.getItem('cartItems'))) : 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = true;
    },
    cartItemsAdd: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item.id === existingItem.id ? action.payload : item
        );
      } else {
        state.cart = [...state.cart, action.payload];
      }

      state.loading = false;
      state.error = null;
      updateLocalStorage(state.cart);
      state.subtotal = calculateSubtotal(state.cart)
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    cartItemRemove: (state, action)=> {
      state.cart = [...state.cart].filter((item )=> item.id !== action.payload)
      updateLocalStorage(state.cart)
      state.subtotal = calculateSubtotal(state.cart)
      state.loading = false;
      state.error = null
    }
  },
});

console.log("ProdictSLice");
console.log(cartSlice);

export const { setLoading, cartItemsAdd, setError, cartItemRemove } = cartSlice.actions;
export default cartSlice.reducer;

export const cartSelector = (state) => state.cart;
