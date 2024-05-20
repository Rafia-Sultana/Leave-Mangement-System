import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useLocation } from "react-router-dom";

const ActionMenu = ({ viewDetails, onEdit, onDelete, row, type,onActive }) => {
  const location = useLocation();

  let value = row["leave_status"];
  let status = row["status"];
  let holiday = row["duration"];


  let options;

if(value == "Pending"){
  options = ["Edit", "View", "Delete"];
}else{
  options = ["View"];
}
if(status!== undefined){
  if(status=="active"){
    options = ["View", "Inactive"];
  }else{
    options = ["View", "Active"];
  }
}

if(holiday!== undefined){
  options = ["Update"];
}

if(location.pathname == '/dashboard/manager-leave-request'){
  options = ["View","Delete"];
}






  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOptionClick = (option) => {
    handleClose();
    const actionHandlers = {
      Edit: onEdit,
      View: viewDetails,
      Delete: handleDelete,
      Inactive: handleDelete,
      Active: handleActive,
      Update:viewDetails
    };

    const actionHandler = actionHandlers[option];
    actionHandler && actionHandler();
  };

  const handleDelete=()=>{
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      onDelete();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
}

const handleActive=()=>{
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      onActive();
      Swal.fire({
        title: "Activated!",
        text: "Your file has been Activated.",
        icon: "success"
      });
    }
  });
}
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup={true}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-button"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "10ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleMenuOptionClick(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ActionMenu;
