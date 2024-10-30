import { Table, Button } from "flowbite-react";
import { Badge } from "flowbite-react";

const SingleOrder = ({ order, handleModal }) => {
  const badgeType = {
    pending: "info",
    shipped: "warning",
    cancelled: "failure",
    completed: "success",
  };
  return (
    <Table.Row>
      <Table.Cell>{order?.id}</Table.Cell>
      <Table.Cell>{order?.createdAt}</Table.Cell>
      <Table.Cell>{order?.totalAmount}</Table.Cell>
      <Table.Cell>
        <Badge color={badgeType[order?.status]} className="w-fit">
          {order?.status}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <div className="flex gap-2">
          {/* <Button color="failure" size="sm" className="px-0 py-0">
            Cancel
          </Button> */}
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
