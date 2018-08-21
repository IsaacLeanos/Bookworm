import React from 'react'
import{Form,Button,Message}from'semantic-ui-react'
import InlineError from '../messages/InlineError'

class ResetPasswordForm extends React.Component{
    state={
        data:{
            token:this.props.token,
            password:'',
            passwordConfirmation:''
        },
        loading:false,
        errors:{}
    }

    passwordChange=(e)=>{
        let text=e.target.value
        this.setState(()=>({data:{...this.state.data,password:text}}))
    }
    passwordConfirmationChange=(e)=>{
        let text=e.target.value
        this.setState(()=>({data:{...this.state.data,passwordConfirmation:text}}))
    }
    validate=(data)=>{
        const errors={}
        if(!data.password) errors.password='Password cannot be blank'
        if(data.password!==data.passwordConfirmation) errors.passwordConfirmation='Passwords do not match'
        return errors
    }
    onSubmit=(e)=>{
        e.preventDefault()
        const errors=this.validate(this.state.data)
        this.setState(()=>({errors:errors}))
        if(Object.keys(errors).length===0){
            this.setState(()=>({loading:true}))
            this.props.onSubmit(this.state.data).catch((e)=>{
                this.setState(()=>({errors:e.response.data.errors,loading:false}))
            })
        }
    }
    render(){
        return(
          <Form onSubmit={this.onSubmit} loading={this.state.loading}>
          {this.state.errors.global&&<Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{this.state.errors.global}</p>
            </Message>}
          <Form.Field error={this.state.errors.password}>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name='password'
          value={this.state.data.password} onChange={this.passwordChange}/> 
          {this.state.errors.password&&<InlineError text={this.state.errors.password}/>}
          </Form.Field>

          <Form.Field error={this.state.errors.passwordConfirmation}>
          <label htmlFor='passwordConfirmation'>Confirm password</label>
          <input type='password' id='passwordConfirmation' name='passwordConfirmation'
          value={this.state.data.passwordConfirmation} onChange={this.passwordConfirmationChange}/> 
          {this.state.errors.passwordConfirmation&&<InlineError text={this.state.errors.passwordConfirmation}/>}
          </Form.Field>
          <Button primary>Submit</Button> 
          </Form>
        )
    }
}

export default ResetPasswordForm

// error={!!this.state.error} ---semantic ui error for form.field