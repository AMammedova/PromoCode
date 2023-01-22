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
      <Table headers={headers} variant={1} />
    </div>
  );
};

export default List;
