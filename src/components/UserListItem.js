import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ButtonWithProgress from './ButtonWithProgress';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useApiProgress } from '../shared/ApiProgress';
import { updateUserPaid } from "../api/apiCalls";

const UserListItem = (props) => {

    //const { user } = props;
    //const { username, displayName, image, isPaid, role } = user; 
    
    const[user,setUser] = useState({});

    useEffect(()=>{
        setUser(props.user)
      },[props.user])
      
    
    const { username, displayName, image, isPaid, role } = user; 
    const paidTrue = (isPaid === true) ? "Ödeme Yapıldı" : "Ödeme Yapılmadı";
    const buttonClassName  = (isPaid === true) ? "btn btn-success" : "btn btn-danger";
    const pendingApiCall = useApiProgress('put','/api/1.0/paid/' + username);
    const btnText = (isPaid === true) ? "Ödemeyi Geri Al" : "Ödemeyi Onayla";

    const changeIsPaid = async () =>{           
          try {
          const response = await updateUserPaid(username);
          //pop up success
          setUser((user)=>({...user, isPaid:response.data}));
         // setUser({isPaid: response.data});
    
         // dispatch(updateSuccess(response.data));
    
    }catch(error){
       // setValidationError(error.response.data.validationError);
    }
        }

    return (
   <div className="row list-group-item list-group-item-action"> 
        <div className="col-sm-8">
        <Link to={`/user/${user.username}`}  key={username}> 
        <ProfileImageWithDefault 
        className="rounded-circle" 
        alt={`${username} profile`} 
        image={image} 
        width="32" 
        height="32"/> 
        <span className="pl-2"> {displayName}@{username}</span></Link>
        </div>
        <div className="col-sm-2" style= {{marginTop: '10px'}}>
        <span className="pl-2" > {paidTrue}</span>
        </div>
        <div className="col-sm-2" >
         <ButtonWithProgress
            className={buttonClassName}
            onClick={changeIsPaid}
            disabled={pendingApiCall}
            pendingApiCall= {pendingApiCall}
            text={btnText} />
        </div>
       
        </div>
    );
};

export default UserListItem;