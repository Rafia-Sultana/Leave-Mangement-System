import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useLocation } from "react-router-dom";

const ActionMenu = ({ viewDetails, onEdit, onDelete, row, type, onActive }) => {
  const location = useLocation();

  let value = row["leave_status"];
  let status = row["status"];

  let options;

  if (value == "Pending") {
    options = ["Edit", "View", "Delete"];
  } else {
    options = ["View"];
  }
  if (status !== undefined) {
    if (status.toLowerCase() === "active") {
      options = ["View", "Inactive"];
    } else {
      options = ["View", "Active"];
    }
  }

  if (status === "holiday") {
    options = ["Edit"];
  }

  if (location.pathname == "/dashboard/manager-leave-request") {
    options = ["View"];
  }

  if (location.pathname == "/dashboard/request-history") {
    if (value == "Pending") {
      options = ["Edit", "View", "Withdrawn"];
    } else {
      options = ["View"];
    }
  }

  if (location.pathname === "/dashboard/hr-view-on-leave") {
    options = ["View"];
  }
  if (location.pathname === "/dashboard/admin-pending-request") {
    options = ["View"];
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

  const handleSweetAlert = (action, confirmText, successTitle, successText) => {
    return () => {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: confirmText,
      }).then((result) => {
        if (result.isConfirmed) {
          action();
          Swal.fire({
            title: successTitle,
            text: successText,
            icon: "success",
          });
        }
      });
    };
  };

  const handleMenuOptionClick = (option) => {
    handleClose();
    const actionHandlers = {
      Edit: onEdit,
      View: viewDetails,
      Delete: handleSweetAlert(
        onDelete,
        "Yes, Delete it!",
        "Deleted!!",
        "leave has been deleted.."
      ),
      Inactive: handleSweetAlert(
        onDelete,
        "Yes, Inactive it!",
        "Inativated!!",
        "Status has been Inactivated."
      ),
      Active: handleSweetAlert(
        onActive,
        "Yes, Active it!",
        "Activated!!",
        "Status has been activated."
      ),
      Update: viewDetails,
      Withdrawn: handleSweetAlert(
        onDelete,
        "Yes, withdraw it!",
        "WithDrawn!!",
        "Your leave has been WithDrawn."
      ),
    };

    const actionHandler = actionHandlers[option];
    actionHandler && actionHandler();
  };

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
            width: "12ch",
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
