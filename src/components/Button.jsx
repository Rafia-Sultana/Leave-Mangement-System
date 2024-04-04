import React from 'react';

const Button = ({fontSize,textColor,btnText,width,type,onClick, btnIcon:BtnIcon,padding,backgroundColor}) => {

    return (
        
            <button 
           type={type}
           onClick={onClick}
          
            className={` font-${fontSize} text-${textColor} w-${width} 
              border-r-black focus:outline-none rounded ${padding}  ${backgroundColor}` }
           >
           {BtnIcon && <BtnIcon />}
            {btnText}</button>
     
    );
};

export default Button;