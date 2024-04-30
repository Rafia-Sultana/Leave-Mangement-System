import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import InputField from "../components/InputField.jsx";
import Button from "../components/Button.jsx";
import AddIcon from "@mui/icons-material/Add";
import SelectInput from "../components/InputFields/SelectInput.jsx";
import TextInput from "../components/InputFields/TextInput.jsx";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards.jsx";
import CheckBoxInput from "../components/InputFields/CheckBoxInput.jsx";
import { useEffect, useState } from "react";

// import totalEmployee from '../'
import totalEmployee from '../assets/styles/svg/totalEmployee.svg';
import activeEmployee from '../assets/styles/svg/activeEmployee.svg';
import leaveEmployee from '../assets/styles/svg/leaveEmployee.svg';
import onBoardEmployee from '../assets/styles/svg/onBoardEmployee.svg';
// import DeleteIcon from '@mui/icons-material/Delete';

const ManageEmployeeTable = () => {
    const navigate = useNavigate();
  const summaryOfTotalEmployee = [60, 40, 17,15];
  const names = ["Total Employee", "Active Employee", "On Leave","On Boarding"];
  const cardIcons=[totalEmployee,activeEmployee,leaveEmployee,onBoardEmployee]
  const handleAddEmployee = () => {
    navigate("/dashboard/hr-add-employee")
  };
const [checkedRows,setCheckedRows]= useState([]);

const [selectedColumn, setSelectedColumn] = useState('Name');
const [searchValue, setSearchValue] = useState('');

  function createData(name,designation, department,status) {
    return { name,designation,department,status };
  }

  let rows2 = [
    createData("Frozen yoghurt", "software engineer", "software development", "active"),
    createData("Ice cream sandwich", "urban planner", "planning", "inactive"),
    createData("Eclair", "software engineer", "software development", "active"),
    createData("Cupcake",  "software engineer", "software development", "inactive"),
    createData("Gingerbread",  "software engineer", "software development", "active"),

    
  ];
  const [rows,setRows]= useState(rows2);
  const handleCheckBoxInput = (e,index)=> {
setCheckedRows(prev=>{
  let newArray =[...prev];
  newArray[index] = {[index]:e.target.checked};
  return newArray;

})
  }
  const isAllValuesFalse = checkedRows.every(obj => Object.values(obj)[0]===false);
  const getSelectedValue=(e)=>{
    setSelectedColumn(e.target.value);
  }

  const handleSearchValue = (e) => {
  const searchValue = e.target.value.toLowerCase();
  setSearchValue(searchValue);
  };
  
useEffect(()=>{
  const matchedRows = () =>{
  let column = selectedColumn.toLowerCase();
  let searchValues = searchValue.toLowerCase();
  if (!searchValues) {
     setRows(rows2);

  } else {
    const filteredRows = rows2.filter(row => row[column].toLowerCase().includes(searchValues));
    setRows(filteredRows);
  }

  }
  matchedRows();
},[searchValue,selectedColumn]);


 
  return (
    <div className="">
      {/* //cards */}

      <div className="flex gap-10 my-8 ">
        {summaryOfTotalEmployee.map((x, index) => {
          return (
            <Card>
              <CardActionArea sx={{display:"flex",alignItems:"center"}}>
                <CardMedia
                component="img"
                image={cardIcons[index]}
                />
                <CardContent key={index} sx={{ width: 200, height: 100}} className="">
            
                  <Typography gutterBottom variant="h6" component="div">
                    {x}
                  </Typography>
                  <Typography  variant="body1" color="text.secondary" style={{whiteSpace:"nowrap"}}>
                    {names[index]}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </div>


      <div className="grid grid-cols-5 mb-5 gap-10">
        <div className="col-span-1">
          <SelectInput
            placeholder={"column"}
            options={["Name","Designation", "Department","Status"]}
            variant="standard"
            getSelectedValue={getSelectedValue}
          ></SelectInput>
        </div>
        <div className="">
          <TextInput variant="standard" label={"value"} onchange={handleSearchValue}></TextInput>
        </div>

        <div className="col-span-3 flex justify-end gap-2 ">
          <Button
            textColor={isAllValuesFalse?"gray":"white"}
            // btnText={"Remove"}
            width={"1/2"}
            backgroundColor={isAllValuesFalse?"bg-gray":"bg-red"}
            padding={"p-2"}
           btnIcon={DeleteIcon}
           fontSize={'sm'}
           disable={isAllValuesFalse?true:false}
           cursor={isAllValuesFalse?"cursor-not-allowed":"cursor-pointer"}
          ></Button>
          <Button
            textColor={"white"}
            btnText={"Add Employee"}
            width={"1/2"}
            backgroundColor={"bg-[#7BD3FF]"}
            padding={"p-2"}
            btnIcon={AddIcon}
            onClick={handleAddEmployee}
            fontSize={'sm'}
          ></Button>


        </div>
      </div>
      <TableContainer component={Paper} sx={{backgroundColor:"#E8F7FF"}} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow  style={{fontWeight:"bold"}}>
         {   ["Name","Designation", "Department","Status","Action"].map((column)=>(
              <TableCell  key={column}  align={column==='Name'?'left':"right"}  style={{fontWeight:"bold"}} >{column}</TableCell>
            ))}
            
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {/* <Checkbox /> */}
                  <CheckBoxInput text= {row.name} onchange={(e)=>handleCheckBoxInput(e,index)} />
                  {/* {row.name} */}
                </TableCell>
                <TableCell align="right">{row.designation}</TableCell>
                <TableCell align="right">{row.department}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right" className="">{"Edit"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageEmployeeTable;
