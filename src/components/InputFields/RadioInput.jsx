import Radio from '@mui/material/Radio';

const RadioInput = ({label,onchange, selectedValue,value,color,name}) => {

    return (
  <div className="flex items-center">
        <Radio
        checked={selectedValue===value}
        onChange={onchange}
        value={value}
        color={color}
        name={name}
        required
       
      />
        <label htmlFor="" className="text-sm">{label}</label>
        </div>
    );
};

export default RadioInput;