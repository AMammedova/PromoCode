import React,{useState} from "react";
import Table from "../../components/Table";

const List = () => {
  const [source,setSource]=useState('')
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
    "Promocode",
    "merchant",
    "description",
    "Count",
    "Type",
    "source",
    "Export",
  ];
  return (
    <div>
      <div className=" w-1/4 flex justify-between items-center gap-2 py-20">
  <label className="whitespace-nowrap">Sort by Source</label>
  <select value={source} onChange={(e)=>setSource(e.target.value)}>

<option value="US">Telegram Bot</option>

</select>
</div>
      <Table headers={headers} variant={1} />
      <Table headers={headers2} variant={1} />
   
      
      
    </div>
    
  );
};

export default List;
