import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const AutoComplete = ({ options, label, handleInputChange, field, value ,variant='outlined'}) => {
  return (
    <div>
      <Autocomplete
        disablePortal
        variant={variant}
        options={options}
        getOptionLabel={(option) => option.leave_name || option.employee_name || option.genderType}
        renderInput={(params) => (
          <TextField {...params} label={label} required={true} />
        )}
        onChange={(e, newValue) => {
          if (newValue) {
            handleInputChange(e, newValue, field);
          }
        }}
        value={value}
        isOptionEqualToValue={(option, value) => {
          return option.label === value.label;
        }}
      />
    </div>
  );
};

export default AutoComplete;
