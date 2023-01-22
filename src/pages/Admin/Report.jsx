import React ,{useState} from "react";
import styles from '../../../styles/report.module.css'
const Reports = () => {
  const [merchant,setMerchant]=useState('');
  const [source,setSource]=useState('');
  const [dateStart,setDateStart]=useState('');
  const [status,setStatus]=useState('');
  return <div className='flex justify-between'>
   <div  className="w-1/2">
     <div className="grid grid-cols-2 gap-4 py-5">
<div className="flex justify-between items-center gap-2">
  <label className="whitespace-nowrap">Sort by Source</label>
  <select value={source} onChange={(e)=>setSource(e.target.value)}>

<option value="US">Telegram Bot</option>

</select>
</div>
<div className="flex justify-between items-center gap-2">
  <label className="whitespace-nowrap">Sort by Merchant</label>
  <select value={merchant} onChange={(e)=>setMerchant(e.target.value)}>

<option value="US">FRYDAY</option>

</select>
</div>


    </div>
    <div className="grid grid-cols-2 gap-4 py-5">
<div className="flex justify-between items-center gap-2">
  <label className="whitespace-nowrap">Sort by Status</label>
  <select value={status} onChange={(e)=>setStatus(e.target.value)}>

<option value="US">Used</option>

</select>
</div>
<div className="flex justify-between items-center gap-2">
  <label className="whitespace-nowrap">Sort by Date</label>
  <select value={dateStart} onChange={(e)=>setDateStart(e.target.value)}>

<option value="US">Date</option>

</select>
</div>
    </div>
   </div>
    <div className=''>
 <button className="border border-gray-400 px-8 py-3 rounded text-gray-600">Export</button>
</div>
  </div>;
};

export default Reports;
