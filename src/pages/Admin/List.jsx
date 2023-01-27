import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useQuery } from "@tanstack/react-query";
import { Apis } from "../../utils/apis";
import Loading from "../../components/Loading";
import TableList from "../../components/TableList";
import Select from "react-select";
const List = () => {
  const options = [
    { value: "", label: "Choose an option" },
    { value: "1", label: "Telegram Bot" },
    { value: "2", label: "Whatsapp support center" },
    { value: "3", label: "Easysavings web-site" },
  ];
  const [filteredData,setFilteredData]=useState([])
  const [currentPage,setCurrentPage]=useState();
  const { isError, isLoading, data } = useQuery(
    ["getData"],
    Apis.getAllPromocode
  );
  const {  ...countData } = useQuery(
    ["getDataCount"],
    Apis.getAllPromocodeCount
  );

  useEffect(()=>{
    setFilteredData(data)
  },[data])


  const handleFilter= async ({value})=>{
   try {
    const res = await Apis.filter({
      sourceId: value,
      statusId: null,
      merchantId:null,
      startDate:null,
      endDate: null

    })
   setFilteredData(res) 
   } catch(err) {
    setFilteredData(data)
   }
 
}


  
  const onPageChange=(props,e)=>{

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
    "Date",
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
        <Select options={options} onChange={handleFilter} />
      </div>
      <Table headers={headers} data={filteredData} variant={1} />
      <TableList headers={headers2} data={countData}/>
    </div>
  );
};

export default List;
