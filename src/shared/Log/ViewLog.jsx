import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import HeadLine from "../../components/HeadLine";
import CommonTable from "../../components/CommonTable";

import Leave_Details from "../../pages/Employee/Details";
import employee from "../../services/employee";

import { Manager_Leave_Approval } from "../../pages/Team Lead/Approval";
import { useSnackbar } from "notistack";

const ViewLog = () => {
  const { empId } = useParams();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  let historyData = location.state;
  console.log(historyData);
  const navigate = useNavigate();
  const [logData, setLogData] = useState([]);

  const columns = [
    { id: "sender", label: "Sender", minWidth: 100 },

    {
      id: "sent_to",
      label: "Sent To",
      minWidth: 170,
      align: "center",
    },
    {
      id: "comments",
      label: "Comments",
      minWidth: 170,
      align: "right",
    },

    {
      id: "status",
      label: "Status",
      minWidth: 170,
      align: "center",
    },
    {
      id: "timestamp",
      label: "Date",
      minWidth: 170,
      align: "center",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const logData = await employee?.getLog(historyData.application_id);
      setLogData(logData);
    };

    fetchData();
  }, [historyData]);

  const handleEditButton = () => {
    const data = {
      ...historyData,
      btnText: "Send To Employee",
      headerText: "Edit Leave Application",
    };
    navigate("/dashboard/manager-edit-leave-application", { state: data });
  };

  return (
    <div className="w-full">
      <HeadLine text={"History Details"} />

      <div className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <Leave_Details info={historyData} editButton={handleEditButton}  />

          {historyData.show === true && (
            <Manager_Leave_Approval
              applicationId={historyData?.application_id}
            />
          )}
        </div>


{ logData.length > 0?
 <CommonTable
 columns={columns}
 rows={logData.length > 0 ? logData : ["not available"]}
 maxHeight={500}
/>
: null
}
        {/* <CommonTable
          columns={columns}
          rows={logData.length > 0 ? logData : ["not available"]}
        /> */}
      </div>
    </div>
  );
};

export default ViewLog;
