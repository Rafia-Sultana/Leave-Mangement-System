import React from 'react';

const Button = ({bg,fontSize,textColor,btnText,width,type,onClick}) => {

    return (
        
            <button 
           type={type}
           onClick={onClick}
          
            className={`bg-green font-${fontSize} text-${textColor} text-${btnText} w-${width} focus:outline-none rounded p-3` }
           >{btnText}</button>
     
    );
};

export default Button;