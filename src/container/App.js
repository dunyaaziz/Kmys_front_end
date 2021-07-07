// import React from 'react';
// import LanguageSelector from '../components/LanguageSelector'
// import ApiProgress from "../shared/ApiProgress";
// import UserLoginPage from '../pages/UserLoginPage';
// import UserSignupPage from '../pages/UserSignupPage';
// import HomePage from "../pages/HomePage";
// import UserPage from "../pages/UserPage";
// import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import TopBar from '../components/TopBar';
// import { useSelector } from 'react-redux';

// const App = ()  => {

//   const { isLoggedIn } = useSelector((store)=>({
//     isLoggedIn: store.isLoggedIn
//   }))

//   return (
    
//     <React.StrictMode>
//     <div>
//       <Router>
//         <TopBar/>
//       <Switch>
//        <Route exact path="/" component={HomePage}/>
//        {!isLoggedIn && <Route path="/login" component={UserLoginPage}
//           />}
//        <Route path="/signup" component={UserSignupPage}/>
//        <Route path="/user/:username" component={UserPage}/>
//        <Redirect to="/" />
//        </Switch>
//       </Router>
//       <LanguageSelector />
//     </div>    

//   </React.StrictMode>
//   );

// }

// export default App;
