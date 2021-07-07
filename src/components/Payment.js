import React,{ useEffect, useState }  from 'react';
import { signup,downloadFile } from '../api/apiCalls';
import Input from './Input'
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from './ButtonWithProgress';  
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch, useSelector } from 'react-redux';
import { signupHandler } from '../redux/authActions';
import Footer from "./footer";
import CreditCard from './CreditCard';


const Payment = () => {
    const [form,setForm] = useState({
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null
    });
    const[errors, setErrors]  = useState({});
    const[clickNext, setClickNext] = useState(true);
    const { username : loggedInUsername, password } = useSelector((store)=>({username:store.username, password:store.password}))

    const dispatch = useDispatch();
    const onChange = event => {
        const { name, value } = event.target;

        setErrors((previousError)=>({...previousError, [name]:undefined}));
        setForm((previousForm)=>({ ...previousForm, [name]:value}))
    }

    const onClickNext =  () => {

        setClickNext(false)
    };
  
    
  

        //const {  errors } = this.state;
        const { username:usernameError, displayName:displayNameError, password:passwordError } = errors;
        //const pendingApiCallSignup = useApiProgress('post','/api/1.0/users');
        //const pendingApiCallLogin = useApiProgress('post','/api/1.0/auth');
        //const pendingApiCall = pendingApiCallSignup || pendingApiCallLogin;
        const { t } = useTranslation();
        let passwordRepeatError;
        if(form.password !== form.passwordRepeat){
            passwordRepeatError = ('Password mismatch');
        }
        return (
             <div className="container" style= {{width: '60%'}} >
              {clickNext ? 
              (<div>
                  <h1 className="text-center"> {t('KMYS Programını indirmek için aşağıdaki hesaba ödeme yapınız, sonrasında "info@mhcinsaat.com" e-mail adresine dekont ile bildirim yapınız...')}</h1>
                  <h4 className="text-center"> IBAN : TR 1100 0640 0000 1422 9124 2872</h4>
                  <h4 className="text-center"> Hesap Adı : MHC Mühendislik İnşaat Danışmanlık Mimarlık ve Ticaret A.Ş.</h4>

                  
              </div>) : (<CreditCard/>)}
                <Footer classname={"navbar-fixed-bottom"}></Footer>
            </div>
        );
    
}


export default Payment;
