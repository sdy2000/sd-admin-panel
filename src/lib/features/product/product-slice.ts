import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IProduct } from "@/app/types/product";

const initialState: IProduct = {
  _id: "",
  imgSrc: "",
  fileKey: "",
  name: "",
  price: "",
  category: "",
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<IProduct>) => {
      return action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
