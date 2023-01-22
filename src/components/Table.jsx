import React from "react";

const Table = ({ headers }) => {
  const obj = [
    {
      id: 1,
      promocode: "1XKP4A",
    },
  ];
  return (
    <div className="w-full">
      <table className="w-full text-sm bg-white rounded shadow-md table-auto">
        <thead>
          <tr>
            {headers.map((header) => (
              <th className="uppercase">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
