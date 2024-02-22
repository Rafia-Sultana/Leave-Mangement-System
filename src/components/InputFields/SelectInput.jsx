import React from 'react';
import Select from '@mui/material/Select';
import { FormControl } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';

const SelectInput = ({ options, placeholder ,getSelectedValue }) => {

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          displayEmpty
          input={<OutlinedInput />}
          renderValue={(selected) => {
      
  if (!selected) {
           
              return <em>{placeholder}</em>;
            }
            getSelectedValue(selected)
            return selected;
          }}
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
