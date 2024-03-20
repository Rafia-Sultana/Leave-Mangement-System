import Radio from "@mui/material/Radio";

const RadioInput = ({label,onchange,setSelectedValue, selectedValue}) => {
    return (
    <div className="">
     
        <Radio
        checked={selectedValue === 'a'}
        onChange={onchange}
        value="a"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
       
      />
        <label htmlFor="">{label}</label>
    </div>
    );
};

export default RadioInput;