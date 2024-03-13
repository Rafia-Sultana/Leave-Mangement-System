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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


const ActionButtons = ({ viewDetails, onEdit, onDelete }) => (
  <>
    <Button
      textColor={"green"}
      btnIcon={RemoveRedEyeOutlinedIcon}
      onClick={viewDetails}
      padding={1}
    />
    <Button
      textColor={"red"}
      btnIcon={DeleteOutlineOutlinedIcon}
      onClick={onDelete}
      padding={1}
    />
    <Button
      btnIcon={ModeEditOutlinedIcon}
      textColor={"blue"}
      onClick={onEdit}
      padding={1}
    />
  </>
);

const CommonTable = ({ columns, rows, viewDetails }) => {

  const [showButtonsMap, setShowButtonsMap] = useState({});


  const toggleShowButtons = (index) => {
    setShowButtonsMap((prevState) => (
      { 
        [index]: !prevState[index]
    }));
  };

  return (
    <div>
      <Paper sx={{ width: "100%", marginTop: "2%", marginBottom: "2%" }}>
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
                const isLastRow = rows.length-1;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "action"  ) {
                        return (
                          <TableCell align="center">
                            <Box className={` hidden  xl:block`}>
                              <ActionButtons
                           
                                viewDetails={() => viewDetails(index)}
                                onDelete={() => console.log("Delete", index)}
                                onEdit={() => console.log("Edit", index)}
                              />
                            </Box>
                            <Box className="relative block xl:hidden ">
                              <Button
                                onClick={() => toggleShowButtons(index)}
                                btnIcon={MoreHorizIcon}
                                textColor={showButtonsMap[index] === true ? 'blue-light':'blue'}
                                padding={1}
                              />
                              {showButtonsMap[index] && (
                             <div className={`${index==isLastRow? '-top-24':'top-6'} absolute 
                             right-0 
                             bottom-0 h-24 z-50 bg-white rounded-lg shadow-md`}>
                                 <ActionButtons
                                  viewDetails={() => viewDetails(index)}
                                  onDelete={() => console.log("Delete", index)}
                                  onEdit={() => console.log("Edit", index)}
                           
                                />
                             </div>
                              )}
                            </Box>
                          </TableCell>
                        );
                      } else {
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
                      }
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
