import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const AutoComplete = ({
  options,
  label,
  handleInputChange,
  field,
  value,
  name,
  required = true,

  variant = "standard",
}) => {
  return (
    <div>
      <Autocomplete
        disablePortal
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            required={required}
            variant={variant}
          />
        )}
        onChange={(e, newValue) => {
          if (newValue) {
            handleInputChange(e, newValue, field, name);
          }
        }}
        value={value}
      />
    </div>
  );
};

export default AutoComplete;
