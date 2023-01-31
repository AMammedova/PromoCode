import React, { useState, useEffect } from "react";
import TableMerchant from "../../components/TableMerchant";
import { useQuery } from "@tanstack/react-query";
import { Apis } from "../../utils/apis";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Loading from "../../components/Loading";
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
  const [loadingData, setLoading] = useState(false);

  const handleData = async () => {
    try {
      const res = await Apis.getPromocodesByMerchant({
        sourceId: null,
        startDate: null,
        endDate: null,
      }).then((response) => {
        {
          setMerchantData(response?.data);
          setLoading(true)
   
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleData();
  }, []);
 
  useEffect(() => {
    setFilteredData(merchantData);
  }, [merchantData]);

  const handleExport = async (values) => {
    const response = await Apis.getExcelReportByMerchant({
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
      }).catch((error) => {
        toast.error("Promocode not found!")
    });

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
            
            try {
              const res = await Apis.getPromocodesByMerchant({
                sourceId: values.source,
                startDate: values.startDate,
                endDate: values.endDate,
              }).then((response) => {
                {
             
                  setFilteredData(response?.data);
           
                  
                }
              });
            } catch (err) {
             
              setFilteredData([]);
         
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
      {
        loadingData && loadingData ? <TableMerchant headers={headers} data={filteredData} /> : <Loading />
      }
      
    </div>
  );
};

export default MerchantReports;
