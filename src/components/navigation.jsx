import React, { Component } from 'react';
import logo from '../assets/hoaxify.png';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from '../redux/authActions';
import LanguageSelector from '../components/LanguageSelector'
import ProfileImageWithDefault from './ProfileImageWithDefault';

export const Navigation = (props) => {

  const { t } = useTranslation();
  const { username, isLoggedIn, displayName, image, role }= useSelector((store) => ({
          isLoggedIn: store.isLoggedIn,
          username: store.username,
          displayName: store.displayName,
          image: store.image,
          role: store.role
  }));
  const dispatch = useDispatch();
  const onLogoutSuccess = () =>{
      dispatch(logoutSuccess());
  }
  const isAdmin = (role==="ROLE_ADMIN") ? true : false;

  let links = (
    <>
    <li>
        <Link className="nav-link" to="/login">
        {t('Login')} 
        </Link>
        </li>
    <li>
        <Link className="nav-link" to="/signup">
        {t('Sign Up')}
        </Link>
    </li>
    </>
);
if (isLoggedIn) {
    links = (
      <> 
      <li className="nav-item dropdown"> 
        <a id="dLabel" className="dropdown-toggle" style={{cursor: 'pointer', display: 'flex', alignItems:'center', padding:'3px'}} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <ProfileImageWithDefault image={image} width="32" height="32"  className="img-circle shadow-lg col-md-0" style={{marginRight:'4px'}} />
        <span className="nav-link">{displayName}</span>
        </a>
        <div className="dropdown-menu shadow" aria-labelledby="dLabel">
          <ul>
            {isAdmin && ( <li>
            <Link className="dropdown-item" style={{display: 'flex', alignItems:'center', padding:'3px'}}  to={`/userList`}>
              <span className="material-icons text-info"  style={{marginRight:'4px'}}> person</span>
              {t('User List')}</Link>
              </li>
              )}
          <li>
            <Link className="dropdown-item" style={{display: 'flex', alignItems:'center', padding:'3px'}}  to={`/user/${username}`}>
              <span className="material-icons text-info"  style={{marginRight:'4px'}}> person</span>
              {t('My Profile')}</Link>
              </li>
          <li>
          <a className="dropdown-item" style={{cursor: 'pointer', display: 'flex', alignItems:'center', padding:'3px'}}  onClick={onLogoutSuccess} href='#/' >
            <span className="material-icons text-danger" style={{marginRight:'4px'}}>power_settings_new</span>
            {t('Logout')} </a>
            </li>
            </ul>
        </div>
        </li>    
             </>
    );
}

  return (
    <div>
    <nav id='menu' className='navbar navbar-default navbar-expand navbar-top'>
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          {/* <span className='navbar-brand page-scroll' href='#/'>
            MCH Mühendislik
          </span>{' '} */}
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>  
          <li><Link className="nav-link" to={'/'}>  MHC Mühendislik</Link></li>
            <li>
              <a href='#features' className='page-scroll'>
                {t('Features')}
              </a>
            </li>
            <li>
              <a href='#about' className='page-scroll'>
              {t('ABOUT')}
              </a>
            </li>
            <li>
              <a href='#services' className='page-scroll'>
              {t('SERVICES')}
              </a>
            </li>
            {isLoggedIn && (<li>
            <Link className="nav-link" to="/downloadFile">
            {t('DOWNLOAD')}
            </Link>
            </li>)}
            <li>
              <a href='#contact' className='page-scroll'>
              {t('Contact')}
              </a>
            </li>
             {links}
            <li> <LanguageSelector /></li>
          </ul> 
        </div>
      </div> 
    
    </nav>
  </div> 

)
}
