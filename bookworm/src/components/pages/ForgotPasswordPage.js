import React from 'react'
import ForgotPasswordForm from '../forms/ForgotPasswordForm'
import{Message}from'semantic-ui-react'
import{resetPasswordRequest}from'../../actions/auth'
import{connect}from'react-redux'

export class ForgotPasswordPage extends React.Component{
    state={
        success:false
    }

    onSubmit=(data)=>{
        return this.props.resetPasswordRequest(data)
        .then(()=>{this.setState({success:true})})
    }

    render(){
        return(
            <div>
            {this.state.success?<Message>Email has been sent</Message>:
            <ForgotPasswordForm onSubmit={this.onSubmit}/>}
            </div>
        )
    }
}

export default connect(null,{resetPasswordRequest})(ForgotPasswordPage)