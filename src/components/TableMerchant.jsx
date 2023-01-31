import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Apis } from "../utils/apis";
import { Pagination, Table } from "flowbite-react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import axios from "axios";
import { toast } from "react-toastify";
const TableMerchant = ({ headers, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

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
          {currentPosts?.map((item, id) => (
            <Table.Row
              key={id}
              className="font-normal bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell className="text-blue-700">
                {item.description}
              </Table.Cell>
              <Table.Cell>{item.startDate}</Table.Cell>
              <Table.Cell>{item.endDate}</Table.Cell>
              <Table.Cell>{item.sourceName}</Table.Cell>
              <Table.Cell>{item.statusName}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <div className="flex items-center justify-end py-4 text-center">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(data?.length / 15) || 10}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default TableMerchant;
