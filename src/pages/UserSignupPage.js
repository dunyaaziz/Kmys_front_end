import React,{ useEffect, useState }  from 'react';
import { signup } from '../api/apiCalls';
import Input from '../components/Input'
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';  
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { signupHandler } from '../redux/authActions';
import Footer from "../components/footer";


const UserSignupPage = props => {
    const [form,setForm] = useState({
        username: null,
        displayName: null,
        email:null,
        password: null,
        passwordRepeat: null
    });
    const[errors, setErrors]  = useState({});
    const dispatch = useDispatch();
    const onChange = event => {
        const { name, value } = event.target;

        setErrors((previousError)=>({...previousError, [name]:undefined}));
        setForm((previousForm)=>({ ...previousForm, [name]:value}))
    }

    const onClickSignup = async event => {
        event.preventDefault();
        const { username, displayName,email, password } = form;
        const { history } = props;
        const { push } = history; 
        const body = {
            username,
            displayName,
            email,
            password
        }
        try {
          await dispatch(signupHandler(body));
          push('/');
        } catch (error) {
            if (error.response.data.validationError) {
                setErrors(error.response.data.validationError);
            }

        }
    };

  

        //const {  errors } = this.state;
        const { username:usernameError, displayName:displayNameError,email:emailError, password:passwordError } = errors;
        const pendingApiCallSignup = useApiProgress('post','/api/1.0/users');
        const pendingApiCallLogin = useApiProgress('post','/api/1.0/auth');
        const pendingApiCall = pendingApiCallSignup || pendingApiCallLogin;
        const { t } = useTranslation();
        let passwordRepeatError;
        if(form.password !== form.passwordRepeat){
            passwordRepeatError = ('Password mismatch');
        }
        return (
            <div className="container" style= {{width: '30%'}} >
                <form>
                    <h1 className="text-center"> {t('Sign Up')}</h1>
                    <Input name="username" label={t("Username")} error={usernameError} onChange={onChange}></Input>
                    <Input name="displayName" label={t("Display Name")} error={displayNameError} onChange={onChange}></Input>
                    <Input name="email" label={t("E-Mail")} error={emailError} onChange={onChange}></Input>
                    <Input name="password" label={t("Password")} error={passwordError} onChange={onChange} type="password"></Input>
                    <Input name="passwordRepeat" label={t("Password Repeat")} error={passwordRepeatError} onChange={onChange} type="password"></Input>
                    <div className="text-center">
                    <ButtonWithProgress
                            onClick={onClickSignup}
                            disabled={pendingApiCall || passwordRepeatError !== undefined}
                            pendingApiCall= {pendingApiCall}
                            text={t('Sign Up')}/>
                    </div>
                   
                </form>
                <Footer classname={"navbar-fixed-bottom"}></Footer>

            </div>

        );
    
}


export default UserSignupPage;
