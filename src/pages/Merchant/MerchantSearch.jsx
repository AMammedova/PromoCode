import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

const MerchantSearch = () => {
  return (
    <div>
      <h2 className="w-full max-w-6xl mb-5 text-xl font-semibold text-center uppercase">
        Promocode
      </h2>

      <div className="flex items-center justify-center w-full gap-4">
        <div className="flex items-center justify-center w-full max-w-2xl">
          <div className="w-full max-w-xl">
            <input
              type="text"
              className="w-full px-8 py-3 bg-white rounded-l-xl placeholder:opacity-80"
              placeholder="Search..."
            />
          </div>
          <div className="flex items-center justify-center w-16 py-3 cursor-pointer bg-amber-500 rounded-r-xl hover:bg-amber-600">
            <HiOutlineSearch size={24} stroke="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantSearch;
