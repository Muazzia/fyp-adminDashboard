import SingleOrder from "./SingleOrder";
import useFetch from "./../../../hooks/useFetch";
import { Table } from "flowbite-react";
import Skeleton from "react-loading-skeleton";
import { useState, useMemo } from "react";
import { Pagination } from "flowbite-react";
import OrderModal from "../../Model/OrderModal";

const Order = () => {
  const { data, isLoading, isError, setData } = useFetch("/admin/orders");

  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const handleModal = (val, order = {}) => {
    setOpenModal(val);
    setSelectedOrder(order);
  };

  const handleDataUpdate = (newObj) => {
    const newData = data.data.map((order) => {
      if (order.id === newObj.id) {
        return newObj;
      } else {
        return order;
      }
    });

    setData({ ...data, data: newData });
  };

  const [currentPage, setCurrentPage] = useState(1); // Current page
  const rowsPerPage = 10;

  const onPageChange = (page) => setCurrentPage(page);

  // Calculate total pages
  const totalPages = useMemo(() => {
    if (!data?.data?.length) {
      return 1;
    }
    return Math.ceil(data.data.length / rowsPerPage);
  }, [data, rowsPerPage]);

  // Get rows for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = useMemo(
    () => data?.data?.slice(indexOfFirstRow, indexOfLastRow),
    [indexOfFirstRow, indexOfLastRow, data?.data]
  );

  return (
    <div className="w-full">
      <p className="font-bold text-lg">All Orders</p>
      <div className="my-5 max-h-[64vh] overflow-auto shadow-md rounded-md border-t">
        <Table>
          <Table.Head>
            <Table.HeadCell>Id</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {isError ? (
              <Table.Row>
                <Table.Cell>sorry error</Table.Cell>
              </Table.Row>
            ) : isLoading ? (
              [...Array(1)].map((_, i) => {
                return (
                  <Table.Row key={i}>
                    {[...Array(5)].map((_, i) => {
                      return (
                        <Table.Cell key={i}>
                          <Skeleton />
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                );
              })
            ) : (
              currentRows?.map((order) => {
                return (
                  <SingleOrder
                    key={order.id}
                    order={order}
                    handleModal={handleModal}
                  />
                );
              })
            )}
          </Table.Body>
        </Table>
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      <div>
        {openModal && (
          <OrderModal
            handleModal={handleModal}
            openModal={openModal}
            order={selectedOrder}
            handleDataUpdate={handleDataUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default Order;
