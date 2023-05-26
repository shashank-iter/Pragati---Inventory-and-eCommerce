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
        {data.map(
          (
            // map over the data print individual vendor data
            // rename properties and have default values
            {
              vendorName = "xyz",
              vendorCompanyName: companyName = "xyz and Co.",
              vendorEmail: email = "xyz@homail.com",
              payments = false,
            },
            key,
            arr
          ) => {
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
                  <Typography className="text-sm font-medium">
                    {email}
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
