import axios from "axios";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";

import { useAppDispatch } from "@/lib/hooks";
import { IProduct } from "@/app/types/product";
import { makeSuccessToast } from "@/utils/helper";
import { setProduct } from "@/lib/features/product/product-slice";
import { setLoading } from "@/lib/features/loading/loading-slice";

interface ProductRowProps {
  srNo: number;
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
  product: IProduct;
}

export const ProductRow = ({
  srNo,
  setOpenPopup,
  setUpdateTable,
  product,
}: ProductRowProps) => {
  const dispatch = useAppDispatch();

  const onEdit = () => {
    dispatch(setProduct(product));
    setOpenPopup(true);
  };

  const onDelete = () => {
    dispatch(setLoading(true));

    const payload = { fileKey: product.fileKey };

    axios
      .delete("/api/uploadthing", { data: payload })
      .then((res) => {
        console.log(res.data);

        axios
          .delete(`/api/delete_product/${product._id}`)
          .then((res) => {
            console.log(res.data);
            makeSuccessToast("Product deleted Successfully!");
            setUpdateTable((prevState) => !prevState);
          })
          .catch((err) => console.log(err))
          .finally(() => dispatch(setLoading(false)));
      })
      .catch((err) => console.log(err));
  };

  return (
    <tr>
      <td>
        <div>{srNo}</div>
      </td>
      <td>
        <div>{product.name}</div>
      </td>
      <td>$ {product.price}</td>
      <td className="py-2">
        <Image
          src={product.imgSrc}
          width={40}
          height={40}
          alt="Product_image"
        />
      </td>
      <td>
        <div className="text-2xl flex items-center gap-4 text-gray-600">
          <CiEdit
            className="cursor-pointer hover:text-black duration-200"
            onClick={onEdit}
          />
          <RiDeleteBin5Line
            className="text-[20px] cursor-pointer hover:text-red-600 duration-200"
            onClick={onDelete}
          />
        </div>
      </td>
    </tr>
  );
};
