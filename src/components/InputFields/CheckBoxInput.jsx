import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
const CheckBoxInput = ({onchange,text,value="end"}) => {
    return (
        <div>
            <FormControlLabel
            value={value}
            control={<Checkbox size='small'  onChange={onchange} />}
            label={text}
   />
            


         
        </div>
    );
};

export default CheckBoxInput;