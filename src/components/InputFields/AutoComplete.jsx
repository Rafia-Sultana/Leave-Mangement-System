import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const AutoComplete = ({options,label,handleInputChange,field}) => {

    return (
        <div>
              <Autocomplete
                disablePortal
                options={options}
                getOptionLabel={(option) => option.leave_name || option.employee_name}
                renderInput={(params) => (
                  <TextField {...params}
                   label={label}/>
                )}
                onChange={(e, newValue) => {
                  if (newValue) {
                   handleInputChange(e, newValue,field);
                  }
                }}
                isOptionEqualToValue={(option, value) => {
                  option.label === value.label;
                }}
              />
        </div>
    );
};

export default AutoComplete;