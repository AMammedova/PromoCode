import React,{useState,useEffect} from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { Apis } from "../../utils/apis";
const MerchantSearch = () => {
  const [searchName,setSearchName]=useState("");
  const [message,setMessage]=useState()
  const handleSearch=async()=>{
   
      try {
        const res = await Apis.getSearch(searchName).then((response) => {
          {
            console.log(response,"serach response")
     
          }
        });
      } catch (err) {
        console.log(err?.response?.data?.message[0]);
        setMessage(err?.response?.data?.message[0])
      }
    
  }
  return (
    <div>
      <h2 className="w-full px-8 py-10 mt-20 text-xl font-semibold text-center uppercase">
        Promocode
      </h2>

      <div className="flex items-center justify-center w-full gap-4 flex-col">
        <div className="flex items-center justify-center w-full max-w-2xl">
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
        {message && message.length ?  <div className="w-1/3 text-center text-gray-500 px-8 py-6 mt-6 bg-white rounded-l-xl placeholder:opacity-80">{message}</div> : null  }
       
      </div>
    </div>
  );
};

export default MerchantSearch;
