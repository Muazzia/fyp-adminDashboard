import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import ProductsTable from "./ProductsTable";
import ProductModal from "../../Model/ProductModal";
import useFetch from "../../../hooks/useFetch";

const Product = () => {
  const { data, error, isLoading, refetch } = useFetch("/admin/product");

  const [openModal, setOpenModal] = useState(false);
  const handleModal = (val) => {
    setOpenModal(val);
  };

  return (
    <div className="">
      <div>
        <div className="flex w-full justify-between">
          <p className="font-bold text-lg">All Products</p>
          <div className="hover:cursor-pointer">
            <IoMdAdd
              size={25}
              onClick={() => {
                console.log("btn called");
                handleModal(true);
              }}
            />
            <ProductModal
              handleModel={handleModal}
              openModal={openModal}
              refetchProducts={refetch}
            />
          </div>
        </div>

        {/*  All Products */}
        <div className="mt-5">
          <ProductsTable
            error={error}
            isLoading={isLoading}
            products={data?.data}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
