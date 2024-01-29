import React from 'react';

const Label = ({label}) => {
    return (
        <div>
            <label className="block text-gray-700 dark:text-gray-200">
           {label}
          </label>
        </div>
    );
};

export default Label;