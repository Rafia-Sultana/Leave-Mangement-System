import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";


const ActionMenu = ({viewDetails,onEdit,onDelete,row,type}) => {
  let value = row['leave_status'];
let options;


switch (value) {
  case 'Pending':
    options = ["Edit", "View", "Delete"];
    break;
    case 'Approved':
    options = ["View"];
    break;
    // case '/dashboard/hr_others_leave_history' :
    // options = ["View"];
    // break;
    // case '/dashboard/manager_team_leave_info':
    // options = ["View"];
    // break;
    default:
    options = ["View"];
    break;
}
// switch (locations) {
// case '/dashboard/hr_others_leave_history' :
//     options = ["View"];
//     break;
//     case '/dashboard/manager_team_leave_info':
//     options = ["View"];
//     break;
//     default:
//     options = ["View"];
//     break;
// }
  
// options = value !== 'Pending' ? ["View"] : ["Edit", "View", "Delete"];
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose=()=>{
    setAnchorEl(null);
  }

  const handleMenuOptionClick = (option) =>{
  handleClose();
  const actionHandlers = {
    Edit: onEdit,
    View: viewDetails,
    Delete: onDelete
  };

  const actionHandler = actionHandlers[option]
  actionHandler && actionHandler();
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
      <Menu id="long-button"
      MenuListProps={{
        'aria-labelledby':'long-button',
      }}
      anchorEl={anchorEl}
     open={open}
      onClose={handleClose}
      PaperProps = {{
        style:{
            maxHeight:ITEM_HEIGHT * 4.5,
            width:'10ch'
        }
      }}
      >
    {
        options.map((option)=>(
            <MenuItem key={option} onClick={()=>handleMenuOptionClick(option)}>
                {option}
      </MenuItem>
        ))
    }
      </Menu>
    </div>
  );
};

export default ActionMenu;
