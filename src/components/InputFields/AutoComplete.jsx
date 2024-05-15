import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const AutoComplete = ({ options, label, handleInputChange, field, value ,name,required=true,
  
  variant="standard"
}) => {


  return (
    <div>
      <Autocomplete
        disablePortal
        // variant={variant}
        options={options}
        // getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField {...params} label={label} required={required}  variant={variant} />
        )}
        onChange={(e, newValue) => {
          if (newValue) {
            handleInputChange(e, newValue, field,name);
          }
        }}
        value={value}
        // name={name}
        // isOptionEqualToValue={(option, value) => {
        //   return option.label === value.label;
        // }}
      />
    </div>
  );
};

export default AutoComplete;
