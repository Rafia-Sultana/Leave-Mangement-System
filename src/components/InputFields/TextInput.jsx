import TextField from "@mui/material/TextField";

const TextInput = ({ label,name,width,
   InputProps, value, onchange,rows ,
   multiline,placeholder,focused,
   required,type="text",variant="outlined", autoFocus=false,
   multiple=false}) => {

  return (
    <div>
      <TextField
        label={label}
        name={name}
        InputProps={InputProps}
     
        fullWidth
        multiline={multiline}
        rows={rows }
        onChange={onchange}
        value={value}
        placeholder={placeholder}
        focused={focused}
        required={required}
        type={type}
        variant={variant}
        sx={{width: width }}
        multiple={multiple}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default TextInput;
