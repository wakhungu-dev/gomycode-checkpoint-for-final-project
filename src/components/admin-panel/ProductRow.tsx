import { setLoading } from "@/redux/features/loadingSlice";
import { setProduct } from "@/redux/features/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Iproduct } from "@/types/core";
import { makeToast } from "@/utils/helper";
import axios from "axios";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";

interface PropsType {
  SrNo: number;
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
  product: Iproduct;
}

const ProductRow: React.FC<PropsType> = ({
  SrNo,
  setOpenPopup,
  setUpdateTable,
  product,
}) => {
  const dispatch = useAppDispatch();

  const onEdit = () => {
    dispatch(setProduct(product));
    setOpenPopup(true);
  };

  const onDelete = async () => {
    dispatch(setLoading(true));
    const payload = {
      fileKey: product.fileKey,
    };

    try {
      console.log("Deleting product image with payload:", payload);
      const res1 = await axios.delete("/api/uploadthing", { data: payload });
      console.log("Image delete response:", res1.data);

      console.log("Deleting product with ID:", product._id);
      const res2 = await axios.delete("/api/product/" + product._id, {
        data: { id: product._id },
      });
      console.log("Product delete response:", res2.data);

      makeToast("success","Product deleted successfully");
      setUpdateTable((prevState) => !prevState);
    } catch (error) {
      console.error("Error deleting product:", error);
      makeToast("failed","Failed to delete product");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <tr>
      <td>
        <div>{SrNo}</div>
      </td>
      <td>
        <div>{product.name}</div>
      </td>
      <td>
        <div>{product.price.amount}</div>
      </td>
      <td className="py-2">
        <Image src={product.imgSrc} width={40} height={40} alt="product_img" />
      </td>
      <td>
        <div className="text-2xl flex items-center gap-2 text-gray-600">
          <CiEdit
            onClick={onEdit}
            className="cursor-pointer hover:text-blue-950"
          />
          <RiDeleteBin5Line
            onClick={onDelete}
            className="cursor-pointer hover:text-red-600"
          />
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
