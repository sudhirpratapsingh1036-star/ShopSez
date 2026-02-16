import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const item = state.find(i => i._id === action.payload._id);
      if (item) {
        item.qty += 1;
      } else {
        state.push({ ...action.payload, qty: 1 });
      }
    },

    increaseQty: (state, action) => {
      const item = state.find(i => i._id === action.payload);
      if (item) item.qty += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.find(i => i._id === action.payload);
      if (item && item.qty > 1) item.qty -= 1;
    },

    removeItem: (state, action) => {
      return state.filter(i => i._id !== action.payload);
    },
  },
});

export const { addItem, increaseQty, decreaseQty, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
