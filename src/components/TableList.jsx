import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Apis } from "../utils/apis";
import { Pagination, Table } from "flowbite-react";
import { format } from 'date-fns';
import { toast } from "react-toastify";
const TableList = ({ headers, data }) => {
  const [currentPosts, setCurrentPosts] = useState();
 
  useEffect(() => {
    setCurrentPosts(data?.items);
  }, [data]);

  //export

  const handleExport = async (id) => {
    try {
      const res = await Apis.getExcelPromocodes(id).then((response) => {
        {
          const url = window.URL.createObjectURL(new Blob([response]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "file.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    } catch (err) {
      console.log(err);
      toast.error("Promocode not found!");
    }
  };

  return (
    <div className="w-full">
      <Table hoverable={true}>
        <Table.Head className="!px-10 bg-white border-b">
          {headers.map((header, id) => (
            <Table.HeadCell key={id} className="text-sm font-semibold">
              {header}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {currentPosts?.map((item) => (
            <Table.Row
              key={item.id}
              className="font-normal bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>
                {item.promocodeType.createdDate &&
                <span>{format(new Date(item.promocodeType.createdDate), 'MMMM d, yyyy h:mm a')}</span>
              }  
             </Table.Cell>
              <Table.Cell>{item.merchantName}</Table.Cell>
              <Table.Cell className="text-blue-700">
                {item.description}
              </Table.Cell>
              <Table.Cell>{item.count}</Table.Cell>
              <Table.Cell>{item.promocodeType.name}</Table.Cell>
              <Table.Cell>{item.source.name}</Table.Cell>
              <Table.Cell style={{ cursor: "pointer" }}>
                <button
                  onClick={() => {
                    handleExport(item.id);
                  }}
                >
                  ZIP
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TableList;
