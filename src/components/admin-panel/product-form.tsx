"use client";

import axios from "axios";
import Image from "next/image";
import { FormEvent, useState } from "react";

import { useAppDispatch } from "@/lib/hooks";
import { makeSuccessToast } from "@/utils/helper";
import { UploadButton } from "@/utils/uploadthing";
import { setLoading } from "@/lib/features/loading/loading-slice";

interface IPayload {
  imgSrc: null | string;
  fileKey: null | string;
  name: string;
  category: string;
  price: string;
}

export const ProductForm = () => {
  const [payload, setPayload] = useState<IPayload>({
    imgSrc: null,
    fileKey: null,
    name: "",
    category: "",
    price: "",
  });

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(setLoading(true));

    axios
      .post("/api/add_product", payload)
      .then((res) => {
        makeSuccessToast("Product added Successfully");
        setPayload({
          imgSrc: null,
          fileKey: null,
          name: "",
          category: "",
          price: "",
        });
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Image
        className="max-h-[300px] w-auto object-contain rounded-md"
        src={payload.imgSrc ? payload.imgSrc : "/placeholder.jpg"}
        width={800}
        height={500}
        alt="product_image"
      />

      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);

          setPayload({
            ...payload,
            imgSrc: res[0]?.url,
            fileKey: res[0]?.key,
          });
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />

      <div>
        <label className="block ml-1">Product Name</label>
        <input
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          type="text"
          value={payload.name}
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
          required
        />
        <label className="block ml-1">Product Category</label>
        <input
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          type="text"
          value={payload.category}
          onChange={(e) => setPayload({ ...payload, category: e.target.value })}
          required
        />
        <label className="block ml-1">Product Price</label>
        <input
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          type="text"
          value={payload.price}
          onChange={(e) => setPayload({ ...payload, price: e.target.value })}
          required
        />

        <div className="flex justify-end mt-4">
            <button className="bg-pink text-white px-8 py-2 rounded-md">Add</button>
        </div>
      </div>
    </form>
  );
};
