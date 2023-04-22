import { Typography } from "@material-tailwind/react";

/**
 * Renders a table with the given headers and data.
 * @param {object} props - The component props.
 * @param {string[]} props.headers - An array of strings representing the table headers.
 * @param {object[]} props.data - An array of objects representing the table data.
 * @returns {JSX.Element} - A JSX.Element representing the table.
 */
export function VendorTable({ headers, data }) {
  // padding for all table cells
  const tdPaddingClasses = `py-3 px-5`;

  if (data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <table className="w-full min-w-[640px] table-auto border-separate border-spacing-x-5">
      {/* table headers */}
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
      {/* table body */}
      <tbody className="">
        {data.map(({ vendorName, companyName, email, payments }, key, arr) => {
          // const tdClasses = `py-3 px-5`;
          return (
            <tr key={key}>
              <td className={tdPaddingClasses}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {vendorName}
                </Typography>
              </td>
              <td className={tdPaddingClasses}>
                <Typography className={`text-sm font-medium`}>
                  {companyName}
                </Typography>
              </td>
              <td className={tdPaddingClasses}>
                <Typography className="text-sm font-medium">{email}</Typography>
              </td>
              <td className={tdPaddingClasses}>
                {payments ? (
                  <span className="block w-12 rounded-md bg-green-400 py-1.5 px-2 text-center text-white ">
                    Paid
                  </span>
                ) : (
                  <span className="block w-12 rounded-md bg-red-400 py-1.5 px-2 text-center text-white ">
                    Due
                  </span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
