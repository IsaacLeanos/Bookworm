import React from 'react'
import SignupForm from '../forms/SignupForm'
import{connect}from'react-redux'
import{attemptSignup}from'../../actions/users'


export class SignupPage extends React.Component{
    onSubmit=(data)=>{
        return this.props.attemptSignup(data)
        .then(()=>{this.props.history.push('/dashboard')})
    }
    render(){
        return(
            <div>
            <h1>Signup page</h1>
            <SignupForm onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

export default connect(null,{attemptSignup})(SignupPage)