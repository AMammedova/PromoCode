import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import Modal from "../../components/Modal";
import { useQuery } from "@tanstack/react-query";
import { Apis } from "../../utils/apis";
import Loading from "../../components/Loading";
import { Pagination} from "flowbite-react";
const Merchants = () => {
  const headers = ["id", "partner", "description"];
  const [modalItem,setModalItem]=useState({})
  const [show, setShow] = useState({ show: false, process: "" });
  const [filteredData,setFilteredData]=useState([])
  const [totalPages,setTotalPages]=useState(0)
  const [loading, setLoading] = useState(false);
  const [isError,setIsError]=useState(false)
 
  const [currentPage, setCurrentPage] = useState(1);

useEffect(()=>{
  setLoading(true);
  
  try{
    const res= Apis.getAllMerchantIndex().then((response)=>{setFilteredData(response?.data);setTotalPages(response?.data?.totalPages);setLoading(false);});

  }catch(err){
    console.log(err)
  }
  
},[])


  const onPageChange=async(page)=>{
    setLoading(true);
    setCurrentPage(page)
    try {
      const res = await Apis.getAllMerchantIndex(page).then((response) => {
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
   
 
  return isError ? (
    <div>Error</div>
  ) : loading ? (
    <div>
      <Loading />
    </div>
  ) : (
    
    <div>
      <div className="flex items-center justify-between my-10">
        <button
          onClick={() => setShow({ show: true, process: "Add" })}
          className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-50"
        >
          Add
          <HiOutlinePlusCircle size={20} />
        </button>
        {/* <button className="px-8 py-3 text-gray-600 transition-all border border-gray-400 rounded hover:bg-gray-200 hover:scale-105">
          Export
        </button> */}
      </div>
      <Table setState={setShow} headers={headers} data={filteredData} variant={2} setModalItem={setModalItem}/>
      <Modal show={show} setShow={setShow} modalItem={modalItem}/>
      <div className="flex items-center justify-end py-4 text-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default Merchants;
