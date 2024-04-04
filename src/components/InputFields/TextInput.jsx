import TextField from "@mui/material/TextField";

const TextInput = ({ label,name, InputProps, value, onchange,rows ,multiline,placeholder}) => {

  return (
    <div>
      <TextField
        label={label}
        name={name}
        InputProps={{ InputProps }}
        variant="outlined"
        fullWidth
        multiline={multiline}
        rows={rows }
        onChange={onchange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
