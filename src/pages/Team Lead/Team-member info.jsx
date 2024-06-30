import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

import Modal from "../../components/Modal";
import Cards from "../../components/Cards";
import Button from "../../components/Button";
import CommonTable from "../../components/CommonTable";
import Avatars from "../../components/Avatars";

import employee from "../../services/employee";




export const Manager_View_Each_TeamMember_Leave_Info = () => {
    const navigate = useNavigate();
    const param = useParams();
    const empId = param.empId;
  
    const [id, setId] = useState(0);
    const [rows2, setRows2] = useState([]);
    const [open, setOpen] = useState(false);
    const [employeeBasicData, setEmployeeBasicData] = useState(null);
    const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
    const role = userInfoData.role;
  
    const isSmallScreen = useMediaQuery("(max-width:600px)");
  
    const handleClickOpen = (value) => {
  
      // setId(value);
      // setOpen(true); {state:{...rows[value], show:true}}
      // console.log(empId);
      navigate(`/dashboard/view-log/${empId}`,{state:{...rows2[value],showEditButton:false}});
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const columns2 = [
      { id: "leave_name", label: "Leave Type", minWidth: 100 },
      { id: "start_date", label: "Start Date", minWidth: 170, align: "center" },
      { id: "end_date", label: "End Date", minWidth: 170, align: "center" },
      { id: "total_days", label: "Total Days", minWidth: 170, align: "center" },
      {
        id: "leave_status",
        label: "Leave Status",
        minWidth: 170,
        align: "center",
      },
      { id: "action", label: "Action", minWidth: 170, align: "center" },
    ];
  
    useEffect(() => {
      const fecthData = async () => {
        let teammembersLeaveInfos;
        if (role === "HR") {
          teammembersLeaveInfos = await employee.getEachEmployeeLeaveHistoryByHR(
            empId
          );
        } else if (role === "Team Lead") {
          teammembersLeaveInfos = await employee.getTeamRequestHistory(empId);
        }
        else if(role === "Admin") {
          teammembersLeaveInfos = await employee.getEachEmployeeLeaveHistoryByAdmin(
            empId
          );
        }
  
        const employeeBasicData = await employee.basicInfo(empId);
        setEmployeeBasicData(employeeBasicData);
        setRows2(teammembersLeaveInfos);
      };
      fecthData();
    }, []);
  
    const handleGoBack = () => {
      navigate(-1);
    };
  
    const smallScreenColumns = columns2.filter(
      (column) =>
        column.id === "leave_name" ||
        column.id === "leave_status" ||
        column.id === "action"
    );
    return (
      <div>
        <div className="flex justify-between mt-10">
          
     
          <div className="flex gap-4 items-center">
          <ArrowBackIosNewOutlinedIcon
        className="cursor-pointer"
        onClick={() => navigate(-1)}
      />
            <Avatars
              width={60} height={60}
            />
            <div className="">
              <p className="font-semibold">{employeeBasicData?.name}</p>
              <p className="text-sm">
                {employeeBasicData?.designations[0].designation}
              </p>
            </div>
          </div>
          {/* <Button
            // btnText={"Go Back"}
            // backgroundColor={"bg-[#2b84b1]"}
          
            padding={"p-1"}
            textColor="blue-dark"
            onClick={handleGoBack}
            fontWeight={"bold"}
          >Go Back</Button> */}
        </div>
  
        <div className="">
          <Cards empId={empId} />
          <CommonTable
            columns={isSmallScreen ? smallScreenColumns : columns2}
            rows={rows2}
            viewDetails={handleClickOpen}
            borderRadius={"10px"}
            maxHeight={440}
          />
        </div>
        {open && (
          <Modal open={open} handleClose={handleClose} historyData={rows2[id]} />
        )}
      </div>
    );
  };