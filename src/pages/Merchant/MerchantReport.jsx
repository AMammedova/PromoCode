import React, { useState, useEffect } from "react";
import TableMerchant from "../../components/TableMerchant";
import { useQuery } from "@tanstack/react-query";
import { Apis } from "../../utils/apis";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Loading from "../../components/Loading";
import { Pagination } from "flowbite-react";
import { toast } from "react-toastify";
const MerchantReports = () => {
  const headers = [
    "Promocode",
    "description",
    "DATE start",
    "DATE END",
    "source",
    "status",
  ];
  const [merchantData, setMerchantData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const [filterPage, setFilterPage] = useState(1);
  const [sourceId, setSourceId] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const res = await Apis.getPromocodesByMerchant({
          sourceId: null,
          startDate: null,
          endDate: null,
        }).then((response) => {
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
        const res = await Apis.getPromocodesByMerchantIndex(
          {
            sourceId: sourceId,
            startDate: startDate,
            endDate: endDate,
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
      }
    } else {
      try {
        console.log(page, "trypage");
        const res = await Apis.getPromocodesByMerchantIndex(
          {
            sourceId: null,
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
        //toast.error(err?.response?.data);
      }
    }
  };

  const handleExport = async (values) => {
    try {
      const res = await Apis.getExcelReportByMerchant({
        sourceId: values.source,
        startDate: values.startDate,
        endDate: values.endDate,
      }).then((response) => {
        {
          const url = window.URL.createObjectURL(new Blob([response]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "file.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    } catch (err) {
      console.log(err);
      toast.error("Promocode not found!");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <Formik
          initialValues={{
            source: null,
            startDate: null,
            endDate: null,
          }}
          onSubmit={async (values) => {
            setSourceId(values.source);
            setStartDate(values.startDate);
            setEndDate(values.endDate);
            setIsFilter(true);
            setLoading(true);
            setCurrentPage(filterPage);
            try {
              const res = await Apis.getPromocodesByMerchantIndex(
                {
                  sourceId: values.source,
                  startDate: values.startDate,
                  endDate: values.endDate,
                },
                filterPage
              );
              setIsError(false);
              setLoading(false);
              setTotalPages(res?.data?.totalPages);
              setFilteredData(res?.data);
            } catch (err) {
              setIsError(true);
              setFilteredData("");
              toast.error(err?.response?.data?.message[0]);
            }
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div className="flex items-center justify-between gap-2">
                  <label className="whitespace-nowrap">Sort by Source</label>
                  <Field as="select" name="source">
                    <option value="">Select an option</option>
                    <option value="1">Telegram Bot</option>
                    <option value="2">Whatsapp support center</option>
                    <option value="3">Easysavings web-site</option>
                  </Field>
                  {values.source === "" ? setFieldValue("source", null) : null}
                </div>
                <ErrorMessage name="source" component="div" />

                <div className="flex items-center justify-between gap-2">
                  <label className="whitespace-nowrap">Sort by StartDate</label>
                  <Field
                    onChange={(e) => setFieldValue("startDate", e.target.value)}
                    value={values.startDate}
                    type="date"
                    name="dateStart"
                  />
                </div>
                <ErrorMessage name="dateStart" component="div" />
                <div className="flex items-center justify-between gap-2">
                  <label className="whitespace-nowrap">Sort by EndDate</label>
                  <Field
                    onChange={(e) => setFieldValue("endDate", e.target.value)}
                    value={values.endDate}
                    type="date"
                    name="dateEnd"
                  />
                </div>

                <ErrorMessage name="dateEnd" component="div" />
              </div>
              <button
                type="submit"
                className="px-12 py-3 bg-amber-500 rounded max-w-sm"
              >
                Apply
              </button>
              <button
                type="button"
                className="px-8 py-3 ml-3 text-gray-600 transition-all border border-gray-400 rounded hover:bg-gray-200 hover:scale-105"
                onClick={() => handleExport(values)}
              >
                Export
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {isError ? (
        <div>Error</div>
      ) : loading ? (
        <Loading />
      ) : (
        <div>
          <TableMerchant headers={headers} data={filteredData} />
          <div className="flex items-center justify-end py-4 text-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
      {/* {
        loadingData && loadingData ? <TableMerchant headers={headers} data={filteredData} /> : <Loading />
      } */}
    </div>
  );
};

export default MerchantReports;
