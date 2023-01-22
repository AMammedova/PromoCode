import React from "react";
import Table from "../../components/Table";

const List = () => {
  const headers = [
    "Promocode",
    "merchant",
    "description",
    "DATE start",
    "DATE END",
    "source",
    "status",
  ];
  return (
    <div>
      <Table headers={headers} />
    </div>
  );
};

export default List;
