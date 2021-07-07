import React from 'react';

const ButtonWithProgress = (props) => {
    const { onClick, pendingApiCall, disabled, text, className} = props;
    const classNametmp = (className === undefined) ? "btn btn-primary" : className; 
    return (
        <button
        className={classNametmp}
        style= {{marginTop: '5px'}}
        onClick={onClick}
        disabled={disabled}>
        {pendingApiCall && <span className ='fa fa-spinner fa-spin'></span>}{text}
        </button>
    );
};

export default ButtonWithProgress;