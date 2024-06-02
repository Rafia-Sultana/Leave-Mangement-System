import Button from "../components/Button.jsx";
import AddIcon from "@mui/icons-material/Add";
import SelectInput from "../components/InputFields/SelectInput.jsx";
import TextInput from "../components/InputFields/TextInput.jsx";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import totalEmployee from "../assets/styles/svg/totalEmployee.svg";
import activeEmployee from "../assets/styles/svg/activeEmployee.svg";
import leaveEmployee from "../assets/styles/svg/leaveEmployee.svg";
import onBoardEmployee from "../assets/styles/svg/onBoardEmployee.svg";
import CommonTable from "../components/CommonTable.jsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import employee from "../services/employee.jsx";
import FormateDate from "../utils/FormateDate.js";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LottiePlayers from "../components/LottiePlayers.jsx";

const ManageEmployeeTable = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  let cardIcons = [
    totalEmployee,
    activeEmployee,
    leaveEmployee,
    onBoardEmployee,
  ];
  const handleAddEmployee = () => {
    navigate("/dashboard/hr-add-employee");
  };

  const [selectedColumn, setSelectedColumn] = useState("Name");
  const [searchValue, setSearchValue] = useState("");
  const [rows, setRows] = useState([]);
  const [summary, setSummary] = useState([]);

  function createData(
    emp_id,
    name,
    email,
    joining_date,
    status,
    role,
    primary_dept,
    primary_des,
    secondary_dept_1,
    secondary_des_1,
    secondary_dept_2,
    secondary_des_2
  ) {
    return {
      emp_id,
      name,
      email,
      joining_date,
      status,
      role,
      primary_dept,
      primary_des,
      secondary_dept_1,
      secondary_des_1,
      secondary_dept_2,
      secondary_des_2,
    };
  }

  const getSelectedValue = (e) => {
    setSelectedColumn(e.target.value);
  };

  const handleSearchValue = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchValue(searchValue);
  };

  useEffect(() => {
    const matchedRows = async () => {
      let column = selectedColumn?.toLowerCase();
      let searchValues = searchValue?.toLowerCase();

      const [cardsInfo,allEmployee] = await Promise.all([employee.getCardsInfoOfEmployeesByHR(),
      employee.getAllEmployee()]
      )
      setSummary(cardsInfo);

      const concatNames = (...names) => {
        return names.filter(Boolean).join(" ");
      };
      allEmployee.map((x) => {
        let {
          emp_id,
          first_name,
          middle_name,
          last_name,
          email,
          joining_date,
          status,
          dept_des,
          role,
        } = x;

        let name = concatNames(first_name, middle_name, last_name);
        let primary_dept = dept_des?.primary?.dept_name;
        let primary_des = dept_des?.primary?.des_name;
        let secondary_dept_1 = dept_des?.secondary[0]?.dept_name;
        let secondary_des_1 = dept_des?.secondary[0]?.des_name;
        let secondary_dept_2 = dept_des?.secondary[1]?.dept_name;
        let secondary_des_2 = dept_des?.secondary[1]?.des_name;
        status = status?.charAt(0).toUpperCase() + status?.slice(1);
        let infoObject = createData(
          emp_id,
          name,
          email,
          FormateDate(new Date(joining_date)),
          status,
          role,
          primary_dept,
          primary_des,
          secondary_dept_1,
          secondary_des_1,
          secondary_dept_2,
          secondary_des_2
        );

        infoObject;
        setRows((prev) => [...prev, infoObject]);
      });

      if (searchValues) {
        const filteredRows = rows.filter((row) =>
          row[column].toLowerCase().includes(searchValues)
        );
        setRows(filteredRows);
      }
    };
    matchedRows();
  }, [searchValue, selectedColumn]);

  const columns = [
    { id: "name", label: "Name", minWidth: 10 },
    { id: "role", label: "Role", minWidth: 10 },
    { id: "primary_des", label: " Designation ", minWidth: 10 },
    { id: "primary_dept", label: "Department", minWidth: 10 },
    { id: "joining_date", label: "Joining Date", minWidth: 10 },
    { id: "status", label: "Status", minWidth: 10 },

    {
      id: "action",
      label: "Action",
      minWidth: 10,
      align: "center",
    },
  ];

  const handleInActive = async (index) => {
    let emp_id = rows[index].emp_id;
    await employee.inActiveEmployee(emp_id, { status: "inactive" });
    const updateRows = [...rows];
    updateRows[index] = { ...updateRows[index], status: "Inactive" };
    setRows(updateRows);
  };

  const handleActive = async (index) => {
    let emp_id = rows[index].emp_id;
    await employee.inActiveEmployee(emp_id, { status: "active" });
    const updateRows = [...rows];
    updateRows[index] = { ...updateRows[index], status: "Active" };
    setRows(updateRows);
  };
  const viewDetails = (index, empId) => {
    let empDetails = rows.find((x) => x.emp_id === empId);
    navigate(`/dashboard/view-add-emp/${empId}`, { state: empDetails });
  };
  
const handleOnLeaveEmployee = useCallback( () => {
  navigate("/dashboard/hr-view-on-leave");
  },[navigate])
  return (
    <div className="">
      {/* //cards */}

      <div className="grid grid-cols-2 lg:grid-cols-4 my-5">
      {summary.length > 0 ? (
          summary.map((x, index) => (
            <section className="flex bg-[#add5f4] shadow-lg p-[5%] m-[3%] lg:m-[5%] items-center" key={index}>
              <img
                src={cardIcons[index]}
                alt=""
                className="hidden sm:block min-w-[35%]"
              />
              <div>
                <p className="font-bold text-sm xl:text-base">
                  {x.numberOfEmployee}
                </p>
                <p className="text-sm">{x.title}</p>
              </div>
            </section>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center">
            <p className="">loading......</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-5 mb-5 gap-3">
        <div className="col-span-1">
          <SelectInput
            placeholder={"Column"}
            options={["Name", "Designation", "Department", "Status"]}
            variant="standard"
            getSelectedValue={getSelectedValue}
          ></SelectInput>
        </div>
        <div className="">
          <TextInput
            variant="standard"
            label={"Value"}
            onchange={handleSearchValue}
          ></TextInput>
        </div>

        <div className="col-span-3 flex justify-end gap-3">
          <Button
            textColor={"white"}
            btnText={"On Leave"}
            backgroundColor={"bg-[#D24F3E]"}
            padding={"p-2"}
            btnIcon={AccessTimeIcon}
            onClick={handleOnLeaveEmployee}
            fontSize={"sm"}
          ></Button>
          <Button
            textColor={"white"}
            btnText={"Add Employee"}
            backgroundColor={"bg-[#add5f4]"}
            padding={"p-2"}
            btnIcon={AddIcon}
            onClick={handleAddEmployee}
            fontSize={"sm"}
          ></Button>
        </div>
      </div>


      <div className="mt-5">
        {rows.length === 0 ? (
        <LottiePlayers src="https://lottie.host/1a4165a8-80b0-4ddc-a267-4517694bc515/7pIEzJlIzw.json" />
        ) : (
          <CommonTable
          rows={rows}
          columns={columns}
          handleDelete={handleInActive}
          handleActive={handleActive}
          viewDetails={viewDetails}
          maxHeight={isSmallScreen ? 500 : 450}
        ></CommonTable>
        )}
      </div>

    </div>
  );
};

export default ManageEmployeeTable;
