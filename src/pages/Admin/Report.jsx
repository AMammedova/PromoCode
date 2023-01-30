import React, { useState, useEffect } from "react";
import styles from "../../../styles/report.module.css";
import TableComponent from "../../components/Table";
import Loading from "../../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { Apis } from "../../utils/apis";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
const Reports = () => {
  const [optionsSelect, setOptionsSelect] = useState([""]);

  const headers = [
    "Promocode",
    "merchant",
    "description",
    "DATE start",
    "DATE END",
    "source",
    "status",
  ];
  const { isError, isLoading, data } = useQuery(
    ["getData"],
    Apis.getAllPromocode
  );
  const { ...mercdata } = useQuery(["getDataMerchant"], Apis.getAllMerchant);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(data);
    const arr = [];
    mercdata?.data?.data.map((item) => {
      return arr.push({ value: item.id, label: item.merchantName });
    });
    setOptionsSelect(arr);
  }, [data]);

  const handleExport = async (values) => {
    const response = await Apis.getExcelReport({
      sourceId: values.source,
      statusId: values.status,
      merchantId: values.merchant,
      startDate: values.startDate,
      endDate: values.endDate,
    });
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "file.xlsx");
    document.body.appendChild(link);
    link.click();
  };

  return isError ? (
    <div>Error</div>
  ) : isLoading ? (
    <div>
      <Loading />
    </div>
  ) : (
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
            try {
              const res = await Apis.filter({
                sourceId: values.source,
                statusId: values.status,
                merchantId: values.merchant,
                startDate: values.startDate,
                endDate: values.endDate,
              });
              console.log(values, "values");
              setFilteredData(res);
            } catch (err) {
              setFilteredData("");
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
                  <label className="whitespace-nowrap">Sort by Merchant</label>
                  <Field as="select" name="merchant">
                    <option value="">Select an option</option>
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
                    <option value="">Select an option</option>
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
      <TableComponent headers={headers} data={filteredData} variant={1} />
    </div>
  );
};

export default Reports;
