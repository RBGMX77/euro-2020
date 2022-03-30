import React from 'react';

const Input = ({name, label, value, className, type, error, onChange}) => {
    
    return ( 
        <div className="field">
            <label className="label" htmlFor={name}>{label}</label>
            <div className="control">
                <input 
                    value={value} 
                    onChange={onChange}
                    className={error? 'iserror '+className :className} 
                    type={type} 
                    name={name} 
                    id={name}/>
                    {error && <p className="errormsg">{error.replace(/"/g,'')}.</p>}
            </div>            
        </div>
     );
}
 
export default Input;