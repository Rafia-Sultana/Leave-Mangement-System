import TextField from "@mui/material/TextField";

const TextInput = ({ label,name,
   InputProps, value, onchange,rows ,multiline,placeholder,focused,required,type="text",variant="outlined"}) => {

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
   
        
      />
    </div>
  );
};

export default TextInput;
