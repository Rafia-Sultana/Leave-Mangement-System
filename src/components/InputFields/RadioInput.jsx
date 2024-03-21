import Radio from "@mui/material/Radio";

const RadioInput = ({label,onchange, selectedValue,value,color}) => {
    return (
    <div className="">
     
        <Radio
        checked={selectedValue=== value}
        onChange={onchange}
        value={value}
        color={color}
        name="radio-buttons"
        
       
      />
        <label htmlFor="">{label}</label>
    </div>
    );
};

export default RadioInput;