import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./features/cart/cart-slice";
import productSlice from "./features/product/product-slice";
import loadingSlice from "./features/loading/loading-slice";

export const store = configureStore({
  reducer: { cartSlice,productSlice,loadingSlice},
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
