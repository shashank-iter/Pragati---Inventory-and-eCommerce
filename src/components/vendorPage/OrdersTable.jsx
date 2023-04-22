import { Typography } from "@material-tailwind/react";

/**
 * This is a React functional component that renders an Orders Table.
 * @param {Object} props - The props object.
 * @param {Array} props.headers - An array of strings representing the column headers of the table.
 * @param {Array} props.data - An array of objects representing the data to be displayed in the table.
 */
export function OrdersTable({ headers, data }) {
  // Define a constant for the padding classes to be applied to all table cells
  const tdPaddingClasses = `py-3 px-5`;

  // If there is no data, return a message indicating that no data is available
  if (data.length === 0) {
    return <p>No data available</p>;
  }

  // Render the table
  return (
    <table className="w-full min-w-[640px] table-fixed border-separate border-spacing-x-5">
      {/* Render the table headers */}
      <thead>
        <tr>
          {headers.map((title) => (
            <th
              key={title}
              className={`border-b border-blue-gray-50 text-left ${tdPaddingClasses}`}
            >
              <Typography
                variant="small"
                className="text-[11px] font-bold uppercase text-blue-gray-400"
              >
                {title}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      {/* Render the table body */}
      <tbody className="">
        {data.map(
          (
            {
              orderNo,
              orderDate,
              quantity,
              expectedDeliveryDate,
              orderValue,
              advancePaid,
              duePayment,
              orderStatus,
              paymentDueDate,
            },
            key,
            arr
          ) => {
            {
            }
            return (
              <tr key={key}>
                <td className={tdPaddingClasses}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {orderNo}
                  </Typography>
                </td>
                <td className={tdPaddingClasses}>
                  <Typography className={`text-sm font-medium`}>
                    {orderDate}
                  </Typography>
                </td>
                <td className={tdPaddingClasses}>
                  <Typography className="text-sm font-medium">
                    {quantity}
                  </Typography>
                </td>
                <td className={tdPaddingClasses}>
                  <Typography className={`text-sm font-medium`}>
                    {expectedDeliveryDate}
                  </Typography>
                </td>
                <td className={`whitespace-nowrap ${tdPaddingClasses}`}>
                  <Typography className={`text-sm font-medium`}>
                    ₹ {orderValue}
                  </Typography>
                </td>
                <td className={`whitespace-nowrap ${tdPaddingClasses}`}>
                  <Typography className={`text-sm font-medium`}>
                    ₹ {advancePaid}
                  </Typography>
                </td>
                <td className={`whitespace-nowrap ${tdPaddingClasses}`}>
                  <Typography className={`text-sm font-medium`}>
                    ₹ {duePayment}
                  </Typography>
                </td>
                <td className={tdPaddingClasses}>
                  <Typography className={`text-sm font-medium`}>
                    {orderStatus}
                  </Typography>
                </td>
                <td className={tdPaddingClasses}>
                  <Typography className={`text-sm font-medium`}>
                    {paymentDueDate}
                  </Typography>
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
}
