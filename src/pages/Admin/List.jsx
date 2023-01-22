import React, { useState } from "react";
import Table from "../../components/Table";
import { useQuery } from "@tanstack/react-query";
import { Apis } from "../../utils/apis";
import Loading from "../../components/Loading";

const List = () => {
  const [source, setSource] = useState("");
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

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getAll"],
    queryFn: Apis.getAll,
  });

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
        <select value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="US">Telegram Bot</option>
        </select>
      </div>
      <Table headers={headers} variant={1} />
      <Table headers={headers2} variant={1} />
    </div>
  );
};

export default List;
