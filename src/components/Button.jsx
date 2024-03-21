import React from 'react';

const Button = ({bg,fontSize,textColor,btnText,width,type,onClick, btnIcon:BtnIcon,p}) => {

    return (
        
            <button 
           type={type}
           onClick={onClick}
          
            className={` font-${fontSize} text-${textColor} w-${width} 
              border-r-black focus:outline-none rounded p-${p} bg-${bg}` }
           >
           {BtnIcon && <BtnIcon />}
            {btnText}</button>
     
    );
};

export default Button;