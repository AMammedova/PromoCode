import React, { useState, useEffect } from "react";
import { Pagination } from "flowbite-react";
import styles from "../../../styles/report.module.css";
import TableComponent from "../../components/Table";
import Loading from "../../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { Apis } from "../../utils/apis";
import Select from "react-select";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
const Reports = () => {
  const [optionsSelect, setOptionsSelect] = useState([""]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const [filterPage, setFilterPage] = useState(1);
  const [sourceId, setSourceId] = useState();
  const [statusId, setStatusId] = useState();
  const [merchantId, setMerchantId] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const headers = [
    "Promocode",
    "merchant",
    "description",
    "DATE start",
    "DATE END",
    "source",
    "status",
  ];

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

  useEffect(() => {
    async function fetchData1() {
      setLoading(true);
      const arr = [];
      try {
        const res = await Apis.getAllMerchant().then((response) => {
          setLoading(false);
          response?.data?.items.map((item) => {
            return arr.push({
              value: item.id,
              label: item.merchantName,
            });
          });
        });
        setIsError(false);
        setOptionsSelect(arr);
      } catch (err) {
        setIsError(true);
        console.log(err);
      }
    }
    fetchData1();
  }, []);

  const onPageChange = async (page) => {
    setLoading(true);
    setCurrentPage(page);
    if (isFilter) {
      try {
        const res = await Apis.PromocodeFilterIndex(
          {
            sourceId: sourceId,
            statusId: statusId,
            merchantId: merchantId,
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

  //ZipExport
  const handleExport = async (values) => {
    try {
      const res = await Apis.getExcelReport({
        sourceId: sourceId,
        statusId: statusId,
        merchantId: merchantId,
        startDate: startDate,
        endDate: endDate,
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
            merchant: null,
            startDate: null,
            endDate: null,
            status: null,
          }}
          onSubmit={async (values) => {
            setSourceId(values.source);
            setStatusId(values.status);
            setMerchantId(values.merchant);
            setStartDate(values.startDate);
            setEndDate(values.endDate);
            setIsFilter(true);
            setLoading(true);
            setCurrentPage(filterPage);
            try {
              const res = await Apis.PromocodeFilterIndex(
                {
                  sourceId: values.source,
                  statusId: values.status,
                  merchantId: values.merchant,
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
                    <option value="">All</option>
                    <option value="1">Telegram Bot</option>
                    <option value="2">Whatsapp support center</option>
                    <option value="3">Easysavings web-site</option>
                  </Field>
                  {values.source === "" ? setFieldValue("source", null) : null}
                </div>
                <ErrorMessage name="source" component="div" />
                <div className="flex items-center justify-between gap-2">
                  <label className="whitespace-nowrap">Sort by Merchant</label>
                  <Field as="select" name="merchant">
                    <option value="">All</option>
                    {optionsSelect?.map(({ value, label }) => (
                      <option value={value}>{label}</option>
                    ))}
                  </Field>
                  {values.merchant === ""
                    ? setFieldValue("merchant", null)
                    : null}
                </div>
                <ErrorMessage name="merchant" component="div" />
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
                <div className="flex items-center justify-between gap-2">
                  <label className="whitespace-nowrap">Sort by Status</label>
                  <Field as="select" name="status">
                    <option value="">All</option>
                    <option value="1">Used</option>
                    <option value="2">Unused</option>
                  </Field>
                  {values.status === "" ? setFieldValue("status", null) : null}
                </div>
                <ErrorMessage name="select4" component="div" />
              </div>
              <button
                type="submit"
                className="px-12 py-3 bg-amber-500 rounded max-w-sm"
              >
                Apply
              </button>
              <button
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
          <TableComponent headers={headers} data={filteredData} variant={1} />
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

export default Reports;
