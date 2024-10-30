import SingleOrder from "./SingleOrder";
import useFetch from "./../../../hooks/useFetch";
import { Table } from "flowbite-react";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
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

  return (
    <div className="w-full">
      <p className="font-bold text-lg">All Orders</p>
      <div className="mt-5">
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
              data?.data?.map((order) => {
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
