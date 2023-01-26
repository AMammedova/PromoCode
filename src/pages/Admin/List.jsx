import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useQuery } from "@tanstack/react-query";
import { Apis } from "../../utils/apis";
import Loading from "../../components/Loading";
import TableList from "../../components/TableList";

const List = () => {
  const [source, setSource] = useState();
  const [filteredData,setFilteredData]=useState()
  const [currentPage,setCurrentPage]=useState(1);
  console.log(source)
  const defaultValue=null;
  const { refetch: filter, ...filterData } = useQuery(
    ["filter"],
    () =>
      Apis.filter({
        sourceId: source,
        statusId: null,
        merchantId:null,
        startDate:null,
        endDate: null

      }),
    {
      enabled: false,
   
    }
  );
  const { isError, isLoading, data } = useQuery(
    ["getData"],
    Apis.getAllPromocode
    
  );
  const [getAllData,setGetAllData]=useState(data)
  console.log(getAllData,"alldata")
//   useEffect(()=>{
//     console.log(filteredData,"filteredData")
//  setFilteredData(data)
//   },[data])
  const handleFilter=async (e)=>{
    setSource(e.target.value);
    filter();
    setFilteredData(filterData)
    console.log(filterData.data,"filtirr")
    setGetAllData(filterData.data)
  
  }
  const onPageChange=(props,e)=>{
console.log(props,e.target,"pagee")
  }

  const headers = [
    "Promocode",
    "merchant",
    "description",
    "DATE start",
    "DATE END",
    "source",
    "status",
  ];

  const headers2 = [
    "Promocode",
    "merchant",
    "description",
    "Count",
    "Type",
    "source",
    "Export",
  ];

  
  return isError ? (
    <div>Error</div>
  ) : isLoading ? (
    <div>
      <Loading />
    </div>
  ) : (
    <div>
      <div className="flex items-center max-w-xs gap-2 mb-8 ">
        <label className="whitespace-nowrap">Sort by Source</label>
        <select defaultValue={defaultValue} value={source} onChange={(e) => handleFilter(e)}>
          <option defaultValue={defaultValue}>Choose an option</option>
          <option value="1">Telegram Bot</option>
          <option value="2">Whatsapp support center</option>
          <option value="3">Easysavings web-site</option>
        </select>
      </div>
      <Table headers={headers} data={getAllData} variant={1} />
      {/* <TableList headers={headers2} /> */}
    </div>
  );
};

export default List;
