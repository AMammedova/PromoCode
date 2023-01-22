import React from "react";
import { Pagination, Table } from "flowbite-react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
const TableComponent = ({ headers, variant }) => {
  const obj = [
    {
      id: 1,
      promocode: "1XKP4A",
      merchant: "DINEHALL",
      desc: "Birinci sifarishe 10% endirim",
      dateStart: "15/01/2023",
      dateEnd: "25/02/2023",
      source: "Telegram Bot",
      status: "USED",
    },
    {
      id: 2,
      promocode: "1XKP4A",
      merchant: "DINEHALL",
      desc: "Birinci sifarishe 10% endirim",
      dateStart: "15/01/2023",
      dateEnd: "25/02/2023",
      source: "Telegram Bot",
      status: "USED",
    },
    {
      id: 3,
      promocode: "1XKP4A",
      merchant: "DINEHALL",
      desc: "Birinci sifarishe 10% endirim",
      dateStart: "15/01/2023",
      dateEnd: "25/02/2023",
      source: "Telegram Bot",
      status: "USED",
    },
    {
      id: 4,
      promocode: "1XKP4A",
      merchant: "DINEHALL",
      desc: "Birinci sifarishe 10% endirim",
      dateStart: "15/01/2023",
      dateEnd: "25/02/2023",
      source: "Telegram Bot",
      status: "UNUSED",
    },
  ];
  return (
    <div className="w-full">
      {variant === 1 ? (
        <Table hoverable={true}>
          <Table.Head className="!px-10 bg-white border-b">
            {headers.map((header) => (
              <Table.HeadCell className="text-sm font-semibold">
                {header}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {obj.map((item) => (
              <Table.Row
                key={item.id}
                className="font-normal bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {Object.entries(item).map(
                  (item, idx) =>
                    idx !== 0 && (
                      <Table.Cell
                        className={` ${
                          item[1] === "USED"
                            ? "text-green-400"
                            : item[0] === "desc"
                            ? "text-blue-700"
                            : ""
                        }`}
                      >
                        {item[1]}
                      </Table.Cell>
                    )
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : variant === 2 ? (
        <Table hoverable={true}>
          <Table.Head className="!px-10 bg-white border-b">
            {headers.map((header) => (
              <Table.HeadCell className="w-2/6 text-sm font-semibold">
                {header}
              </Table.HeadCell>
            ))}
            <Table.HeadCell>
              <span className="sr-only ">Edit</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {obj.map((item) => (
              <Table.Row key={item.id} className="font-normal bg-white">
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.merchant}</Table.Cell>
                <Table.Cell>{item.desc}</Table.Cell>
                <Table.Cell>
                  <HiOutlinePencilSquare
                    className="cursor-pointer hover:stroke-gray-900"
                    size={20}
                  />
                </Table.Cell>
                <Table.Cell>
                  <HiOutlineTrash
                    className="cursor-pointer hover:stroke-gray-900"
                    size={20}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        ""
      )}
      <div className="flex items-center justify-end py-4 text-center">
        <Pagination currentPage={1} totalPages={1000} onPageChange={() => ""} />
      </div>
    </div>
  );
};

export default TableComponent;
