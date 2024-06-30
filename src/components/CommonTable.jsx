import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import TableCells from "./TableCells";
import { TablePagination } from "@mui/material";

const CommonTable = ({
  columns,
  rows,
  viewDetails,
  handleDelete,
  borderRadius,
  maxHeight = 600,
  handleActive
}) => {

 const navigate = useNavigate();
 const [page,setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(10);
 const handleChangePage = (_,newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};


const handleEdit = (index,row)=>{
 switch (row.status) {
   case 'holiday':
     viewDetails(index);
   break;

 default:
  navigate("/dashboard/leave-application", {
 state: row,
  });
    break;
}
}

return (
    <div>
      <Paper sx={{ width: "100%", borderRadius: borderRadius,backgroundColor:"#E8F7FF"}}>
        <TableContainer
          sx={{ borderRadius: borderRadius, maxHeight:maxHeight}}
        >
          <Table stickyHeader aria-label="sticky-table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      backgroundColor: "#e5e7eb",
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
            
                      return (
                        <TableCells
                        key={column.id}
                          row={row}
                          column={column}
                          viewDetails={() => viewDetails(index, row?.emp_id)}
                          onDelete={() => {
                          handleDelete(index);
                           }}
                          onEdit={() =>handleEdit(index,row)}
                          onActive={()=>handleActive(index)}
                          index={index}
                          ></TableCells>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
  rowsPerPageOptions={[10, 25, 50]}
  count={rows.length}
  component="div"
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage} 
  onRowsPerPageChange={handleChangeRowsPerPage}
/>
 </Paper>

   
    </div>
  );
};

export default CommonTable;
