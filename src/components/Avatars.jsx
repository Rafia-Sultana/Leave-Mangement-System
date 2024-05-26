import * as React from "react";
import Avatar from "@mui/material/Avatar";

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: "#00000",
      width: 70,
      height: 70,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
const Avatars = (name) => {
  return <Avatar {...stringAvatar(name.children)} />;
};

export default Avatars;
