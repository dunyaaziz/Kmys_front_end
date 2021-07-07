import { useState, useEffect } from 'react'
import { Navigation } from './components/navigation'
import Footer from './components/footer'
import JsonData from './data/data.json'
import SmoothScroll from 'smooth-scroll'
import UserLoginPage from './pages/UserLoginPage';
import UserSignupPage from './pages/UserSignupPage';
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';
import UserList from './components/UserList'
import DownloadFile from './components/DownloadFile'


export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
})

const App = () => {
  const [landingPageData, setLandingPageData] = useState({})
  useEffect(() => {
    setLandingPageData(JsonData)
  }, [])

  const { isLoggedIn, role } = useSelector((store)=>({
    isLoggedIn: store.isLoggedIn,
    role: store.role
  }))
  const isAdmin = (role==="ROLE_ADMIN") ? true : false;

  return ( 
  <React.StrictMode>

    <div>
 
        <Router>
          <Navigation />
      <Switch>
       <Route exact path="/" component={HomePage}/>
       {!isLoggedIn && <Route path="/login" component={UserLoginPage}
          />}
       <Route path="/signup" component={UserSignupPage}/>
       {isLoggedIn && <Route path="/user/:username" component={UserPage}/>}
       {(isLoggedIn && isAdmin) && <Route path="/userList" component={UserList}/>}
       {isLoggedIn && <Route path="/downloadFile" component={DownloadFile}/>}
       <Redirect to="/" />
       </Switch>   
    </Router>

    </div>
    </React.StrictMode>
  )
}

export default App
