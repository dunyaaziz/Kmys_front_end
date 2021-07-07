import * as ACTIONS from './Constant';
import { login, signup, logout, updatePassword } from '../api/apiCalls';

export const logoutSuccess = () => {
    return async function(dispatch){
       try { 
           await logout();
       } catch(err){

       }
    
    dispatch ({
        type: ACTIONS.LOGOUT_SUCCESS
    })
}
};

export const loginSuccess = authState =>{
    return{
    type: ACTIONS.LOGIN_SUCCESS,
    payload: authState
};
};

export const updateSuccess = ({ displayName, image }) => {
    return {
        type: ACTIONS.UPDATE_SUCCESS,
        payload: {
            displayName, 
            image
        }
    };
};

export const updatePass = (password) => {
    return {
        type: ACTIONS.UPDATE_PASS_SUCCESS,
        payload: {
            password
        }
    };
};

export const UpdatePassHandler = (credentials) => {
    return async function(dispatch){
        const body = {
            oldPassword:credentials.oldPassword,
            newPassword:credentials.newPassword
          };
          const body2 = {
            username:credentials.username,
            password:credentials.newPassword
          };
    const response = await updatePassword(credentials.username, body);    
    await dispatch(loginHandler(body2));   
    return response;
    }
    }


export const loginHandler = (credentials) => {
return async function(dispatch){
const response = await login(credentials);
const authState = {
    ...response.data.user,
    password: credentials.password,
    token: response.data.token
}
dispatch(loginSuccess(authState));   
return response;
}
}


export const signupHandler = (user) => {
    return async function(dispatch){
    const response = await signup(user);    
    await dispatch(loginHandler(user));   
    return response;
    }
    }