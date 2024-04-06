import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "./Button";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Container from "@mui/material/Container";
import { useNavigate, useLocation } from "react-router-dom";
import { enqueueSnackbar } from 'notistack';
import FormateDate from "../utils/FormateDate";


const ActionButtons = ({ viewDetails, onEdit, onDelete }) => (
  <>
    <Button
      textColor={"green"}
      btnIcon={RemoveRedEyeOutlinedIcon}
      onClick={viewDetails}
      padding={'p-1'}
    />
    <Button
      textColor={"red"}
      btnIcon={DeleteOutlineOutlinedIcon}
      onClick={onDelete}
      padding={'p-1'}

    />
    <Button
      btnIcon={ModeEditOutlinedIcon}
      textColor={"blue"}
      onClick={onEdit}
      padding={'p-1'}
    />
  </>
);

const CommonTable = ({ columns, rows, viewDetails }) => {
  // console.log(rows);
  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const role = userInfoData.role;
  const location = useLocation();
 
  const navigate = useNavigate();
  const [showButtonsMap, setShowButtonsMap] = useState({});

  const toggleShowButtons = (index) => {
    setShowButtonsMap({
   [index]: !showButtonsMap[index],
    });
  };

  return (
    <Paper sx={{ width: "100%", marginTop: "2%", marginBottom: "2%"}}>
      <TableContainer sx={{ maxHeight: 750 }}>
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
              const isLastRow = index === rows.length - 1;
              // console.log(isLastRow,index);
              

              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];

                    if (column.id === "action") {
                      return (
                        <TableCell align="center">
                          {row.leave_status === "Pending" &&
                          role === "Employee" 
                          || location.pathname === '/dashboard/manager_leave_history'
                          || location.pathname === '/dashboard/hr_leave_history'
                          
                          ? (
                            <Container>
                              <Box className={` hidden  xl:block`}>
                                <ActionButtons
                                  viewDetails={() => viewDetails(index)}
                                  onDelete={() => {
                                    console.log("Delete", index)
                                   enqueueSnackbar(`SuccessFully Deleted on ${FormateDate(new Date())}!`, { variant: 'error' })
                                  }}
                                  onEdit={() => {
                                    console.log("Edit", index)
                                    navigate("/dashboard/leave-application",{state:row})
                                  }}
                                />
                              </Box>

                              <Box className="relative block xl:hidden ">
                                <Button
                                  onClick={() => toggleShowButtons(index)}
                                  btnIcon={MoreHorizIcon}
                                  textColor={
                                    showButtonsMap[index] === true
                                      ? "blue-light"
                                      : "blue"
                                  }
                                  padding={'p-1'}
                                />
                                {showButtonsMap[index] && (
                                  <div
                                    className={`${
                                  isLastRow ? "bottom-6" : "top-6"
                                    } absolute    right-0  bottom-0 h-20 w-10 z-50 bg-white rounded-lg shadow-md`}
                                  >
                                    <ActionButtons
                                      viewDetails={() => viewDetails(index)}
                                      onDelete={() =>
                                        console.log("Delete", index)
                                      }
                                      onEdit={() => {
                                        console.log("Edit", index)
                                        navigate("/dashboard/leave-application",{state:row})
                                      }}
                                    />
                                  </div>
                                )}
                              </Box>
                            </Container>
                          ) : (
                            <Button
                              textColor={"green"}
                              btnIcon={RemoveRedEyeOutlinedIcon}
                              onClick={() => viewDetails(index, row?.emp_id)}
                              padding={'p-1'}
                            />
                          )}
                        </TableCell>
                      );
                    }
                    let cellStyle = {};
                    if (value === "Approved") {
                      cellStyle.color = "green";
                      cellStyle.fontWeight = "bold";
                    } else if (value === "Pending") {
                      cellStyle.color = "orange";
                      cellStyle.fontWeight = "bold";
                    } else if (value === "Rejected") {
                      cellStyle.color = "red";
                      cellStyle.fontWeight = "bold";
                    }
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={cellStyle}
                      >
                        {value || "--"}
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
  );
};

export default CommonTable;
