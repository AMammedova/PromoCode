import React, { useState } from "react";
import Table from "../../components/Table";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import Modal from "../../components/Modal";

const Merchants = () => {
  const headers = ["id", "partner", "description"];
  const [show, setShow] = useState({ show: false, process: "" });
  return (
    <div>
      <button
        onClick={() => setShow({ show: true, process: "Add" })}
        className="flex items-center justify-center gap-2 px-6 py-2 mb-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-50"
      >
        Add
        <HiOutlinePlusCircle size={20} />
      </button>
      <Table setState={setShow} headers={headers} variant={2} />
      <Modal show={show} setShow={setShow} />
    </div>
  );
};

export default Merchants;
