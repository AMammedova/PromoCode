import React,{useState,useEffect} from 'react'
import styles from '../../styles/generate.module.css'
import { useQuery } from "@tanstack/react-query";
import { Apis } from "../utils/apis";
import Select from "react-select";
import { toast } from 'react-toastify';
import { Spinner } from "flowbite-react";

const CustomGenerate = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState("");
  const [merchant,setMerchant]=useState('');
  const [source,setSource]=useState();
  const [dateStart,setDateStart]=useState('');
  const [dateEnd,setDateEnd]=useState('');
  const [limit,setLimit]=useState(0);
  const handleName = (e) => setName(e.target.value);
  const handleDescription=(e)=>setDescription(e.target.value)
  const handleDateStart=(e)=>setDateStart(e.target.value)
  const handleDateEnd=(e)=>setDateEnd(e.target.value)
  const handleLimit=(e)=>setLimit(e.target.value)
  const [optionsSelect,setOptionsSelect]=useState([""])
  const [loading, setLoading] = useState(false);
  const [isError,setIsError]=useState(false)
  const [data,setData]=useState([])

 
  useEffect(()=>{
 async function fetchData(){
  setLoading(true);
  const arr=[];
  try{
    const res= await Apis.getAllMerchant().then((response)=>{setData(response?.data);setLoading(false);
      response?.data?.map((item)=>{
 
        return  arr.push({value:item.merchantName,label:item.merchantName});
      })
    });
    setOptionsSelect(arr);
  }catch(err){
    console.log(err)
  }
  
 }
 fetchData();
  },[])


  const handleMerchant=({value})=>{
    setMerchant(value)
  }


  const options = [
    { value: "", label: "Choose an option" },
    { value: "1", label: "Telegram Bot" },
    { value: "2", label: "Whatsapp support center" },
    { value: "3", label: "Easysavings web-site" },
  ];
  const handleSource=({value})=>{
    setSource(value);
   
  }

 
  const handleGenerate = async (e) => {

    if(name=="" || name==null){
      toast.error("Name cannot be empty!")
    }
    else if(description==null || description==""){
      toast.error("Description  cannot be empty!")
    }
    else if(source==null || source==""){
      toast.error("Source cannot be empty!")
    }
    else if(merchant==null || merchant==""){
      toast.error("Merchant cannot be empty!")
    }
    else if(dateStart==null || dateStart==""){
      toast.error("DateStart cannot be empty!")
    }
    else if(dateEnd==null || dateEnd==""){
      toast.error("DateEnd cannot be empty!")
    }
    else if(limit==null || limit==0){
      toast.error("Limit cannot be empty!")
    }
    else{
      setLoading(true);
      try {
        const res = await Apis.addCostum({
          name: name,
          limit: limit,
          description:description,
          sourceId:source,
          typeId:3,
          startDate:dateStart,
          endDate:dateEnd,
          merchantName:merchant
        }).then((response) => {
          {
          setLoading(false);
            toast.success(response.message[0])
            
     
          }
        });
      }catch (err) {

    toast.error(err?.response?.data?.message[0])
      }
  
    }
   
   
  };



  return (
    <div className={styles.RandomGenerate}>
        <div className={`${styles.RandomItem} grid grid-cols-2 gap-4`}>
            <div className={`${styles.ItemContainer}`}>
            <label>Name</label>
        <input
                  type="text"
                  className=" px-5 py-3 rounded-md"
                  placeholder="Name"
                  value={name}
                  onChange={handleName}
                    
                />
            </div>
            <div className={styles.ItemContainer}>
            <label>Description</label>
        <input
                  type="text"
                  className=" px-5 py-3 rounded-md"
                  placeholder="Description"
                  value={description}
                  onChange={handleDescription}
                
                  
                />
            </div>
  
               
        </div>
        <div className={`${styles.RandomItem} grid grid-cols-2 gap-4`}>
            <div className={styles.ItemContainer}>
            <label>Source</label>
            <Select options={options} onChange={handleSource} />
            </div>
            <div className={styles.ItemContainer}>
            <label>Merchant</label>
            <Select options={optionsSelect} onChange={handleMerchant} />
            </div>
           
        </div>
        <div className={`${styles.RandomItem} grid grid-cols-2 gap-4`}>
            <div className={`${styles.ItemContainer}`}>
            <label>Date Start</label>
        <input
                  type="date"
                  className=" px-5 py-3 rounded-md"
                  placeholder="Date Start"
                  value={dateStart}
                  onChange={handleDateStart}
                    
                />
            </div>
            <div className={styles.ItemContainer}>
            <label>Date End</label>
        <input
                  type="date"
                  className=" px-5 py-3 rounded-md"
                  placeholder="Date End"
                  value={dateEnd}
                  onChange={handleDateEnd}
                
                  
                />
            </div>
  
               
        </div>
        <div className={`${styles.RandomItem} grid grid-cols-2 gap-4`}>
            <div className={`${styles.ItemContainer}`}>
            <label>Limit</label>
        <input
                  type="number"
                  className=" px-5 py-3 rounded-md"
                  placeholder="Limit"
                  value={limit}
                  onChange={handleLimit}
                    
                />
            </div>
           
  
               
        </div>

<div className='w-1/2 flex justify-center items-center'>

{loading ? (
    <button className="w-full max-w-xs text-xl rounded-md submit text-gray-50 bg-gradient-to-r mt-12 py-3 hover:scale-105 transition-all from-[#F25019] to-[#F79E1B]">
        <Spinner size="xl" color="warning" />
  </button>

      
      ) : (
        <button className="w-full max-w-xs text-xl rounded-md submit text-gray-50 bg-gradient-to-r mt-12 py-3 hover:scale-105 transition-all from-[#F25019] to-[#F79E1B]" onClick={handleGenerate}>
        Generate
      </button>
      )}
</div>
    </div>
  )
}

export default CustomGenerate