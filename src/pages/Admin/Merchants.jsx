import React, { useState } from "react";
import Table from "../../components/Table";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import Modal from "../../components/Modal";
import { useQuery } from "@tanstack/react-query";
import { Apis } from "../../utils/apis";
import Loading from "../../components/Loading";

const Merchants = () => {
  const headers = ["id", "partner", "description"];
  const [modalItem,setModalItem]=useState({})
  const [show, setShow] = useState({ show: false, process: "" });
  const { isError, isLoading, data } = useQuery(
    ["getDataMerchant"],
    Apis.getAllMerchant
    );
 
 
  return isError ? (
    <div>Error</div>
  ) : isLoading ? (
    <div>
      <Loading />
    </div>
  ) : (
    
    <div>
      <div className="flex items-center justify-between my-10">
        <button
          onClick={() => setShow({ show: true, process: "Add" })}
          className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-50"
        >
          Add
          <HiOutlinePlusCircle size={20} />
        </button>
        <button className="px-8 py-3 text-gray-600 transition-all border border-gray-400 rounded hover:bg-gray-200 hover:scale-105">
          Export
        </button>
      </div>
      <Table setState={setShow} headers={headers} data={data} variant={2} setModalItem={setModalItem}/>
      <Modal show={show} setShow={setShow} modalItem={modalItem}/>
    </div>
  );
};

export default Merchants;
