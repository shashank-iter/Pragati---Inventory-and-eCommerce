import { Typography } from "@material-tailwind/react";

/**
 * This is a React functional component that renders a Payments Table.
 * @param {Object} props - The props object.
 * @param {Array} props.headers - An array of strings representing the column headers of the table.
 * @param {Array} props.data - An array of objects representing the data to be displayed in the table.
 */
export function PaymentsTable({ headers, data }) {
  // Define a constant for the padding classes to be applied to all table cells
  const tdPaddingClasses = `py-3 px-5`;

  // If there is no data, return a message indicating that no data is available
  if (data.length === 0) {
    return <p>No data available</p>;
  }

  // Render the table
  return (
    <table className="w-full min-w-[640px] table-auto border-separate border-spacing-x-5">
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
        {/* {console.log({data})} */}
        {data.map(
          (
            {
              vendor: vendorName,
              advancePaid: paymentsMade,
              dueAmount: paymentsDue,
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
                    {vendorName ? vendorName : "N/A"}
                  </Typography>
                </td>
                <td className={tdPaddingClasses}>
                  <Typography className={`text-sm font-medium`}>
                    ₹ {paymentsMade}
                  </Typography>
                </td>
                <td className={tdPaddingClasses}>
                  <Typography className="text-sm font-medium">
                    ₹ {paymentsDue}
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
