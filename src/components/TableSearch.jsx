import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Apis } from "../utils/apis";
import { Pagination, Table } from "flowbite-react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import axios from "axios";
import { toast } from "react-toastify";
const TableSearch = ({ headers, data }) => {
  const dataArray = Object.values(data);

  return (
    <div className="w-full mb-20 mt-10 transition-all duration-500 ease-in-out">
      <Table hoverable={true}>
        <Table.Head className="!px-10 bg-white border-b">
          {headers.map((header, id) => (
            <Table.HeadCell key={id} className="text-sm font-semibold">
              {header}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="font-normal bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>{dataArray[0]?.name}</Table.Cell>
            <Table.Cell>{dataArray[0]?.merchantName}</Table.Cell>
            <Table.Cell className="text-blue-700">
              {dataArray[0]?.description}
            </Table.Cell>

            <Table.Cell>{dataArray[0]?.startDate}</Table.Cell>
            <Table.Cell>{dataArray[0]?.endDate}</Table.Cell>
            <Table.Cell>{dataArray[0]?.sourceName}</Table.Cell>
            <Table.Cell>{dataArray[0]?.statusName}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default TableSearch;
