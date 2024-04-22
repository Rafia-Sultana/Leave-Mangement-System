import React from "react";
import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const SelectInput = ({ options, placeholder, getSelectedValue,value }) => {
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps:{
    style:{
      maxHeight: ITEM_HEIGHT*4.5 + ITEM_PADDING_TOP,
      width:250
    }
  }
}
  
  return (
    <div>
      <FormControl  sx={{ width: "100%" }}>
        <InputLabel>{placeholder}</InputLabel>
        <Select
          size="large"
          label={placeholder}
          value={value}
          // renderValue={(selected) => {
          //   if (selected) {
          //     getSelectedValue(selected);
          //     return selected;
          //   }
          // }}

          //render value and onChange works like same but which one you need to use depends on 
          //requirements . render value is useful when you want to show additional information, format the display differently, or trigger some side effect when a value is selected.
        onChange={getSelectedValue}
        MenuProps={MenuProps}
        required={true}
        >
          {options.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectInput;
