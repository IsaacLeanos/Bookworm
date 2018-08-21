import React from 'react'
import{Route}from'react-router-dom'
import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import SignupPage from './components/pages/SignupPage'
import DashboardPage from './components/pages/DashboardPage'
import ConfirmationPage from './components/pages/ConfirmationPage'
import NewBookPage from './components/pages/NewBookPage'
import ForgotPasswordPage from './components/pages/ForgotPasswordPage'
import ResetPasswordPage from './components/pages/ResetPasswordPage'
import TopNavigation from './components/navigation/TopNavigation'
import UserRoute from './components/routes/UserRoute'
import GuestRoute from './components/routes/GuestRoute'
import{connect}from'react-redux'

const App=({location,isAuthenticated})=>{
  return(
    <div className='ui container'>
    {isAuthenticated&&<TopNavigation/>}
    <Route location={location} path='/' exact component={HomePage}/>
    <GuestRoute location={location} path='/forgot_password' exact component={ForgotPasswordPage}/>
    <GuestRoute location={location} path='/reset_password/:token' exact component={ResetPasswordPage}/>
    <Route location={location} path='/confirmation/:token' exact component={ConfirmationPage}/>
    <GuestRoute location={location} path='/login' exact component={LoginPage}/>
    <GuestRoute location={location} path='/signup' exact component={SignupPage}/>
    <UserRoute location={location} path='/dashboard' exact component={DashboardPage}/>
    <UserRoute location={location} path='/books/new' exact component={NewBookPage}/>
    </div>
  )
}

const mapStateToProps=(state)=>{
  return{
    isAuthenticated:!!state.userReducer.email
  }
}

export default connect(mapStateToProps)(App)
