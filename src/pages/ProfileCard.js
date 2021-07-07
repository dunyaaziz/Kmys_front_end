import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import Input from '../components/Input';
import ProfileImageWithDefault from '../components/ProfileImageWithDefault';
import { updateUser } from "../api/apiCalls";
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Footer from "../components/footer";
import { updateSuccess, UpdatePassHandler } from '../redux/authActions';

const ProfileCard = props => {
    const[inEditMode, setInEditMode]= useState(false); 
    const[inChangePassMode, setInChangePassMode] = useState(false); 
    const[updatedDisplayName, setUpdatedDisplayName]= useState(); 
    const { username : loggedInUsername } = useSelector((store)=>({username:store.username}))
    const routeParams = useParams();
    const pathUsername = routeParams.username;
    const[user,setUser] = useState({});
    const[isChange,setIsChange] =useState(true);
    const[editable,setEditable] = useState(false);
    const[newImage,setNewImage] = useState();
    const[validationError, setValidationError]= useState({});
    const[validationPassError, setValidationPassError]= useState({});
    const[validationOldPassError, setValidationOldPassError]= useState();


    const dispatch = useDispatch();
    const [form,setForm] = useState({
      oldPassword: null,
      newPassword:null,
      passwordRepeat: null
  });

    useEffect(()=>{
      setUser(props.user)
    },[props.user])

    useEffect(()=>{
    setEditable(pathUsername === loggedInUsername);
    },[pathUsername,loggedInUsername])

    useEffect(()=>{
      setValidationError((prevValError)=>({
        ...prevValError, 
        image:undefined}));
    },[newImage])

    const{ t } = useTranslation();
    const { username, displayName, image, lisanceKey } = user;
    
    useEffect(()=>{
      if(!inEditMode){
      setUpdatedDisplayName(undefined);
      setNewImage(undefined);
    } else {
      setUpdatedDisplayName(displayName);
    }
    },[inEditMode,displayName])

  
    const pendingApiCall = useApiProgress('put','/api/1.0/users/' + username);
    const pendingApiCallPass = useApiProgress('put','/api/1.0/changePass/' + username);

    const onClickSave = async () =>{           
    let image;
    if(newImage){ image = newImage.split(',')[1]; }
      const body = {
        displayName: updatedDisplayName,
        image
      };
      try {
      const response = await updateUser(username, body);
      //pop up success
      setInEditMode(false);
      setUser(response.data);

      setIsChange(true);
      dispatch(updateSuccess(response.data));

}catch(error){
    setValidationError(error.response.data.validationError);
}
    }

    const onClickSavePassword = async () =>{           

        const body = {
          username,
          oldPassword:form.oldPassword,
          newPassword:form.newPassword
        };
 
        try {
        await dispatch(UpdatePassHandler(body));
        //const response = await updatePassword(username, body);
        setInChangePassMode(false);
        setIsChange(true);
        
        //console.log("response geldi")
  }catch(error){
if(error.response.data.status===406){
  setValidationOldPassError(error.response.data.message);}
else{
  setValidationPassError(error.response.data.validationError);
}
  }
      }

    const onChangeText = (event) => {
      setValidationError((prevValError)=>({...prevValError, displayName:undefined}));
      setUpdatedDisplayName(event.target.value);
        setIsChange(false);
    }
    const onChangePass = event => {
      const { name, value } = event.target;
      setIsChange(false);

      setValidationPassError({oldPassword:undefined});
      setValidationOldPassError(undefined);
      setForm((previousForm)=>({ ...previousForm, [name]:value}))
  }
    const cancelClick = () =>{
     setValidationError((prevValError)=>({...prevValError, displayName:undefined,image:undefined}));
     setValidationPassError({oldPassword:undefined});
     setValidationOldPassError(undefined);
     setInEditMode(false);
     setInChangePassMode(false);
     setIsChange(true);
     

    }
    const onChangeFile = event =>{

      if(event.target.files.length < 1){
        console.log(event.target.files);
        return;
      }
     const file = event.target.files[0];
     const fileReader = new FileReader();
     setIsChange(false);
     fileReader.onloadend = () => {
       setNewImage(fileReader.result);
     }
     fileReader.readAsDataURL(file);
     
    }

const { displayName : displayNameError, image : imageError } = validationError;
const { newPassword : passwordError} = validationPassError;
let passwordRepeatError;
let samePasswordError;
        if(form.newPassword !== form.passwordRepeat){
            passwordRepeatError = ("Password mismatch");
        }else if(((form.newPassword !== undefined) && (form.newPassword !== null)  && (form.newPassword !== "")) && (form.oldPassword === form.newPassword)){
          samePasswordError = ("Entered same password with old password");
      } 
const hasLisance = (lisanceKey===null || lisanceKey===undefined) ? false : true;

return ((<div className="container" style= {{width: '40%'}}>
<div className="panel panel-default text-center" >
      <div className="panel-heading">
      <ProfileImageWithDefault 
        className="img-circle shadow-lg" 
        alt={`${username} profile`} 
        image={ image }
        tempimage={ newImage }
        width="200" 
        height="200"/>
     </div> 
    <div className="panel-body">
     {!(inEditMode || inChangePassMode) && (<>
     <h3>{displayName}@{username} </h3> 
     {hasLisance && (<h3>lisanceKey : {lisanceKey} </h3>)}
      <button className="btn btn-success" onClick={()=>setInEditMode(true)}>
      {t('Edit')}</button>
      <button className="btn btn-info" style= {{ marginLeft: '5px'}} onClick={()=>setInChangePassMode(true)}>
      {t('Change Password')}</button>
      </>
      )}

      {inEditMode && (
        <div>
          <Input label={t('Change Display Name')} 
          defaultValue={displayName} 
          error={displayNameError}
          onChange={onChangeText}/>
          <Input type="file" style= {{marginTop: '15px'}} error={imageError} onChange={onChangeFile}/>
          <div>
            <ButtonWithProgress 
            className="btn btn-success display-flex-center" 
            onClick={onClickSave}
            disabled={pendingApiCall || isChange}
            pendingApiCall={pendingApiCall}
            text= {t('Save')}>
            </ButtonWithProgress>
            <button className="btn btn-danger d-inline-flex ms-5"  style= {{marginTop: '5px', marginLeft: '5px'}} onClick={cancelClick}>
            {t('Cancel')}</button>
          </div>
        </div>
      )}

{inChangePassMode && (
        <div>
          <Input name="oldPassword" label={t("Old Password")} error={t(validationOldPassError) } onChange={onChangePass} type="password"></Input>
          <Input name="newPassword" label={t("Password")} error={ t(samePasswordError)||passwordError} onChange={onChangePass} type="password"></Input>
          <Input name="passwordRepeat" label={t("Password Repeat")} error={t(passwordRepeatError)} onChange={onChangePass} type="password"></Input>

          <div>
            <ButtonWithProgress 
            className="btn btn-success display-flex-center" 
            onClick={onClickSavePassword}
            disabled={pendingApiCallPass || isChange}
            pendingApiCall={pendingApiCallPass}
            text= {t('Save')}>
            </ButtonWithProgress>
            <button className="btn btn-danger d-inline-flex ms-5"  style= {{marginTop: '5px', marginLeft: '5px'}} onClick={cancelClick}>
            {t('Cancel')}</button>
          </div>
        </div>
      )}

    </div>
    </div>
    <Footer classname={"navbar-fixed-bottom"}></Footer>
      </div>
    )
  //   :(
  //      <div className="container">
  //      <div className="alert alert-danger text-center">
  //      <div>
  //          <i className="material-icons" style={{fontSize: '48px'}}> error </i>
  //      </div>
  //      {t('User Not Found')}
  //      </div>
  //      <Footer classname={"navbar-fixed-bottom "}></Footer>
  //  </div>
  //   )
  
) 
  
};

export default ProfileCard;