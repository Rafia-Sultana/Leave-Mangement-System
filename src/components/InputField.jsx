import React from 'react';

const InputField = ({type,placeholder,name,onChange,value}) => {
    return (
          <input 
            name={name}
            value={value}
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            className='w-full h-12 rounded-md border border-gray placeholder-gray focus:outline-none focus:border-blue-lightest p-2 caret-green-dark'
            />
    
    );
};

export default InputField;