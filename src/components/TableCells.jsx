import React, { useContext } from "react";
import TableCell from "@mui/material/TableCell";
import ActionMenu from "./ActionMenu";
import CheckBoxInput from "./InputFields/CheckBoxInput";
import { UserContext } from "../context api/Context";


const TableCells = ({ row, column, viewDetails, onDelete, onEdit,index ,onActive}) => {

  const statusStyles = {
    Approved: { color: "green", fontWeight: "bold" },
    Pending: { color: "orange", fontWeight: "bold" },
    Rejected: { color: "red", fontWeight: "bold" },
    Active: {color: "green", fontWeight: "bold" },
    Inactive: { color: "red", fontWeight: "bold" },
    Withdrawn:{ color: "purple", fontWeight: "bold" },
  };

  let value = row[column.id];


  if(column.id=== 'status'){
   value = value?.charAt(0).toUpperCase() + value?.slice(1);
  
  }




  switch (column.id) {
    case 'action':
      return (
        <TableCell key={column.id} align={column.align}>
          <ActionMenu
            viewDetails={viewDetails}
            onDelete={onDelete}
            onEdit={onEdit}
            row={row}
            onActive={onActive}
          
          />
        </TableCell>
      );
    // case 'check':
    //   return (
    //     <TableCell key={column.id} align={column.align}>
    //       <CheckBoxInput onchange={(e)=>handleCheckBoxInput(e,index)}   />
          
    //     </TableCell>
    //   );
    default:
      return (
        <TableCell
          key={column.id}
          align={column.align}
          style={statusStyles[value]}
        >
          {value||'--'}
        </TableCell>
      );
  }
};

export default TableCells;
