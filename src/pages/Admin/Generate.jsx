import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs } from "flowbite-react";
import RandomGenerate from "../../components/RandomGenerate";
import CustomGenerate from "../../components/CustomGenerate";
import { Apis } from "../../utils/apis";
import { useQuery } from "@tanstack/react-query";
import TableList from "../../components/TableList";
import Loading from "../../components/Loading";
import { Pagination} from "flowbite-react";
const Generate = () => {
  const [loading, setLoading] = useState(false);
  const [isError,setIsError]=useState(false)
  const [totalPages,setTotalPages]=useState(0)
  const [filteredData,setFilteredData]=useState([])
  const [currentPage, setCurrentPage] = useState(1);
const headers2 = [
    "Date",
    "merchant",
    "description",
    "Count",
    "Type",
    "source",
    "Export",
  ];
  useEffect(()=>{
    setLoading(true);
    
    try{
      const res= Apis.getAllPromocodeCount().then((response)=>{setFilteredData(response?.data);setTotalPages(response?.data?.totalPages);setLoading(false);});
  
    }catch(err){
      console.log(err)
    }
    
  },[])
  const onPageChange=async(page)=>{
    setLoading(true);
    setCurrentPage(page)
    try {
      const res = await Apis.getAllPromocodeCountIndex(page).then((response) => {
        {
          setLoading(false);
          setFilteredData(response?.data)
       
        
          
   
        }
      });
    } catch (err) {
      setIsError(true)
   toast.error(err?.response?.data?.message[0])
    }

      
  }
  return (
    <div>
      <Tabs.Group style="pills" className="gap-4">
        <Tabs.Item active={true} title="Random">
          <RandomGenerate />
        </Tabs.Item>
        <Tabs.Item title="Custom">
          <CustomGenerate />
        </Tabs.Item>
        <Tabs.Item title="List">
          {
            isError ? (
    <div>Error</div>
  ) : loading ? (
    <div>
      <Loading />
    </div>
  ) :  (
  <div>
    <TableList headers={headers2} data={filteredData}/>

<div className="flex items-center justify-end py-4 text-center">
  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
</div>
    </div>)

          }
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
};

export default Generate;
