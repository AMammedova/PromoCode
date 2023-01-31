import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useQuery } from "@tanstack/react-query";
import { Apis } from "../../utils/apis";
import Loading from "../../components/Loading";
import TableList from "../../components/TableList";
import TableSearch from "../../components/TableSearch";
import { HiOutlineSearch } from "react-icons/hi";
import Select from "react-select";
import { toast } from "react-toastify";
const List = () => {
  const options = [
    { value: "", label: "Choose an option" },
    { value: "1", label: "Telegram Bot" },
    { value: "2", label: "Whatsapp support center" },
    { value: "3", label: "Easysavings web-site" },
  ];
  const [filteredData,setFilteredData]=useState([])
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
    console.log(res,"ress")
   setFilteredData(res) 
   } catch(err) {
    setFilteredData(data)
    
   }
 
}

//Search
const [searchName,setSearchName]=useState("");
  const [message,setMessage]=useState()
  const [searchData,setSearchData]=useState()
  const handleSearch=async()=>{
   
      try {
        const res = await Apis.getSearchAdmin(searchName).then((response) => {
          {
           console.log(response?.data)
           console.log(response?.data?.sourceName)
           console.log(Object.entries(response.data))

            // setFilteredData(response) 
            setSearchData(response,"sercghgh")
          
     
          }
        });
      } catch (err) {
        console.log(err)
        setMessage(err?.response?.data?.message[0])
        toast.error(err?.response?.data?.message[0])
      }
 
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
      <div className="flex items-center max-w-xs gap-2 mb-8 ml-8 ">
        <label className="whitespace-nowrap">Sort by Source</label>
        <Select options={options} onChange={handleFilter} />
      </div>
      <div className="flex items-center justify-center w-full max-w-2xl mb-10">
      <div className="w-full max-w-xl">
            <input
              type="text"
              className="w-full px-8 py-3 bg-white rounded-l-xl placeholder:opacity-80"
              placeholder="Search..."
              onChange={(e)=>{setSearchName(e.target.value)}}
            />
          </div>
          <div className="flex items-center justify-center w-16 py-3 cursor-pointer bg-amber-500 rounded-r-xl hover:bg-amber-600" onClick={handleSearch}>
            <HiOutlineSearch size={24} stroke="white" />
          </div>
      </div>

     {searchData && searchData ? <TableSearch headers={headers} data={searchData} />  : null}
      <Table headers={headers} data={filteredData} variant={1} />
      <TableList headers={headers2} data={countData}/>
    </div>
  );
};

export default List;
