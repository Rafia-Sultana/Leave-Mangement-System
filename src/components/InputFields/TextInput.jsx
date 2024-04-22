import TextField from "@mui/material/TextField";

const TextInput = ({ label,name, InputProps, value, onchange,rows ,multiline,placeholder,focused,required}) => {

  return (
    <div>
      <TextField
        label={label}
        name={name}
        InputProps={InputProps}
        variant="outlined"
        fullWidth
        multiline={multiline}
        rows={rows }
        onChange={onchange}
        value={value}
        placeholder={placeholder}
        focused={focused}
        required={required}
      />
    </div>
  );
};

export default TextInput;
