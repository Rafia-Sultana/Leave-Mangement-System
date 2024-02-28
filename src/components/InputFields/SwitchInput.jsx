import React from 'react';
import Switch from '@mui/material/Switch';

const SwitchInput = ({checked}) => {
    return (
    <Switch
    checked={checked}
    inputProps={{'aria-label':'controlled'}}
    />
    );
};

export default SwitchInput;