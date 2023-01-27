import React,{useState,useEffect} from 'react'
import styles from '../../styles/generate.module.css'
import { useQuery } from "@tanstack/react-query";
import { Apis } from "../utils/apis";
import Select from "react-select";
const RandomGenerate = () => {
  const [count, setCount] = useState();
  const [description, setDescription] = useState("");
  const [merchant,setMerchant]=useState('');
  const [source,setSource]=useState('');
  const [dateStart,setDateStart]=useState('');
  const [dateEnd,setDateEnd]=useState('');
  const handleCount = (e) => setCount(e.target.value);
  const handleDescription=(e)=>setDescription(e.target.value)
  const handleDateStart=(e)=>setDateStart(e.target.value)
  const handleDateEnd=(e)=>setDateEnd(e.target.value)
  const [optionsSelect,setOptionsSelect]=useState([""])
  
  

  const {  ...mercdata } = useQuery(
    ["getDataMerchant"],
    Apis.getAllMerchant
    );
    useEffect(()=>{
      const arr=[];
      mercdata?.data?.data.map((item)=>{
     
        return  arr.push({value:item.merchantName,label:item.merchantName});
      })
      setOptionsSelect(arr);
    },[optionsSelect])
    
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
  const { refetch: addRandom, data } = useQuery(
    ["randomGenerate"],
    () =>
      Apis.addRandom({
        description:description,
        sourceId:source,
        typeId:2,
        startDate:dateStart,
        endDate:dateEnd,
        merchantName:merchant
      },count),
    {
      enabled: false,
    }
  );
  const handleGenerate = async (e) => {
   
    addRandom();

  };

  return (
    <div className={styles.RandomGenerate}>
        <div className={`${styles.RandomItem} grid grid-cols-2 gap-4`}>
            <div className={`${styles.ItemContainer}`}>
            <label>Count</label>
        <input
                  type="number"
                  className=" px-5 py-3 rounded-md"
                  placeholder="Count"
                  value={count}
                  onChange={handleCount}
                    
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

<div className='w-1/2 flex justify-center items-center'>

        <button className="w-full max-w-xs text-xl rounded-md submit text-gray-50 bg-gradient-to-r mt-12 py-3 hover:scale-105 transition-all from-[#F25019] to-[#F79E1B]" onClick={handleGenerate}>
                Generate
              </button>
</div>
    </div>
  )
}

export default RandomGenerate