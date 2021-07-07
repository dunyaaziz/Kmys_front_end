import React from 'react';

const spinner = () => {
    return (
      <div className="text-center">
      <div className="loading-spinner container" style= {{marginTop: '5px', width: '600px' }}> 
            <div className="progress progress-striped active">
                <div className="progress-bar" style= {{width: '100%' }} ></div>
            </div>
        </div>
        </div>
    //   <div className="text-center">
    //   <div className="spinner-border m-5" role="status">
    //   <span className="visually-hidden">Loading...</span>
    // </div> </div>

        // <div className="d-flex justify-content-center">
        //     <div className="spinner-border text-black-50" role="status">
        //       <span className="sr-only">Loading...</span>
        //     </div>
        //   </div>  
    );
};

export default spinner;