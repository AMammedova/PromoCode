import React, { useState,useEffect } from "react";
import styles from "../../../styles/report.module.css";
import TableComponent from "../../components/Table";
import Loading from "../../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { Apis } from "../../utils/apis";
import Select from "react-select";
const Reports = () => {

  const [dateStart, setDateStart] = useState("");
  const [dateEnd,setDateEnd]=useState("");
  const [status, setStatus] = useState("");
  const [optionsSelect,setOptionsSelect]=useState([""])
  
  const headers = [
    "Promocode",
    "merchant",
    "description",
    "DATE start",
    "DATE END",
    "source",
    "status",
  ];
  const { isError, isLoading, data } = useQuery(
    ["getData"],
    Apis.getAllPromocode
    
  );
  const {  ...mercdata } = useQuery(
    ["getDataMerchant"],
    Apis.getAllMerchant
    );
   const [filteredData,setFilteredData]=useState([])

   const options = [
    { value: "", label: "Choose an option" },
    { value: "1", label: "Telegram Bot" },
    { value: "2", label: "Whatsapp support center" },
    { value: "3", label: "Easysavings web-site" },
  ];


  

    useEffect(()=>{
    setFilteredData(data)
    
   
    const arr=[];
    mercdata?.data?.data.map((item)=>{
  
      return arr.push({value:item.id,label:item.merchantName});
    })
    setOptionsSelect(arr);
    
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
const handleFilterMerchant= async ({value})=>{
  try {
   const res = await Apis.filter({
     sourceId: null,
     statusId: null,
     merchantId:value,
     startDate:null,
     endDate: null

   })
  setFilteredData(res) 
  } catch(err) {
   setFilteredData("")
  }

}


useEffect(()=>{
  handleFilterMerchant();

},[optionsSelect])

  return isError ? (
    <div>Error</div>
  ) : isLoading ? (
    <div>
      <Loading />
    </div>
  ) : (
    <div className="space-y-8">
      <div className="flex justify-between">
        <div className="flex-1">
          <div className="grid max-w-xl grid-cols-2 gap-4 py-5">
            <div className="flex items-center justify-between gap-2">
              <label className="whitespace-nowrap">Sort by Source</label>
             <Select className="w-full" options={options} onChange={handleFilter} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <label className="whitespace-nowrap">Sort by Merchant</label>
              <Select className="w-full"  options={optionsSelect} onChange={handleFilterMerchant} />
            </div>
          </div>
          <div className="grid max-w-xl grid-cols-2 gap-4 py-5">
            <div className="flex items-center justify-between gap-2">

            <label className="whitespace-nowrap">Sort by DateEnd</label>
              <input
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                type='date'
              >
                
              </input>
             
            </div>
            <div className="flex items-center justify-between gap-2">
              <label className="whitespace-nowrap">Sort by Date</label>
              <input
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                type='date'
              >
               
              </input>
            </div>
          </div>
          <div className="grid max-w-xl grid-cols-2 gap-4 py-5">
         
            <div className="flex items-center justify-between gap-2">
            <label className="whitespace-nowrap">Sort by Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="US">Used</option>
              </select>
             
            </div>
          </div>
        </div>
        <div className="">
          <button className="px-8 py-3 text-gray-600 transition-all border border-gray-400 rounded hover:bg-gray-200 hover:scale-105">
            Export
          </button>
        </div>
      </div>
      <TableComponent headers={headers} data={filteredData} variant={1} />
    </div>
  );
};

export default Reports;
