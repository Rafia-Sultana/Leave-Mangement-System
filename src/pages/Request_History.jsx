import React, { useContext, useState } from "react";
import { MyContext } from "../context api/Context";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { Worker, Viewer, ScrollMode, ViewMode } from "@react-pdf-viewer/core";
import compressedFile from "../PdfFiles/compressed.tracemonkey-pldi-09.pdf";
import jstTopic from "../PdfFiles/JS_TOPICS.pdf";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Request_History = () => {
  const navigate = useNavigate();
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const { allFormData } = useContext(MyContext);
  const handleViewDetails = (id) => {
    // console.log('view details',id);
    const filteredLeaveData = allFormData.filter((item) => item.id === id);
    // console.log(filteredLeaveData);
    navigate("/dashboard/view-employee-details", {
      state: {
        filteredLeaveData,
      },
    });
  };
  const handleViewFile = (id) => {
    // console.log('view files',id);
    setShowPdfViewer(true);
  };

  return (
    <div>
      <select className="select select-success w-full max-w-xs">
  <option disabled selected>Filter by status</option>
  <option className="text-blue">pending</option>
  <option className="text-red">rejected</option>
  <option className="text-green">approved</option>

</select>
      {showPdfViewer ? (
        <div className="max-h-screen overflow-y-auto">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
              fileUrl={compressedFile}
              plugins={[defaultLayoutPluginInstance]}
            ></Viewer>
          </Worker>
        </div>
      ) : (
        <div className="overflow-x-auto mt-10">
          <table className="w-full table-auto">
            <thead className="bg-gray-lighter">
              <tr className="text-sm font-semibold text-gray-700">
                <th className="py-2 ">Type of leave</th>
                <th className="py-2 ">Start Date</th>
                <th className="py-2 ">End Date</th>
                <th className="py-2 ">Total Days</th>
                <th className="py-2 ">Leave Status</th>
                <th className="py-2 ">Action</th>
                <th className="py-2 ">Attachment</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {allFormData.map((item, index) => {
                const { leaveType, from, to, numberOfDays, id } = item;
                return (
                  <tr key={index} className="even:bg-gray-lightest ">
                    <td className="py-2 pl-12">{leaveType}</td>
                    <td className="py-2 pl-12">{from}</td>
                    <td className="py-2 pl-12">{to}</td>
                    <td className="py-2 pl-12">{numberOfDays}</td>
                    <td className="py-2 pl-12">Pending</td>
                    <td className="py-2 pl-12">
                      {/* <button className="bg-blue-500 text-white py-1 px-2 rounded">View Details</button> */}
                      <Button
                       
                        fontSize="normal"
                        textColor="black"
                        btnText="view details"
                        width=""
                        type="button"
                        bg="blue"
                        onClick={() => handleViewDetails(id)}
                      />
                    </td>
                    <td className="py-2 pl-12">
                      {/* <button className="bg-green-500 text-white py-1 px-2 rounded">View File</button> */}
                      <Button
                        
                        fontSize="normal"
                        textColor="black"
                        btnText="view file"
                        width=""
                        type="button"
                        bg="green"
                        onClick={() => handleViewFile(id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Request_History;
