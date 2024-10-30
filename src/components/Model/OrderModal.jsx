import { Modal, Button } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import useMutation from "./../../hooks/useMutate";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "react-toastify";

const OrderModal = ({ openModal, handleModal, order, handleDataUpdate }) => {
  console.log(order, "d");
  const paymentOptions = useMemo(
    () => [
      { value: "paid", label: "Paid" },
      { value: "unpaid", label: "Unpaid" },
      { value: "refunded", label: "Refunded" },
    ],
    []
  );

  const statusOptions = useMemo(
    () => [
      { value: "completed", label: "Completed" },
      { value: "shipped", label: "Shipped" },
      { value: "cancelled", label: "Cancelled" },
    ],
    []
  );

  const [status, setStatus] = useState("");
  const [payment, setPayment] = useState("");
  const [updateBody, setUpdateBody] = useState({});

  useEffect(() => {
    if (!status) {
      const statusVal = statusOptions.filter(
        // eslint-disable-next-line react/prop-types
        (o) => o.value === order.status
      )[0];
      setStatus(statusVal);
    }
  }, [statusOptions, order.status, status]);

  useEffect(() => {
    if (!payment) {
      const paymentVal = paymentOptions.filter(
        (o) => o.value === order.paymentStatus
      )[0];
      setPayment(paymentVal);
    }
  }, [order.paymentStatus, payment, paymentOptions]);

  const [changes, setChanges] = useState(0);
  useEffect(() => {
    let changeCount = 0;
    const updatedFields = {};

    if (payment?.value !== order.paymentStatus) {
      changeCount += 1;
      updatedFields.paymentStatus = payment.value;
    }

    if (status?.value !== order.status) {
      changeCount += 1;
      updatedFields.status = status.value;
    }

    setChanges(changeCount);
    setUpdateBody(updatedFields);
  }, [payment, status, order.paymentStatus, order.status]);

  const { isLoading, mutate } = useMutation("/admin/orders");

  const handleUpdate = async () => {
    const res = await mutate(updateBody, { method: "put" }, `${order.id}`);
    if (res.status === 200) {
      handleModal(false);
      handleDataUpdate(res.data);
    } else {
      toast(res.message);
    }
    console.log(res, "order res");
  };

  return (
    <div>
      <Modal show={openModal} onClose={() => handleModal(false)}>
        <Modal.Header>Order Detail</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p>
              <span className="font-bold">Order Id:</span> {order.id}
            </p>
            <div className="w-full">
              <span className="font-bold">Payment Status:</span>
              <Select
                className="50%"
                options={paymentOptions}
                value={payment}
                onChange={(e) => setPayment(e)}
              />
            </div>
            <div>
              <span className="font-bold">Status:</span>
              <Select
                className="50%"
                options={statusOptions}
                value={status}
                onChange={(e) => {
                  setStatus(e);
                }}
                styles={{
                  input: (base) => ({
                    ...base,
                    border: "none",
                  }),
                }}
              />
            </div>
            <p>
              <span className="font-bold">Shipping Address: </span>
              {order.shippingAddress}
            </p>
            <p>
              <span className="font-bold"> Order Amout: </span>
              {order.totalAmount}
            </p>
            <p>
              <span className="font-bold">Order By: </span>
              <br />
              <span className="font-bold">id:</span> {order.user.id} <br />
              <span className="font-bold">name:</span> {order.user.firstName}
              <br />
              <span className="font-bold">email:</span> {order.user.email}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="w-full flex justify-end">
            <Button
              disabled={changes === 0 ? true : false}
              isProcessing={isLoading}
              processingSpinner={
                <AiOutlineLoading className="h-6 w-6 animate-spin" />
              }
              processingLabel="...Updating"
              onClick={handleUpdate}
            >
              Update
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderModal;
