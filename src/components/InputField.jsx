import React from 'react';

const InputField = ({type,placeholder,name,onChange,value}) => {
    return (
        <div>
           
            <input 
            name={name}
            value={value}
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            className='w-full p-3 rounded border placeholder-gray-400 focus:outline-none focus:border-green-600'
            />
        </div>
    );
};

export default InputField;