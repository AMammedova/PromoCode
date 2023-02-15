import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { Apis } from "../../utils/apis";
const MerchantSearch = () => {
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState();
  const [messageActiveted, setMessageActivated] = useState("");
  const [color, setColor] = useState("");
  const handleSearch = async () => {
    try {
      const res = await Apis.getSearch(searchName).then((response) => {
        {
          setColor(response?.color);
          setMessage(response?.message[1]);
          setMessageActivated(response?.message[2]);
        }
      });
    } catch (err) {
      setMessageActivated("");

      setColor(err?.response?.data?.color);
      setMessage(err?.response?.data?.message[0]);
    }
  };
  return (
    <div>
      <h2 className="w-full px-8 py-10 mt-20 text-xl font-semibold text-center uppercase">
        Promocode
      </h2>

      <div className="flex items-center justify-center w-full gap-4 flex-col">
        <div className="flex items-center justify-center w-full max-w-2xl">
          <div className="w-full max-w-xl">
            <input
              type="text"
              className="w-full px-8 py-3 bg-white rounded-l-xl placeholder:opacity-80"
              placeholder="Search..."
              onChange={(e) => {
                setSearchName(e.target.value);
              }}
            />
          </div>
          <div
            className="flex items-center justify-center w-16 py-3 cursor-pointer bg-amber-500 rounded-r-xl hover:bg-amber-600"
            onClick={handleSearch}
          >
            <HiOutlineSearch size={24} stroke="white" />
          </div>
        </div>

        {message ? (
          messageActiveted ? (
            <div>
              <div
                className={`w-full text-center text-green-500  px-8 py-6 mt-6 bg-white rounded-l-xl placeholder:opacity-80`}
              >
                {messageActiveted}
              </div>
              <div
                className={`w-full text-center ${
                  color && color == "green" ? "text-green-500" : "text-red-500"
                }  px-8 py-6 mt-6 bg-white rounded-l-xl placeholder:opacity-80`}
              >
                {message}
              </div>
            </div>
          ) : (
            <div
              className={`w-1/3 text-center ${
                color && color == "green" ? "text-green-500" : "text-red-500"
              }  px-8 py-6 mt-6 bg-white rounded-l-xl placeholder:opacity-80`}
            >
              {message}
            </div>
          )
        ) : null}

        {/* {message && message.length ?  <div className={`w-1/3 text-center ${color && color=="green" ?"text-green-500" :"text-red-500" }  px-8 py-6 mt-6 bg-white rounded-l-xl placeholder:opacity-80`}>{message}</div> : null  } */}
        {/* {messageActiveted && messageActiveted ? <div className={`w-1/3 text-center text-green-500  px-8 py-6 mt-6 bg-white rounded-l-xl placeholder:opacity-80`}>{messageActiveted}</div>   : message ?  <div className={`w-1/3 text-center ${color && color=="green" ?"text-green-500" :"text-red-500" }  px-8 py-6 mt-6 bg-white rounded-l-xl placeholder:opacity-80`}>{message}</div> : null  } */}
      </div>
    </div>
  );
};

export default MerchantSearch;
