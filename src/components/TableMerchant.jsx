import React, { useState, useEffect } from "react";
import { Pagination, Table } from "flowbite-react";
import { format } from 'date-fns';
const TableMerchant = ({ headers, data }) => {
  const [currentPosts,setCurrentPosts]=useState();

useEffect(()=>{
    setCurrentPosts(data?.items)
  },[data])
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
              <Table.Cell>  {item.startDate &&
                <span>{format(new Date(item.startDate), 'MMMM d, yyyy h:mm a')}</span>
              }   </Table.Cell>
              <Table.Cell>{item.endDate &&
                <span>{format(new Date(item.endDate), 'MMMM d, yyyy h:mm a')}</span>
              }  </Table.Cell>
              <Table.Cell>{item.sourceName}</Table.Cell>
              <Table.Cell>{item.statusName}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

  
    </div>
  );
};

export default TableMerchant;
