import Button from "../components/Button.jsx";
import AddIcon from "@mui/icons-material/Add";
import SelectInput from "../components/InputFields/SelectInput.jsx";
import TextInput from "../components/InputFields/TextInput.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import totalEmployee from "../assets/styles/svg/totalEmployee.svg";
import activeEmployee from "../assets/styles/svg/activeEmployee.svg";
import leaveEmployee from "../assets/styles/svg/leaveEmployee.svg";
import onBoardEmployee from "../assets/styles/svg/onBoardEmployee.svg";
import CommonTable from "../components/CommonTable.jsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import employee from "../services/employee.jsx";
import FormateDate from "../utils/FormateDate.js";

const ManageEmployeeTable = () => {
const navigate = useNavigate();
const isSmallScreen = useMediaQuery("(max-width:768px)");

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
 
  const [selectedColumn, setSelectedColumn] = useState("Name");
  const [searchValue, setSearchValue] = useState("");

  function createData(emp_id, name,email, joining_date, status,role,primary_dept,primary_des,secondary_dept_1,
    secondary_des_1,secondary_dept_2,secondary_des_2) {
    return { emp_id, name,email, joining_date, status,role,primary_dept,primary_des,secondary_dept_1,
      secondary_des_1,secondary_dept_2,secondary_des_2 };
  }

  

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
        let{
          emp_id,
          first_name,
          middle_name,
          last_name,
          email,
          joining_date,
          status,
          dept_des,role
        } = x;
   
    

        let name = concatNames(first_name ,middle_name, last_name);
        let primary_dept = dept_des?.primary?.dept_name;
        let primary_des = dept_des?.primary?.des_name;
        let secondary_dept_1 = dept_des?.secondary[0]?.dept_name;
        let secondary_des_1 = dept_des?.secondary[0]?.des_name;
        let secondary_dept_2 = dept_des?.secondary[1]?.dept_name;
        let secondary_des_2 = dept_des?.secondary[1]?.des_name;
         status = status?.charAt(0).toUpperCase() + status?.slice(1);
        let infoObject = createData(emp_id, name,email, FormateDate(new Date(joining_date)), status,role,primary_dept,primary_des,secondary_dept_1,
        secondary_des_1,secondary_dept_2,secondary_des_2
        );
    
        console.log(infoObject);
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
await employee.inActiveEmployee(emp_id,{status:"inactive"});
const updateRows = [...rows];
updateRows[index]={...updateRows[index],status:"Inactive"}
setRows(updateRows);
 };
 const handleActive = async (index) => {
let emp_id = rows[index].emp_id;
await employee.inActiveEmployee(emp_id,{status:"active"});
const updateRows = [...rows];
updateRows[index]={...updateRows[index],status:"Active"}
setRows(updateRows);
 };
const viewDetails=(index,empId)=>{
let empDetails = rows.find((x)=>x.emp_id=== empId);
navigate(`/dashboard/view-add-emp/${empId}`,{state:empDetails})
}
console.log(rows);
  return (
    <div className="">
      {/* //cards */}

      <div className="grid grid-cols-2 lg:grid-cols-4 my-5">
        {summary.map((x, index) => {
          return (
            <section className="flex bg-[#add5f4] shadow-lg  p-[5%] m-[5%]  items-center ">
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

        <div className="col-span-3 flex justify-end ">
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
        handleActive={handleActive}
        viewDetails={viewDetails}
        maxHeight={isSmallScreen?500:650}
      ></CommonTable>
    </div>
  );
};

export default ManageEmployeeTable;
