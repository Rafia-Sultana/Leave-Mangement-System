import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "../components/Button.jsx";
import AddIcon from "@mui/icons-material/Add";
import SelectInput from "../components/InputFields/SelectInput.jsx";
import TextInput from "../components/InputFields/TextInput.jsx";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import totalEmployee from "../assets/styles/svg/totalEmployee.svg";
import activeEmployee from "../assets/styles/svg/activeEmployee.svg";
import leaveEmployee from "../assets/styles/svg/leaveEmployee.svg";
import onBoardEmployee from "../assets/styles/svg/onBoardEmployee.svg";
import CommonTable from "../components/CommonTable.jsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import employee from "../services/employee.jsx";
import { UserContext } from "../context api/Context.jsx";
const ManageEmployeeTable = () => {
//  const {checkedRows} = useContext(UserContext);
const navigate = useNavigate();
const isSmallScreen = useMediaQuery("(max-width:600px)");

  let summary = [
    {
      title: "Total Employee",
      numberOfEmployee: 60,
      icon: totalEmployee,
    },
    {
      title: "Active Employee",
      numberOfEmployee: 60,
      icon: activeEmployee,
    },
    {
      title: "On Leave",
      numberOfEmployee: 60,
      icon: leaveEmployee,
    },
    {
      title: "On Boarding",
      numberOfEmployee: 60,
      icon: onBoardEmployee,
    },
  ];

  const handleAddEmployee = () => {
    navigate("/dashboard/hr-add-employee");
  };
  // const [checkedRows, setCheckedRows] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState("Name");
  const [searchValue, setSearchValue] = useState("");

  function createData(id, name, joining_date, status) {
    return { id, name, joining_date, status };
  }

  // let rows2 = [
  //   createData(
  //     0,
  //     "Frozen yoghurt",
  //     "Employee",
  //     "software engineer",
  //     "software development",
  //     "active"
  //   ),
  //   createData(
  //     1,
  //     "Ice cream sandwich",
  //     "Team Lead",
  //     "urban planner",
  //     "planning",
  //     "inactive"
  //   ),
  //   createData(
  //     2,
  //     "Eclair",
  //     "Admin",
  //     "software engineer",
  //     "software development",
  //     "active"
  //   ),
  //   createData(
  //     3,
  //     "Cupcake",
  //     "Employee",
  //     "software engineer",
  //     "software development",
  //     "inactive"
  //   ),
  //   createData(
  //     4,
  //     "Gingerbread",
  //     "Employee",
  //     "software engineer",
  //     "software development",
  //     "active"
  //   ),
  // ];

  const [rows, setRows] = useState([]);

  const handleDelete = async() => {
    // Filter out the rows that are checked
 
  //  const updatedRows = rows.filter((row, index) => checkedRows[index]);

  //  let selectedEmployeeId = updatedRows[0].id
  //  console.log(updatedRows);
  //  let d = await employee.inActiveEmployee(selectedEmployeeId);
  // console.log(d);
    // setRows(updatedRows);
  };

  // const isAllValuesFalse = checkedRows.every(
  //   (obj) => Object.values(obj)[0] === false
  // );
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
      let allEmployee = await employee.getAllEmployee();

      const concatNames =(...names) =>{
        return names.filter(Boolean).join(" ");
      }
      allEmployee.map((x) => {
        const {
          emp_id,
          first_name,
          middle_name,
          last_name,
          email,
          joining_date,
          status,
          designations,
          departments,
        } = x;
        // console.log(designations,departments);

        let name = concatNames(first_name ,middle_name, last_name);
        let infoObject = createData(emp_id, name, joining_date, status);
 setRows((prev) => [...prev, infoObject]);
      });
  
      if(searchValues){
       const filteredRows = rows.filter((row) =>
            row[column].toLowerCase().includes(searchValues)
          );
          setRows(filteredRows);
       
      }
  //  console.log(handleCheckBoxInput);
      //   setCheckedRows((prev) => {
  //     let newArray = [...prev];
  //     newArray[index] = { [index]: e.target.checked };
  //     return newArray;
  //   });
    
    };
    matchedRows();
  }, [searchValue, selectedColumn]);

  const columns = [
    // { id: "check", label: "",},
    { id: "name", label: "Name", minWidth: 10 },
    { id: "role", label: "Role", minWidth: 10 },
    { id: "designation", label: "Designation ", minWidth: 10 },
    { id: "department", label: "Department", minWidth: 10 },
    { id: "status", label: "Status", minWidth: 10 },

    {
      id: "action",
      label: "Action",
      minWidth: 10,
      align: "center",
    },
  ];

  const handleInActive = async (index) => {
let emp_id = rows[index].id;
await employee.inActiveEmployee(emp_id);
const updateRows = [...rows];
updateRows[index]={...updateRows[index],status:"inactive"}
setRows(updateRows);
 };

  return (
    <div className="">
      {/* //cards */}

      <div className="grid grid-cols-2 lg:grid-cols-4">
        {summary.map((x, index) => {
          return (
            <section className="flex bg-[#add5f4] shadow-lg w-[90%] p-[5%] my-5 items-center ">
              <img
                src={x.icon}
                alt=""
                className="hidden sm:block  min-w-[35%]"
              />
              <div className="">
                <p className="font-bold text-sm xl:text-base  ">
                  {" "}
                  {x.numberOfEmployee}
                </p>
                <p className="text-sm"> {x.title}</p>
              </div>
            </section>
          );
        })}
      </div>

      <div className="grid grid-cols-5 mb-5 gap-10">
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

        <div className="col-span-3 flex justify-end gap-2 ">
          {/* <Button
            textColor={isAllValuesFalse ? "gray" : "white"}
            // btnText={"Remove"}

            backgroundColor={isAllValuesFalse ? "bg-gray" : "bg-red"}
            padding={"p-2"}
            btnIcon={DeleteIcon}
            fontSize={"sm"}
            disable={isAllValuesFalse ? true : false}
            cursor={isAllValuesFalse ? "cursor-not-allowed" : "cursor-pointer"}
            onClick={handleDelete}
          ></Button> */}
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

      <CommonTable
        rows={rows}
        columns={columns}
        // handleCheckBoxInput={handleCheckBoxInput}
        handleDelete={handleInActive}
      ></CommonTable>
    </div>
  );
};

export default ManageEmployeeTable;
