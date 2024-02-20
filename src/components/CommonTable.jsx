import React from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {manager_leave_data} from '../utils/Dummy_Data'
const CommonTable = ({columns,rows,viewDetails}) => {
 

  return (
    <div>
      <Paper sx={{ width: "100%", marginTop:'2%', marginBottom:'2%'}}>
        <TableContainer sx={{ maxHeight: 750 }}>
          <Table stickyHeader aria-label="stcky-table">
            <TableHead >
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}
                   style={{backgroundColor:'#e5e7eb',whiteSpace:'nowrap',fontWeight:'bold'}}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
            {rows
 
              .map((row,index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      
                      let cellStyle = {}; 
                      if (value === "Approved") {
                        cellStyle.color = "green";
                        cellStyle.fontWeight='bold'
                      } else if (value === "Pending") {
                        cellStyle.color = "orange";
                        cellStyle.fontWeight='bold' 
                      }
                   
                      return (
                        <TableCell key={column.id} align={column.align} style={cellStyle}>
                          {value || <button 
                          onClick={()=>viewDetails(row.emp_id || row.leave_id || 2)}
                          className="bg-green p-2 rounded text-white text-center lg:mx-[25%]">View Details</button>}
                        </TableCell>
                      );
                    })}


                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default CommonTable;
