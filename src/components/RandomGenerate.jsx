import React,{useState} from 'react'
import styles from '../../styles/generate.module.css'
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
  const handleMerchant=(e)=>setMerchant(e.target.value)
  const handleSource=(e)=>setDsetSourceteEnd(e.target.value)

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
            <select value={source} onChange={handleSource}>

  <option value="US">United States</option>
 
</select>
            </div>
            <div className={styles.ItemContainer}>
            <label>Merchant</label>
            <select value={merchant} onChange={handleMerchant}>
 
  <option value="US">United States</option>
 
</select>
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

        <button className="w-full max-w-xs text-xl rounded-md submit text-gray-50 bg-gradient-to-r mt-12 py-3 hover:scale-105 transition-all from-[#F25019] to-[#F79E1B]">
                Generate
              </button>
</div>
    </div>
  )
}

export default RandomGenerate