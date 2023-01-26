import React from "react";
import { Pagination, Table } from "flowbite-react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
const TableList = ({ headers, variant, setState, data }) => {
  //fetch api
  
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
            {data?.data.map(
              ({
                merchantName,
                name,
                id,
                description,
                count,
                typeName,
                
                sourceName,
              }) => (
                <Table.Row
                  key={id}
                  className="font-normal bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell>{merchantName}</Table.Cell>
                  <Table.Cell className="text-blue-700">
                    {description}
                  </Table.Cell>
                  <Table.Cell>{count}</Table.Cell>
                  <Table.Cell>{typeName}</Table.Cell>
                  <Table.Cell>{sourceName}</Table.Cell>
                  <Table.Cell style={{cursor:"pointer"}}>
                    ZIP
                  </Table.Cell>
                </Table.Row>
              )
            )}
            
          </Table.Body>
        </Table>
      
      <div className="flex items-center justify-end py-4 text-center">
        <Pagination currentPage={1} totalPages={1000} onPageChange={() => ""} />
      </div>
    </div>
  );
};

export default TableList;
