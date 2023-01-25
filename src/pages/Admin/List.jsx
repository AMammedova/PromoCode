import React, { useState } from "react";
import Table from "../../components/Table";
import { useQuery } from "@tanstack/react-query";
import { Apis } from "../../utils/apis";
import Loading from "../../components/Loading";
import TableList from "../../components/TableList";

const List = () => {
  const [source, setSource] = useState();
  console.log(source)
  const { refetch: filter, filterData } = useQuery(
    ["filter"],
    () =>
      Apis.filter({
        sourceId: source,
        statusId: null,
        merchantId:null,
        startDate:null,
        endDate: null

      }),
    {
      enabled: false,
    }
  );
  const handleFilter=(e)=>{
    setSource(e.target.value);
    filter();
    console.log(filterData,'filterdatatable')
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
    "Promocode",
    "merchant",
    "description",
    "Count",
    "Type",
    "source",
    "Export",
  ];

  const { isError, isLoading, data } = useQuery(
    ["getData"],
    Apis.getAllPromocode
    
  );
  return isError ? (
    <div>Error</div>
  ) : isLoading ? (
    <div>
      <Loading />
    </div>
  ) : (
    <div>
      <div className="flex items-center max-w-xs gap-2 mb-8 ">
        <label className="whitespace-nowrap">Sort by Source</label>
        <select value={source} onChange={(e) => handleFilter(e)}>
          <option value={null} selected></option>
          <option value="1">Telegram Bot</option>
          <option value="2">Whatsapp support center</option>
          <option value="3">Easysavings web-site</option>
        </select>
      </div>
      <Table headers={headers} data={data} variant={1} />
      <TableList headers={headers2} data={data} />
    </div>
  );
};

export default List;
