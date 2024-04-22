import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const AutoComplete = ({options,label,handleInputChange,field,value}) => {

    return (
        <div>
              <Autocomplete
                disablePortal
                options={options}
                getOptionLabel={(option) => option.leave_name || option.employee_name}
                renderInput={(params) => (
                  <TextField {...params}
                   label={label}
                   required={true}
                   />
                )}
                onChange={(e, newValue) => {
                  if (newValue) {
                   handleInputChange(e, newValue,field);
                  }
                }}
               value={value}
                isOptionEqualToValue={(option, value) => {
                 
                  return   option.label === value.label;
                }}
            
              />
        </div>
    );
};

export default AutoComplete;