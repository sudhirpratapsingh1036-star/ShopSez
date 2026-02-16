import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const exists = state.find(i => i._id === action.payload._id);
      if (!exists) state.push(action.payload);
    },
    removeItem: (state, action) => {
      return state.filter(i => i._id !== action.payload);
    },
  },
});

export const { addItem, removeItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;
