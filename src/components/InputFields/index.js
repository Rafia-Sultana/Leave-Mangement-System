import React from 'react';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';

const InputFields = ({type,value,onChange,setter,label,id,
min,max, range,  label_icon, extra_classes, overridden_styles,
}) => {
let componnet=null;
    switch(type){
        case "text":{
            componnet=<TextInput pop={[type,value,onChange,setter,label,id]} />
        }
        break;
        case "text":{
            componnet=<PasswordInput pop={[type,value,onChange,setter,label,id]} />
        }
        break;
    }



    return (
      <>{componnet}</>
    );
};

export default InputFields;