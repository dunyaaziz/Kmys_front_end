import React from 'react';
import fileSaver from './FileSaver';
import { downloadFile } from '../api/apiCalls';
import Payment from './Payment';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from './ButtonWithProgress';  
import { useSelector } from 'react-redux';
import Footer from "./footer";

const DownloadFile = () => {

    const { isPaid, isLoggedIn } = useSelector((store)=>({isPaid:store.isPaid,   isLoggedIn: store.isLoggedIn}))

    const handleDownload = async ()=>{
        try{
            const response = await downloadFile()
           
    
             fileSaver(response.data, 'kmys.zip');
             }
             catch(error){ 
                     console.log( error.response);
                };
          };

      const { t } = useTranslation();
      let links = (
        <>
       <Payment/>
        </>
    );

    if(isPaid && isLoggedIn){
        links=(
        <>
    <div className="container" style= {{width: '30%'}} >
    <form>
    <h1 className="text-center"> {t('Click For Download')}</h1>
    <div className="text-center">
    <ButtonWithProgress
            onClick={handleDownload}
            //disabled={pendingApiCall || passwordRepeatError !== undefined}
            //pendingApiCall= {pendingApiCall}
            text={t('Download')}/>
    </div>
</form>        
</div>
</>)}

    return (
        <>
            {links}

        <Footer classname={"navbar-fixed-bottom"}></Footer>
        </>);
};

export default DownloadFile;