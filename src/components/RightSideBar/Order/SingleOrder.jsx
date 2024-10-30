import { Table, Button } from "flowbite-react";

// eslint-disable-next-line react/prop-types
const SingleOrder = ({ order, handleModal }) => {
  return (
    <Table.Row>
      <Table.Cell>{order?.id}</Table.Cell>
      <Table.Cell>{order?.createdAt}</Table.Cell>
      <Table.Cell>{order?.totalAmount}</Table.Cell>
      <Table.Cell>{order?.status}</Table.Cell>
      <Table.Cell>
        <div className="flex gap-2">
          <Button color="failure" size="sm" className="px-0 py-0">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleModal(true, order);
            }}
            color="dark"
            size="sm"
            className="px-0 py-0"
          >
            View
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default SingleOrder;
