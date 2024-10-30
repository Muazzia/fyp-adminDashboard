import { Table } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import useMutation from "../../../hooks/useMutate";
import { toast } from "react-toastify";
import cn from "../../../utils/cn";
import { useState, useMemo } from "react";
import EditProductModal from "../../Model/EditProductModal";
import Skeleton from "react-loading-skeleton";
import { Pagination } from "flowbite-react";

const ProductsTable = ({
  error,
  isLoading = false,
  refetch = async () => {},
  products = [],
}) => {
  const { mutate, isLoading: delLoading } = useMutation(
    "/admin/product",
    "delete"
  );

  const handleDelete = async (id) => {
    setLoadingId(id);
    try {
      const res = await mutate(null, {}, id);
      if (res.status === 200) {
        toast(res.message, { type: "success" });
        await refetch();
      }
    } catch (error) {
      console.log("err", error);
    } finally {
      setLoadingId(false);
    }
  };

  const [loadingId, setLoadingId] = useState(null);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleEditModal = (val, product) => {
    if (val) {
      setOpenEditModal(val);
      setEditProduct(product);
    } else {
      setOpenEditModal(val);
      setEditProduct(null);
    }
  };

  const [currentPage, setCurrentPage] = useState(1); // Current page
  const rowsPerPage = 5;

  const onPageChange = (page) => setCurrentPage(page);

  // Calculate total pages
  const totalPages = useMemo(() => {
    if (!products?.length) {
      return 1;
    }
    return Math.ceil(products?.length / rowsPerPage);
  }, [products, rowsPerPage]);

  // Get rows for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = useMemo(
    () => products?.slice(indexOfFirstRow, indexOfLastRow),
    [indexOfFirstRow, indexOfLastRow, products]
  );

  if (error?.message) return <div>{error?.message}</div>;
  return (
    <div>
      <div className="max-h-[64vh] overflow-auto shadow-md rounded-md border-t">
        <Table>
          <Table.Head>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Skin Condition</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Stock</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>

            <Table.HeadCell>
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {isLoading && (
              <Table.Row>
                {[...Array(7)].map((_, i) => {
                  return (
                    <Table.Cell key={i}>
                      <Skeleton />
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            )}
            {currentRows?.map((product) => {
              return (
                <Table.Row
                  key={product.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </Table.Cell>
                  <Table.Cell>{product.description}</Table.Cell>
                  <Table.Cell>
                    <div className="flex space-x-2 flex-wrap justify-start ">
                      {product.skinCondition.map((condition, i) => {
                        if (i === 0) return <span key={i}>{condition}</span>;
                        return <span key={i}>, {condition}</span>;
                      })}
                    </div>
                  </Table.Cell>
                  <Table.Cell>{product.category}</Table.Cell>
                  <Table.Cell>{product.stock}</Table.Cell>
                  <Table.Cell>${product.price}</Table.Cell>
                  <Table.Cell>
                    <div className="flex space-x-2 items-center justify-center">
                      <div>
                        <FaEdit
                          size={18}
                          onClick={() => handleEditModal(true, product)}
                          className="hover:cursor-pointer text-main font-bold"
                        />
                        {openEditModal && (
                          <EditProductModal
                            product={editProduct}
                            handleModel={handleEditModal}
                            openModal={openEditModal}
                            refetchProducts={refetch}
                          />
                        )}
                      </div>
                      {delLoading && loadingId === product.id ? (
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <MdDelete
                          size={18}
                          className={cn(`hover:cursor-pointer text-red-600`)}
                          onClick={() => {
                            if (!delLoading) {
                              handleDelete(product.id);
                            }
                          }}
                        />
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
      <div className="mt-5">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default ProductsTable;
