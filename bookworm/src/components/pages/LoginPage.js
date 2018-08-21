import React from 'react'
import LoginForm from '../forms/LoginForm';
import{connect}from'react-redux'
import{attemptLogin}from'../../actions/auth'
import{Link}from'react-router-dom'



export class LoginPage extends React.Component{
    onSubmit=(data)=>{
       return this.props.attemptLogin(data).then(()=>{this.props.history.push('/')})
    }
    render(){
        return(
            <div>
            <h1>Login page</h1>
            <LoginForm onSubmit={this.onSubmit}/>
            <Link to='/forgot_password'>Forgot password?</Link>
            </div>
        )
    }
}

export default connect(null,{attemptLogin})(LoginPage)