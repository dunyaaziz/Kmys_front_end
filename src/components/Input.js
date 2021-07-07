import React from 'react';

const Input = (props) => {
    const { label, error, name, onChange, type, defaultValue} = props
    const className2 = type==='file' ? "form-control-file" : "form-control"

    const className = error ? "form-group has-error" : "form-group"
    return(
            <div className={className}>            
              <label>{label}</label>
              <input className={className2} name={name} 
              onChange={onChange} type={type} defaultValue={defaultValue}/>
               <div  className="text-danger">{error}</div>
            </div>
    );
}

export default Input;