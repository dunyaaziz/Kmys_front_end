import axios from 'axios';

export const signup = body => {
    return axios.post('/api/1.0/users', body);
}

export const login = creds => {
    return axios.post('/api/1.0/auth',  creds );
};
export const logout = () => {
    return axios.post('/api/1.0/logout');
};
export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
}

export const getUsers = (page=0, size=8) => {
    return axios.get(`/api/1.0/users?page=${page}&size=${size}`); 
}

export const setAuthorizationHeader = ({ isLoggedIn, token }) => {
    if(isLoggedIn){
    const authorizationHeaderValue = `Bearer ${token}`
    axios.defaults.headers['Authorization'] = authorizationHeaderValue; 
}else{
        delete axios.defaults.headers['Authorization'];

}
};

export const getUser = username => {
    return axios.get(`/api/1.0/users/${username}`);
}

export const updateUser = (username, body) => {
    return axios.put(`/api/1.0/users/${username}`,body);
}

export const updateUserPaid = (username) => {
    return axios.put(`/api/1.0/paid/${username}`);
}

export const updatePassword = (username, body) => {
    return axios.put(`/api/1.0/changePass/${username}`,body);
}


export const downloadFile = () => {
    // const options = {
    //     headers: {'Content-Type': 'application/json'}
    //   };
   //axios.headers['Content-Type'] =  'application/json';
   return axios.get(`/api/1.0/downloadFile`,  { withCredentials: true, responseType: "blob" });

}

