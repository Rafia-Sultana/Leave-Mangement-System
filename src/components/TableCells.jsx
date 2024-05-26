import TableCell from "@mui/material/TableCell";
import ActionMenu from "./ActionMenu";


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
