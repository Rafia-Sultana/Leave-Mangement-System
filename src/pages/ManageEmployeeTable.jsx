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
// import DeleteIcon from '@mui/icons-material/Delete';

const ManageEmployeeTable = () => {
    const navigate = useNavigate();
  const summaryOfTotalEmployee = [60, 40, 17];
  const names = ["Total Employee", "Active Employee", "On Leave"];
  const handleAddEmployee = () => {
    navigate("/dashboard/hr-add-employee")
  };

  //   EnhancedTableHead.propTypes={
  //     numSelected: PropTypes.number.isRequired,
  //     onRequestSort: PropTypes.func.isRequired,
  //     onSelectAllClick:PropTypes.func.isRequired,
  //     order:PropTypes.oneOf(['asc','desc']).isRequired,
  //     orderBy: PropTypes.string.isRequired,
  //     rowCount: PropTypes.number.isRequired
  // }
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  return (
    <div className="">
      {/* //cards */}

      <div className="flex gap-20 my-8">
        {summaryOfTotalEmployee.map((x, index) => {
          return (
            <Card>
              <CardActionArea>
                <CardContent key={index} sx={{ width: 350, height: 100 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {names[index]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {x}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-5 mb-2">
        <div className="col-span-1">
          <SelectInput
            placeholder={"column"}
            options={["Name","Job Title", "Department","Status"]}
            variant="standard"
          ></SelectInput>
        </div>
        <div className="mt-4 ml-5">
          <TextInput variant="standard"></TextInput>
        </div>

        <div className="col-span-3 flex justify-end gap-5 ">
          <Button
            textColor={"white"}
            btnText={"Remove"}
            width={"1/2"}
            backgroundColor={"bg-red"}
            padding={"p-3"}
           btnIcon={DeleteIcon}
          ></Button>
          <Button
            textColor={"white"}
            btnText={"Add Employee"}
            width={"1/2"}
            backgroundColor={"bg-blue"}
            padding={"p-3"}
            btnIcon={AddIcon}
            onClick={handleAddEmployee}
          ></Button>


        </div>
      </div>
      <TableContainer component={Paper}>
        {/* <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Employee List</Typography>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Toolbar> */}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Job Title</TableCell>
              <TableCell align="right">Department</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Checkbox />
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageEmployeeTable;
