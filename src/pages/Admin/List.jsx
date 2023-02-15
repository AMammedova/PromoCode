import React, { useEffect, useState } from "react";
import { Pagination } from "flowbite-react";
import Table from "../../components/Table";
import { useQuery } from "@tanstack/react-query";
import { Apis } from "../../utils/apis";
import Loading from "../../components/Loading";
import TableList from "../../components/TableList";
import TableSearch from "../../components/TableSearch";
import { HiOutlineSearch } from "react-icons/hi";
import Select from "react-select";
import { toast } from "react-toastify";
const List = () => {
  const options = [
    { value: null, label: "Choose an option" },
    { value: "1", label: "Telegram Bot" },
    { value: "2", label: "Whatsapp support center" },
    { value: "3", label: "Easysavings web-site" },
  ];
  const [filteredData, setFilteredData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [source, setSource] = useState();
  const [filterPage, setFilterPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const res = await Apis.getAllPromocode().then((response) => {
          setFilteredData(response?.data);
          setTotalPages(response?.data?.totalPages);
          setLoading(false);
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const onPageChange = async (page) => {
    setLoading(true);
    setCurrentPage(page);
    if (isFilter) {
      try {
        const res = await Apis.PromocodeFilterIndex(
          {
            sourceId: source,
            statusId: null,
            merchantId: null,
            startDate: null,
            endDate: null,
          },
          page
        );
        setIsError(false);
        setLoading(false);
        setTotalPages(res?.data?.totalPages);
        setFilteredData(res?.data);
      } catch (err) {
        setIsError(true);
        toast.error(err?.response?.data?.message[0]);
        // setFilteredData(filteredData);
      }
    } else {
      try {
        const res = await Apis.getAllPromocodeIndex(page).then((response) => {
          {
            setIsError(false);
            setLoading(false);
            setTotalPages(response?.data?.totalPages);
            setFilteredData(response?.data);
          }
        });
      } catch (err) {
        setIsError(true);
        toast.error(err?.response?.data?.message[0]);
      }
    }
  };

  const handleFilter = async ({ value }) => {
    setSource(value);
    setIsFilter(true);
    setLoading(true);
    setCurrentPage(filterPage);
    try {
      const res = await Apis.PromocodeFilterIndex(
        {
          sourceId: value,
          statusId: null,
          merchantId: null,
          startDate: null,
          endDate: null,
        },
        filterPage
      );
      setIsError(false);
      setLoading(false);
      setTotalPages(res?.data?.totalPages);
      setFilteredData(res?.data);
    } catch (err) {
      setIsError(true);
      console.log(err);
      // setFilteredData(filteredData)
    }
  };

  //Search
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState();
  const [searchData, setSearchData] = useState();
  const handleSearch = async () => {
    try {
      const res = await Apis.getSearchAdmin(searchName).then((response) => {
        {
          // setFilteredData(response)
          setSearchData(response, "sercghgh");
        }
      });
    } catch (err) {
      console.log(err);
      setMessage(err?.response?.data?.message[0]);
      toast.error(err?.response?.data?.message[0]);
    }
  };

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
      <div className="flex items-center max-w-xs gap-2 mb-8 ml-8 ">
        <label className="whitespace-nowrap">Sort by Source</label>
        <Select options={options} onChange={handleFilter} />
      </div>
      <div className="flex items-center justify-center w-full max-w-2xl mb-10">
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

      {searchData && searchData ? (
        <TableSearch headers={headers} data={searchData} />
      ) : null}
      {isError ? (
        <div>Error</div>
      ) : loading ? (
        <Loading />
      ) : (
        <div>
          <Table headers={headers} data={filteredData} variant={1} />
          <div className="flex items-center justify-end py-4 text-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
