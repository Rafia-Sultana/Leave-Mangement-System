import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import TableCells from "./TableCells";

const CommonTable = ({
  columns,
  rows,
  viewDetails,
  handleDelete,
  borderRadius,
  maxHeight = 700,
  // handleCheckBoxInput
}) => {
 const navigate = useNavigate();

  return (
    <div className="">
      <Paper sx={{ width: "100%", borderRadius: borderRadius }}>
        <TableContainer
          sx={{ maxHeight: maxHeight, borderRadius: borderRadius }}
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
              {rows.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      return (
                        <TableCells
                          row={row}
                          column={column}
                          viewDetails={() => viewDetails(index, row?.emp_id)}
                          onDelete={() => {
                            console.log("Delete", index);
                            handleDelete(index);
                            //  enqueueSnackbar(`SuccessFully Deleted on ${FormateDate(new Date())}!`, { variant: 'error' })
                          }}
                          onEdit={() => {
                            console.log("Edit", index);
                            navigate("/dashboard/leave-application", {
                              state: row,
                            });
                          }}
                          index={index}
                          // handleCheckBoxInput={handleCheckBoxInput}
                        ></TableCells>
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
