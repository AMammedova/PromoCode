import React,{useState,useEffect} from "react";
import { Pagination, Table } from "flowbite-react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
const TableComponent = ({ headers, variant, setState, data,setModalItem }) => {


  const [currentPage,setCurrentPage]=useState(1);

  const [pageData,setPageData]=useState({
    total:0,page:0
  });

  const onPageChange=(page)=>{
    setCurrentPage(page)
   
      }
// const pagination=()=>{

// }

  return (
    <div className="w-full">
      {variant === 1 ? (
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
                startDate,
                endDate,
                isUsed,
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
                  <Table.Cell>{startDate}</Table.Cell>
                  <Table.Cell>{endDate}</Table.Cell>
                  <Table.Cell>{sourceName}</Table.Cell>
                  <Table.Cell
                    key={id}
                    className={` ${isUsed && "text-green-400"}`}
                  >
                    {isUsed ? "USED" : "UNUSED"}
                  </Table.Cell>
                </Table.Row>
              )
            )}
            
          </Table.Body>
        </Table>
      ) : variant === 2 ? (
        <Table hoverable={true}>
          <Table.Head className="!px-10 bg-white border-b">
            {headers.map((header, idx) => (
              <Table.HeadCell key={idx} className="w-2/6 text-sm font-semibold">
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
            {data.data.map(
              
              ({
                id,
                merchantName,
                description,
                userName

                
              })=> (
              <Table.Row key={id} className="font-normal bg-white">
                <Table.Cell>{id}</Table.Cell>
                <Table.Cell>{merchantName}</Table.Cell>
                <Table.Cell>{description}</Table.Cell>
                <Table.Cell>
                  <HiOutlinePencilSquare
                    onClick={() =>{ setState({ show: true, process: "onEdit" });setModalItem({id,merchantName,description,userName
                    })}}
                    className="cursor-pointer hover:stroke-gray-900"
                    size={20}
                  />
                </Table.Cell>
                <Table.Cell>
                  <HiOutlineTrash
                    onClick={() =>
                     { setState({ show: true, process: "onDelete" });setModalItem({id,merchantName,description,userName
                     })}
                    }
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
        <Pagination currentPage={currentPage} totalPages={pageData.total} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default TableComponent;
