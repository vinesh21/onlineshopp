import { createSlice } from "@reduxjs/toolkit";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimals = (num) => {
  return Math.round(num * 100) / 100;
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartitems.map((x) => (x._id === existItem._id ? item : x));
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      state.itemPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      //calculate shipping price (if order is over 100 then free)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      // calculate tax price
      state.taxPrice = addDecimals(Number((0.15 * state.itemPrice).toFixed(2)));

      //calculate total price
      state.totalPrice = (
        Number(state.ItemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
