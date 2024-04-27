import React from 'react';
import Checkbox from '@mui/material/Checkbox';
const CheckBoxInput = ({onchange,text}) => {
    return (
        <div>
            <Checkbox size='small'  onChange={onchange} />
        </div>
    );
};

export default CheckBoxInput;