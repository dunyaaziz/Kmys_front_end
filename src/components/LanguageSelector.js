import React from 'react';
import { changeLanguage } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import turkishFlag from '../assets/flag-of-Turkey.png';
import usaFlag from '../assets/flag-of-usa.png';

const LanguageSelector = (props) => {        
    const { i18n } = useTranslation();;

    const onChangeLanguage = language => {
        i18n.changeLanguage(language);
        changeLanguage(language); 
    }
    return (
        <a style={{marginTop:'4px'}}>
        <img src={turkishFlag} alt="Turkish flag"
            onClick={() => onChangeLanguage('tr')} style={{ cursor: 'pointer' }}></img>

        <img src={usaFlag} alt="USA flag"
            onClick={() => onChangeLanguage('en')} style={{ cursor: 'pointer' }}></img>
    </a>
    );
};

export default LanguageSelector;